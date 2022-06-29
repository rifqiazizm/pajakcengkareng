<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Kapal;


class KapalController extends Controller
{
    
    public function show(Request $request) {
        $req = $request->user()->wajibpajak()->kapal(); // experimental! use wisely
        $kapal = Kapal::with('wajibpajak.user')->get();
        $hanyaUser = $kapal->where('wajibpajak.user.id','1');

        if($hanyaUser) {
            return response()->json([
                'status' => 'ok',
                'data' => $hanyaUser
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }

    }


    public function showPart($id) {

        $kapal = Kapal::where('wajibpajak_id',$id)->get();

        if(count($kapal) > 0) {
            return response()->json([
                'status' => 'oke',
                'data' => $kapal
            ]);
        } else {
            return response()->json([
                'status' => 'failed'
            ]);
        }

    }




    public function create(Request $request) {

        $this->validate($request, [
            'nama_kapal' => 'required|string',
            'no_siup' => 'required|string',
            'no_sipi' => 'required|string',
            'berat' => 'required|string'
        ]);

        $input = $request->all();

        $kapal = Kapal::create($input);

        if($kapal) {
            return response()->json([
                'status' => 'okee',
                'data' => $kapal
            ],201);
            

        } else {
            return response()->json([
                'status' => 'gagal menyimpan!'
            ],403);
        }

    }

    public function editKapal($id, Request $request) {
        $this->validate($request, [
            'nama_kapal' => 'required|string',
            'no_siup' => 'required|string',
            'no_sipi' => 'required|string',
            'berat' => 'required|string'
        ]);

        $data = Kapal::findOrFail($id);

        $data->update($request->all());

        return response()->json([
            'status' => 'success updating',
            'data' => $data
        ]);

    }

    public function delete($id) {
        $wp = Kapal::findOrFail($id);
        $wp->delete();
        return response()->json([
            'status' => 'success deleting',
            'data' => $wp
        ]);
    }
    





}
