<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\WajibPajak;
use Carbon;
use Excel;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Mail;
use App\Events\CetakEvent;

class WPController extends Controller
{ 


    public function show(Request $request) {
        $wp = $request->user()->wajibpajak;
        return response()->json([
            'status' => 'fetch data success',
            'data' => $wp
        ]);
    }

    

    public function createWP(Request $request) {
        
        $this->validate($request, [
            'npwp'          => 'required|string',
            'namaWP'        => 'required|string',
            'nop'           => 'required|string',
            'alamat'        => 'required|string',
            'kelurahan'     => 'required|string',
            'no_spop'       => 'required|numeric',
            'tgl_spop'      => 'required|date'
        ]);


        $userId = auth()->user()->id;
        // $wpp = (bool) $request->input('spop_kembali') ? $request->input('spop_kembali') : 99;
        $wpp = 99;
        $input = $request->all();

        $input['user_id'] = $userId;
        $input['wpp_id'] = $wpp;

        $status = WajibPajak::create($input);
    
        if($status) {
            return response()->json([
                'status' => '200',
                'responses' => $status,
                'kelurahan' => $request->input('kelurahan')
            ],201);
            

        } else {
            return response()->json([
                'status' => 'gagal menyimpan!'
            ],403);
        }
 
    }
    


    public function edit($id, Request $request) {
        
        if(!isset($request->spop_kembali)) {
            $this->validate($request, [
                'npwp'          => 'required|string',
                'namaWP'        => 'required|string',
                'nop'           => 'required|string',
                'alamat'        => 'required|string',
                'kelurahan'     => 'required|string',
                'no_spop'       => 'required|numeric',
                'tgl_spop'      => 'required|date'
            ]);
        }

        $wp = WajibPajak::findOrFail($id);
        $wp->update($request->all());
        return response()->json([
            'status' => 'success updating',
            'responses' => $wp
        ]);
    }

    public function delete($id) {
        $wp = WajibPajak::findOrFail($id);
        $wp->delete();
        return response()->json([
            'status' => 'success deleting',
            'responses' => $wp
        ]);
    }

    public function tesaja(Request $request,Wajibpajak $wp) {
         

        $res = $wp->select('id','namaWP','nop')->where('npwp','2')->get(); // untuk eloquent eager load relationship jika menggunakan query select harus menyertakan id. karena eager load tergantung dari "id" dari hasil query sebelumnya
        $res2 = $res->load(['wpp','tangkapan','kapal'])[0]->toArray();

        $spreadsheet = IOFactory::load('pbb.xlsx');

        
        $worksheet = $spreadsheet->getActiveSheet();
        
        $worksheet->insertNewRowBefore(17,10);
        for($i=17;$i<=27;$i++) {
            $worksheet->mergeCells('D'.$i.':F'.$i);
            $worksheet->mergeCells('H'.$i.':I'.$i);
            $worksheet->mergeCells('K'.$i.':L'.$i);
        };
        $worksheet->getCell('D17')->setValue('Ikan duyung');
        $worksheet->getCell('D18')->setValue('Alap2');
        
        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        // We'll be outputting an excel file
        header('Content-type: application/vnd.ms-excel');

        // It will be called file.xls
        header('Content-Disposition: attachment; filename="pbb.xlsx"');

        // Write file to the browser
        $writer->save('php://output');
        
        
    }



    public function fetchWP(Request $request,Wajibpajak $wp) {
        $res = $wp->where('npwp', $request->npwp)->with(['wpp','tangkapan','kapal'])->get();
        // $res2 = WajibPajak::findOrFail(51)->tangkapan; access relationship dengan dynamic properties hanya bisa dilakukan berdasarkan pencarian dengan id
        if($res) {
            return response()->json([
                'status' => 'Request Completed',
                'data' => $res
            ],200);

        }

    }



