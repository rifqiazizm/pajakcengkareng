<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tangkapan;
use Auth;


class TangkapanController extends Controller
{
    
    public function showAll(Request $request) {

        // $tangkapan = Tangkapan::with('wajibpajak')->where('wajibpajak.user_id',$request->user()->id)->get();
        // $tangkapan = $request->user()->wajibpajak()->with('tangkapan')->get();
        $tangkapan = $request->user()->with(['wajibpajak.tangkapan' => function($qu) {
            $qu->where('ikan','like',['%lel%','%cumi%']);
        }])->get();


        if($tangkapan) {
            return response()->json([
                'status' => 'oke',
                'data' => $tangkapan
            ]);
        } else {
            return response()->json([
                'status' => 'failed'
            ]);
        }

    }

    public function showPart($id) {

        $tangkapan = Tangkapan::where('wajibpajak_id',$id)->get();


        if(count($tangkapan) > 0) {
            return response()->json([
                'status' => 'oke',
                'data' => $tangkapan
            ]);
        } else {
            return response()->json([
                'status' => 'failed'
            ]);
        }

    }


    public function create(Request $request) {
        $this->validate($request, [
            'ikan' => 'required|string',
            'berat' => 'required|string',
            'harga' => 'required|string'
        ]);

        $input = $request->all();
        
        $tangkap = Tangkapan::create($input);
        
        if($tangkap) {
            return response()->json([
                'status' => 'oke',
                'data' => $tangkap
            ]);
        } else {
            return response()->json([
                'status' => 'failed'
            ]);
        }

    }




    public function editTangkap($id, Request $request) {
        $this->validate($request, [
            'ikan' => 'required|string',
            'berat' => 'required|string',
            'harga' => 'required|string'
        ]);

        $input = $request->all();
        $tangkap = Tangkapan::findOrFail($id);
        $update = $tangkap->update($input);
        
        if($update) {
            return response()->json([
                'status' => 'oke',
                'data' => $update
            ]);
        } else {
            return response()->json([
                'status' => 'failed'
            ]);
        }

    }


    public function delete($id) {
        $ikan = Tangkapan::findOrFail($id);
        $ikan->delete();
        return response()->json([
            'status' => 'success deleting',
            'data' => $ikan
        ]);
    }


}
