<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rpnk;
Use App\Surattugas;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


class RpnkController extends Controller
{


    public function fetchRPNK(int $id) {
        if($id == 1) {
            $rpnk = Rpnk::all()->load('seksinya')->reverse()->values();
        } else {
            $rpnk = Rpnk::where('seksi_id',$id)->with('seksinya')->get()->reverse()->values();
        }

        return response()->json([
            'status' => 'oke',
            'data' => $rpnk
        ]);
    }


    public function createRpnk(Request $request) {
        $this->validate($request , [
            'nama' => 'required|string',
            'nip' => 'required|numeric',
            'seksi_id' => 'required|numeric',
            'tglmulai' => 'required|string',
            'tglselesai' => 'required|string',
            'asal' => 'required|string',
            'tujuan' => 'required|string',
            'transport' => 'required|string',
            'keperluan' => 'required|string'
        ]);

        $rpnk = Rpnk::create($request->all());

        if($rpnk) {
            return response()->json([
                'status' => 'oke',
                'data' => $rpnk
            ],200);
        } else {
            return response()->json([
                'status' => 'failed',
            ]);
        }

    }

    public function deleteRpnk($id) {
        $rpnk = Rpnk::findOrFail($id);
        $del = $rpnk->delete();
        if($del) {
            return response()->json([
                'status' => 'oke'
            ]);
        } else {
            return response()->json([
                'status' => 'failed'
            ]);
        }
    }

    public function updateStatus($id,Request $request) {
        $rpnk = Rpnk::findOrFail($id);
        $status = $request->input('status');

        $upd = $rpnk->update([
            'status' => $status
        ]);

        if($upd) {
            return response()->json([
                'status' => 'oke'
            ]);
        } else {
            return response()->json([
                'status' => 'failed'
            ]);
        }

    }

    public function cetakST() {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $st = Surattugas::all()->reverse()->values();
        // dd($st[2]->urlFoto);
        $no_excel = 2;

        $sheet->getCell('A1')->setValue("Agenda ST");
        $sheet->getCell('B1')->setValue("Tujuan ST");
        $sheet->getCell('C1')->setValue("Alamat ST");
        $sheet->getCell('D1')->setValue("Nama Peserta");
        $sheet->getCell('E1')->setValue("Tgl Mulai");
        $sheet->getCell('F1')->setValue("Tgl Selesai");
        $sheet->getCell('G1')->setValue("Jam Mulai");
        $sheet->getCell('H1')->setValue("Jam Selesai");
        $sheet->getCell('I1')->setValue("Url Foto");
        $sheet->getCell('J1')->setValue("Koordinat");
        $sheet->getCell('K1')->setValue("Uraian Laporan");
        $sheet->getCell('L1')->setValue("Note Kakap");

        foreach($st as $data) {
            $sheet->getCell('A'.$no_excel)->setValue($data->agendaST);
            $sheet->getCell('B'.$no_excel)->setValue($data->tujuanST);
            $sheet->getCell('C'.$no_excel)->setValue($data->alamatST);
            $sheet->getCell('D'.$no_excel)->setValue($data->namaPeserta);
            $sheet->getCell('E'.$no_excel)->setValue($data->tglmulaiST);
            $sheet->getCell('F'.$no_excel)->setValue($data->tglselesaiST);
            $sheet->getCell('G'.$no_excel)->setValue($data->jammulaiST);
            $sheet->getCell('H'.$no_excel)->setValue($data->jamselesaiST);
            $sheet->getCell('I'.$no_excel)->setValue("https://pajakcengkareng.my.id/storage/".$data->urlFoto);
            $sheet->getCell('J'.$no_excel)->setValue($data->koordinat);
            $sheet->getCell('K'.$no_excel)->setValue($data->uraianLaporan);
            $sheet->getCell('L'.$no_excel)->setValue($data->notekakap);
            $no_excel++;
            
        } 

        $sheet->setTitle("Rekap Surat Tugas");// Proses file excel
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="Rekap ST.xlsx"'); // Set nama file excel nya
        header('Cache-Control: max-age=0');
        $writer = new Xlsx($spreadsheet);
        $writer->save('php://output');



    }

}
