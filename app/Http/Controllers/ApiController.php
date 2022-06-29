<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Goutte\Client as Goutte;


class ApiController extends Controller
{
    public function getRegion(...$rest) {
        return response()->json([
            'results' => [  
                [
                    'value' => '174',
                    'label' => 'Jakarta Barat'
                ],
                [
                    'value' => '175',
                    'label' => 'Jakarta Selatan'
                    
                ],
                [
                    'value' => '176',
                    'label' => 'Jakarta Pusat'
                ],
                [
                    'value' => '177',
                    'label' => 'Jakarta Utara'
                ],
                [
                    'value' => '178',
                    'label' => 'Jakarta Timur'
                ]


            ],
            'pagination' => [
                'more' => true
            ]
        ]);
    }

    public function sedotTokped(Request $request) {

        // $query = $request->query();

        $eksekusi = shell_exec('python '. app_path() .'\http\controllers\sedotTokped.py "heloooo"');

        if($eksekusi) {
            return response()->json([
                'status' => '200',
                'data' => $eksekusi
            ]);
        } else {
            return response()->json([
                'status' => '500',
                'data' => 'salah'
            ]);
        }
        
        


        
    }
}
