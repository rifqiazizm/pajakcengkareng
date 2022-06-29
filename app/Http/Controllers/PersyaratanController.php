<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Persyaratan;

class PersyaratanController extends Controller
{
    public function getAllData() {
        $persyaratan = Persyaratan::all();
        return response()->json([
            'status' => 'ok',
            'data' => $persyaratan
        ]);
    }

    public function tambahPersyaratan(Request $request) {
        $this->validate($request,[
            'klasifikasi' => 'required|string',
            'jenis_permohonan' => 'required|string',
            'detail_persyaratan' => 'required|string'
        ]);

        $create = Persyaratan::create($request->all());
        if($create) {
            return response()->json([
                'status' => 'ok',
                'data' => $create
            ]);
        }
    }  

}
