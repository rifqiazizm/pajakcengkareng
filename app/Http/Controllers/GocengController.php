<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Surattugas;
use App\Seksi;
use App\Mobildinas;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;



class GocengController extends Controller
{


    public function getSurat($id) {
        if($id == 1) {
            $st = Surattugas::whereDate('tglmulaiST','>=',Carbon::now())->get()->reverse()->values();
        } else {
            $st = Surattugas::where('seksi_id',$id)->get();
        }
        if($st) {
            return response()->json([
                'status' => 'oke',
                'data' => $st
            ]);
        } else {
            return response()->json([
                'status' => 'failed bro',
            ]);
        }
    }


    public function createST(Request $request) {
        
        $validator = $request->validate([
            'namaPeserta' => 'required|string',
            'alamatST'  => 'required|string',
            'tujuanST'  => 'required|string',
            'tglmulaiST'  => 'required|string',
            'tglselesaiST'  => 'required|string',
            'jammulaiST'  => 'required|string',
            'jamselesaiST'  => 'required|string',
            'agendaST'  => 'required|string',
            'transport'  => 'required|boolean',
            'seksi_id' => 'required|numeric'
        ]);

        if($validator) {
            $st = $request->all();
            $st['approved'] = false;
            $st['released'] = false;
            $st['mobildinas_id'] = 99;
    
            $tambahST = Surattugas::create($st);
            if($tambahST) {
                return response()->json([
                    'status' => 'oke',
                    'data' => $tambahST
                ]);
            } else {
                return response()->json([
                    'status' => 'failed',
                ]);
            }
        } else {
            return response()->json([
                'status' => 'gagal validasi http request!'
            ]);
        }

        
         
    }

    public function getUser() {
        // $user = Seksi::all();
        $cekmobildinas = Surattugas::where('tglmulaiST','2021-10-21')->where('mobildinas_id','100')->with('seksinya')->get();

        return response()->json([
            'status' => 'oke',
            'data' => $cekmobildinas[0]->seksinya
        ]);
    }


    public function loginApp(Request $request) {
 
        $this->validate($request, [
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = $request->input('username');
        $data = Seksi::where('username',$user)->first();
        // return response()->json([
        //     'status' => 'oke',
        //     'data' => $data->username
        // ]);
        if($data->password == $request->input('password')) {
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        } else {
            return response()->json([
                'status' => false
            ]);
        }
    }


    public function fetchMobil() {
        $date = Carbon::now();
        $currentST = Surattugas::where('tglmulaiST',$date)->get();
        $idMobil = [];
        foreach ($currentST as $value) {
            array_push($idMobil,$value->mobildinas_id);
        }
        $mobil = Mobildinas::all()->except($idMobil);
        if($mobil) {
            return response()->json([
                'status' => 'oke',
                'data' => $mobil
            ]);
        } else {
            return response()->json([
                'status' => 'gagal'
            ]);
        }
    }

    public function updateMobil($id, Request $request) {
        $mobil = Surattugas::findOrFail($id); 
        $cekmobildinas = Surattugas::where('tglmulaiST',$mobil->tglmulaiST)->where('mobildinas_id',$request->input('mobildinas_id'))->with('seksinya')->get();

        if($cekmobildinas->count() > 0) {
            return response()->json([
                'status' => false,
                'kata' => 'Kendaraan Sudah di Booking Oleh '.$cekmobildinas[0]->seksinya->namaSeksi
            ]);
        }


        if($mobil->mobildinas_id == 99) {
            $booking = $mobil->update(['mobildinas_id' => $request->input('mobildinas_id')]);
            if($booking) {
    
                return response()->json([
                     'status' => $booking,
                     'kata' => 'Kendaraan Berhasil DI booking'
                ]);
            } else {
                return response()->json([
                    'status' => $booking,
                    'kata' => 'Unknown Error!! Kendaraan Gagal di Booking'
                ]);
            }
            $mobil->update(['mobildinas_id' => $request->input('mobildinas_id')]);

        } else {
            return response()->json([
                 'status' => false,
                 'kata' => 'Booking Kendaraan hanya boleh sekali'
            ]);
        }
    }

    public function approveST($id, Request $request) {
        $st = Surattugas::findOrFail($id);
        $newST = $st->update(['approved' => $request->input('approve')]);
        if($newST) {
            return response()->json([
                'status' => 'oke',
                'data' => $newST
            ]);
        } else {
            return response()->json([
                'status' => 'failed'
            ]);
        }
    }
 
    public function laporanST(Request $request) {
        $this->validate($request,[
            'id' => 'required|numeric',
            'image' => 'required|image',
            'koordinat' => 'required|string',             'uraianLaporan' => 'required|string'
        ]);

        $st = Surattugas::findOrFail($request->input('id'));

        if($request->hasFile('image')) {
            $path = $request->file('image')->store('images');

            $status = $st->update([
                'urlFoto' => $path,
                'koordinat' => $request->input('koordinat'),
                'uraianLaporan' => $request->input('uraianLaporan')
            ]);
            
            if($status) {
                return response()->json([
                    'status' => $status,
                    'kata' => 'laporan Berhasil di kirim'
                ],404);
            } else {
                return response()->json([
                    'status' => $status,
                    'kata' => 'laporan gagal terkirim'
                ],404);
            }

            
        } else {
            return response()->json([
                'status' => $st
            ],200);
        }

            
    }

    public function getST() {
        $st = Surattugas::all()->load(['seksinya','mobildinas'])->reverse()->values();
        if($st) {
            return response()->json([
                'status' => 'oke',
                'data' => $st
            ]);
        } else {
            return response()->json([
                'status' => 'gagal'
            ],404);
        }
    }

    public function getImage($url) {
        $st = Storage::disk('public')->url($url);
        return response()->json([
            'data' => $st
        ]);
    }

    public function rilisST(Request $request) {
        $st = Surattugas::findOrFail($request->input('id'));
        $update = $st->update(['released' => 1]);
        if($update) {
            return response()->json([
                'status' => 'oke',
            ]);
        } else {
            return response()->json([
                'status' => 'gagal',
            ]);
        }
    }

    public function sendNote($id,Request $request) {
        $this->validate($request,[
            'notekakap' => 'required|string',
        ]);

        $st = Surattugas::findOrFail($id);
        $upd = $st->update(['notekakap' => $request->input('notekakap')]);

        if($upd) {
            return response()->json([
                'status' => 'oke',
                'data' => $request->input('notekakap')
            ]);
        } else {
            return response()->json([
                'status' => 'gagal'
            ]);
        }

    }


}