    public function fetchWP_FDM(Request $request,Wajibpajak $wp) {
        $res = $wp->select('id','wpp_id','spop_kembali','namaWP','nop')->where('npwp',$request->npwp)->with(['wpp','tangkapan','kapal'])->get();
        
       
        if(count($res)) {
            $res2 = $res[0]->toArray();
    
            (int) $luas_wpp = $res2['wpp']['luas'];
            (int) $jml_kapal = count($res2['kapal']) > 0 ? count($res2['kapal']) : 1 ; // jika belum input kapal maka beri nilai satu (error akan kluar di client react js nya)
            (int) $tangkapanTot = 0;
            (int) $jml_ikan = 0;
            (int) $luas_wilayah = $luas_wpp * $jml_kapal;
            (float) $rasio_produksi = 0.7;
            (int) $kapitalisasi = 10;
            


            if(count($res2['tangkapan']) > 0) {
                foreach($res2['tangkapan'] as $cek) {
                    $tangkapanTot += ((int)$cek['berat'] * (int)$cek['harga']);
                    $jml_ikan++;
                }
            } else {
                $tangkapanTot = 1;
            }
            
            $biaya_produksi = (int) round($tangkapanTot * $rasio_produksi);
            $tangkapan_netto = (int) $tangkapanTot - $biaya_produksi;
            $nilai_bumi = (int) $tangkapan_netto * $kapitalisasi;

            $bumi_perM = ($nilai_bumi / $luas_wilayah);
            $bumiPerM_bulat = (int) round($bumi_perM);

            $njop = $bumiPerM_bulat * $luas_wilayah;

            $njoptkp = 12000000;
            
            $njopkp = $njop - $njoptkp;

            $persen = $njopkp < 1000000000 ? 0.2 : 0.4;

            $njkp = $njopkp *  $persen;

            $pbb = (int) round($njkp * 0.005);

            $res2['pbb'] = [
                'luas_wilayah' => number_format($luas_wilayah),
                'nilaiBumi_perM' => number_format($bumiPerM_bulat),
                'tangkapanTot' => number_format($tangkapanTot),
                'jml_ikan' => $jml_ikan,
                 'njop' => number_format($njop),
                'jumlah_kapal' => $jml_kapal,
                
                'njoptkp' => number_format($njoptkp),
                'njopkp' => number_format($njopkp),
                'njkp' => number_format($njkp),
                'pbb' => number_format($pbb)
            ];

            return response()->json([
                'status' => 'oke',
                'data' => [$res2]
            ]);


        } else {
            return response()->json([
                'status' => 'oke',
                'data' => $res
            ]);
        }

    }


