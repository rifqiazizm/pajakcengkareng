<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Kelas;
use App\PesertaKelas;

class KelasController extends Controller {


    public function fetchKelas() {
        $kelas = Kelas::all();

        return response()->json([
            'status' => 'oke',
            'data' => $kelas
        ],200);

    }
    
    public function createKelas(Request $request) {
        $this->validate($request, [
            'nama_sosis' => 'required|string',
            'jenis_kelas' => 'required|string',
            'tgl_kelas' => 'required|date',
            'jam_mulai' => 'required|string',
            'jam_selesai' => 'required|string',
            'media' => 'required|string',
            'kapasitas' => 'required|numeric',
            'id_zoom' => 'required|string',
            'password_zoom' => 'required|string',
        ]);
        
        $create = Kelas::create($request->all());
            
        if($create) {
            return response()->json([
                'status' => 'oke',
                'data' => $create
            ]); 
        } else {
            return response()->json([
                'status' => 'gagal Menyimpan!!'
            ],403);
        }
    }

    public function edit($id, Request $request) {
        $this->validate($request, [
            'nama_sosis' => 'required|string',
            'jenis_kelas' => 'required|string',
            'tgl_kelas' => 'required|date',
            'jam_mulai' => 'required|string',
            'jam_selesai' => 'required|string',
            'media' => 'required|string',
            'kapasitas' => 'required|numeric',
            'id_zoom' => 'required|string',
            'password_zoom' => 'required|string',
        ]);

        $kelas = Kelas::findOrFail($id);

        $kelas->update($request->all());
        return response()-> json([
            'status' => 'oke',
            'data' => $kelas
        ]);

    }

    public function delete($id) {
        $kelas = Kelas::findOrFail($id);
        $kelas->delete();
        return response()->json([
            'status' => 'oke',
            'responses' => $kelas
        ]);
    }

    public function daftarKelas(Request $request) {

        $this->validate($request, [
            'kelas_id' => 'required|string',
            'npwp' => 'required|string',
            'namaWP' => 'required|string',
            'no_efin' => 'required|string',
            'no_hp' => 'required|string'
        ]);

        $input = $request->all();

        $kelas = Kelas::findOrFail($input['kelas_id']);

        $checkPeserta = $kelas->peserta->where('npwp',$input['npwp'])->count();
        $checkJumlah = PesertaKelas::where('kelas_id',$input['kelas_id'])->get()->count();


        if($checkPeserta == 0 && $checkJumlah <= $kelas->kapasitas ) {
            $peserta = PesertaKelas::create($input);
        

        // return response()->json([
        //     'status' => 'oke',
        //     'data' => $peserta,
        // ],200,['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
        // JSON_UNESCAPED_UNICODE);
        return response()->json([
            'status' => 'oke',
            'data' => $peserta,
                
                ],200,['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
            JSON_UNESCAPED_UNICODE);
        } else {
            return response()->json([
                'status' => 'failed'
            ],500);
        }
        
    }


    public function fetchPeserta(Kelas $kelas) {
        $listPeserta = $kelas->peserta;
        return response()->json([
            'status' => 'oke',
            'data' => $listPeserta
        ],200);
    }

    public function deletePeserta($id) {
        $peserta = PesertaKelas::findOrFail($id);
        $peserta->delete();
        return response()->json([
            'status' => 'oke',
            'data' => $peserta
        ],200);
    }
    
    public function jumlahPeserta(Kelas $kelas) {
        $jumlah = $kelas->peserta->count();

        return response()->json([
            'jumlah' => $jumlah
        ],200);
    }

    public function kelasTerdaftar($npwp) {
        $kelas = PesertaKelas::select('kelas_id','npwp')->where('npwp',$npwp)->get();

        return response()->json([
            'kelas' => $kelas
        ],200);
    }


}