    public function kertas_kerja($id) {



        // jika mau akses data di collection bisa make chaining method/prop access (misal $data->data2)
        // atau bisa make array assosiatif access ( $data['data2'])



        $spreadsheet = IOFactory::load('pbb.xlsx');
        $worksheet = $spreadsheet->getActiveSheet();

        $res = Wajibpajak::findOrFail($id); // jika sudah menggunakan findOrfail() tidak menggunakan eager load. tetapi langsung dynamic properties
        $wpp = $res->wpp;
        $tangkapan = $res->tangkapan;
        $kapal = $res->kapal;

   
        (int) $luas_wpp = $wpp['luas'];
        (int) $jml_kapal = count($kapal) > 0 ? count($kapal) : 1 ; // jika belum input kapal maka beri nilai satu (error akan kluar di client react js nya)
        (int) $tangkapanTot = 0;
        (int) $luas_wilayah = $luas_wpp * $jml_kapal;
        (float) $rasio_produksi = 0.7;
        (int) $kapitalisasi = 10;
        (int) $jml_ikan = count($tangkapan);
        (int) $firstRow = 17;
        (int) $tangkapanTotCell = 27;
        (int) $luasWilCell = 39;
        (int) $kapalCell = 40;
        (int) $no_excel = 1;
        
        if($jml_ikan > 10) {
            $jml_row = $jml_ikan - 10;
            $tangkapanTotCell+=$jml_row;
            $luasWilCell+=$jml_row;
            $kapalCell+=$jml_row;

            $worksheet->insertNewRowBefore($firstRow,$jml_row);
            for($i=17;$i<=$jml_row+17;$i++) {
                $worksheet->mergeCells('D'.$i.':F'.$i);
                $worksheet->mergeCells('H'.$i.':I'.$i);
                $worksheet->mergeCells('K'.$i.':L'.$i);
            };
        }
 
        if($jml_ikan > 0) {
            foreach($tangkapan as $cek) {
                $hargaTot = ((int)$cek['berat'] * (int)$cek['harga']);
                $tangkapanTot += $hargaTot;

                $worksheet->getCell('C'.$firstRow)->setValue($no_excel);
                $worksheet->getCell('D'.$firstRow)->setValue($cek['ikan']);
                $worksheet->getCell('G'.$firstRow)->setValue($cek['berat']);
                $worksheet->getCell('H'.$firstRow)->setValue("KG");
                $worksheet->getCell('J'.$firstRow)->setValue($cek['harga']);
                $worksheet->getCell('K'.$firstRow)->setValue($hargaTot);

                $firstRow++;
                $no_excel++;
            }
        }


        
        $biaya_produksi = (int) round($tangkapanTot * $rasio_produksi);
        $tangkapan_netto = (int) $tangkapanTot - $biaya_produksi;
        $nilai_bumi = (int) $tangkapan_netto * $kapitalisasi;

        $bumi_perM = ($nilai_bumi / $luas_wilayah);
        $bumiPerM_bulat = (int) round($bumi_perM);

        $njop = $bumiPerM_bulat * $luas_wilayah;

        $njoptkp = 12000000;
        
        $njopkp = $njop - $njoptkp;

        $persen = $njopkp < 1000000000 ? 0.2 : 0.4;

        $njkp = $njopkp *  $persen;

        $pbb = (int) round($njkp * 0.005);

        $rincianPBB = [
            'luas_wilayah' => number_format($luas_wilayah),
            'nilaiBumi_perM' => number_format($bumiPerM_bulat),
            'tangkapanTot' => number_format($tangkapanTot),
            'jml_ikan' => $jml_ikan,
             'njop' => number_format($njop),
            'jumlah_kapal' => $jml_kapal,
            
            'njoptkp' => number_format($njoptkp),
            'njopkp' => number_format($njopkp),
            'njkp' => number_format($njkp),
            'pbb' => number_format($pbb)
        ];


        
        // event(new CetakEvent($res->namaWP,$rincianPBB));


        $worksheet->getCell('F4')->setValue($res['nop']);
        $worksheet->getCell('F5')->setValue($wpp['daerah']);
        $worksheet->getCell('F6')->setValue($wpp['kode']);
        $worksheet->getCell('F7')->setValue($res['namaWP']);
        $worksheet->getCell('F8')->setValue($res['npwp']);
        $worksheet->getCell('F9')->setValue($res['alamat']);
        $worksheet->getCell('F10')->setValue("2020");
        $worksheet->getCell('K'.$tangkapanTotCell)->setValue($tangkapanTot);
        $worksheet->getCell('I'.$luasWilCell)->setValue($luas_wpp);
        $worksheet->getCell('I'.$kapalCell)->setValue($jml_kapal);



        
        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $filename = "KK ".$res['namaWP'].".xlsx";
  
        // We'll be outputting an excel file
        header('Content-type: application/vnd.ms-excel');
        
        // It will be called file.xls
        header('Content-Disposition: attachment; filename="kertas kerja.xlsx"');

        // Write file to the browser
        $writer->save('php://output');
    } 


    public function fdm($id) {
        $spreadsheet = IOFactory::load('fdm.xlsx');
        $worksheet = $spreadsheet->getSheetByName('fdm');

        $res = Wajibpajak::findOrFail($id); // jika sudah menggunakan findOrfail() tidak menggunakan eager load. tetapi langsung dynamic properties
        $wpp = $res->wpp;
        $tangkapan = $res->tangkapan;
        $kapal = $res->kapal;


        (int) $luas_wpp = $wpp['luas'];
        (int) $jml_kapal = count($kapal) > 0 ? count($kapal) : 1 ; // jika belum input kapal maka beri nilai satu (error akan kluar di client react js nya)
        (int) $tangkapanTot = 0;
        (int) $jml_ikan = count($tangkapan);
        (int) $firstRow = 43;
        (int) $no_excel = 1;
        (int) $luas_wilayah = $luas_wpp * $jml_kapal;
        $nop = str_split($res['nop']);
        $npwp = str_split($res['npwp']);
        // dd($npwp);
        // $nop1 = substr_replace($nop,'.',2,0);
        // $nop2 = substr_replace($nop1,'.',5,0);
        // $nop3 = substr_replace($nop2,'.',9,0);
        // $nop4 = substr_replace($nop3,'.',13,0);
        // $nop5 = substr_replace($nop4,'.',17,0);
        // $nopDotted = substr_replace($nop5,'.',22,0);

        if($jml_ikan > 0) {
            foreach($tangkapan as $cek) {
                $hargaTot = ((int)$cek['berat'] * (int)$cek['harga']); 

                $tangkapanTot += $hargaTot;
            }
        }

        $biaya_produksi = (int) round($tangkapanTot * 0.7);

        $worksheet->getCell('J11')->setValue($nop[0]);
        $worksheet->getCell('K11')->setValue($nop[1]);
        $worksheet->getCell('M11')->setValue($nop[2]);
        $worksheet->getCell('N11')->setValue($nop[3]);
        $worksheet->getCell('P11')->setValue($nop[4]);
        $worksheet->getCell('Q11')->setValue($nop[5]);
        $worksheet->getCell('R11')->setValue($nop[6]);
        $worksheet->getCell('T11')->setValue($nop[7]);
        $worksheet->getCell('U11')->setValue($nop[8]);
        $worksheet->getCell('V11')->setValue($nop[9]);
        $worksheet->getCell('X11')->setValue($nop[10]);
        $worksheet->getCell('Y11')->setValue($nop[11]);
        $worksheet->getCell('Z11')->setValue($nop[12]);
        $worksheet->getCell('AB11')->setValue($nop[13]);
        $worksheet->getCell('AC11')->setValue($nop[14]);
        $worksheet->getCell('AD11')->setValue($nop[15]);
        $worksheet->getCell('AE11')->setValue($nop[16]);
        $worksheet->getCell('AG11')->setValue($nop[17]);

        $worksheet->getCell('J14')->setValue($res['namaWP']);
        $worksheet->getCell('R23')->setValue($tangkapanTot);
        $worksheet->getCell('R24')->setValue($biaya_produksi);
        $worksheet->getCell('AB28')->setValue($luas_wilayah);

        $worksheet->getCell('B85')->setValue($res['namaWP']);
        $worksheet->getCell('B86')->setValue($res['alamat']);
        $worksheet->getCell('B87')->setValue($wpp['daerah']);
        
        for($i=0;$i<count($npwp);$i++) {
            $cell= "B".($i + 88);
     
            $worksheet->getCell($cell)->setValue($npwp[$i]);
            
        }
       





        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $filename = "KK ".$res['namaWP'].".xlsx";
  
        // We'll be outputting an excel file
        header('Content-type: application/vnd.ms-excel');
        
        // It will be called file.xls
        header('Content-Disposition: attachment; filename="FDM.xlsx"');
    
        // Write file to the browser
        $writer->save('php://output');
     


    }



    public function WPBesar(Request $request) {
        $res = $request->user()->wajibpajak()->with('tangkapan:id,wajibpajak_id,harga,berat')->get();

        $Wajibpajak = array();
        
        for($i=0;$i<=count($res)-1;$i++) {
            if(count($res[$i]['tangkapan']) > 0) {
                $tangkapanTot = 0;
                foreach($res[$i]['tangkapan'] as $val) {
                    $tangkapanTot += $val['harga'] * $val['berat'];
                }
                $Wajibpajak[$res[$i]['namaWP']] = round($tangkapanTot/1000000,1);
            } else {
                continue;
            }
        }
        arsort($Wajibpajak);

        $wp = array_slice($Wajibpajak,0,10);

        return response()->json([
            'data' => $wp
        ]);
    }


}
