<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('getRegion' , 'ApiController@getRegion');



Route::post('/sedotGan' , 'ApiController@sedotTokped');

Route::get('/kelas/fetchKelas', 'KelasController@fetchKelas');
Route::post('/kelas/daftarKelas', 'KelasController@daftarKelas');
Route::get('/kelas/jumlahPeserta/{kelas}','KelasController@jumlahPeserta');
Route::get('/kelas/kelasTerdaftar/{npwp}','KelasController@kelasTerdaftar');


Route::get('/goceng/getUser','GocengController@getUser');
Route::get('/goceng/getST/{id}','GocengController@getSurat');
Route::get('/goceng/fetchMobil','GocengController@fetchMobil');
Route::get('/goceng/getST','GocengController@getST');
Route::get('/goceng/getImage/{url}','GocengController@getImage');
Route::get('/goceng/getRpnk/{id}','RpnkController@fetchRPNK');
Route::get('/goceng/rekapST','RpnkController@cetakST');


Route::post('/goceng/checkUser','GocengController@loginApp');
Route::post('/goceng/surattugas','GocengController@createST');
Route::post('/goceng/laporanST','GocengController@laporanST');
Route::post('/goceng/rilisST','GocengController@rilisST');
Route::post('/goceng/rpnk','RpnkController@createRpnk');

Route::patch('/goceng/approve/{id}','GocengController@approveST');
Route::patch('/goceng/mobil/{id}','GocengController@updateMobil');
Route::patch('/goceng/notekakap/{id}','GocengController@sendNote');
Route::patch('/goceng/approveRPNK/{id}','RpnkController@updateStatus');


Route::middleware('auth')->group(function () { 
    // gabisa akses instance user model karena ini bukan web auth, klo api udh ada default make api auth
    // klo mau bisa akses user model di dalem middleware auth maka di routeservice provider yang mapAPIroutes ganti middleware jadi web
    // maka bisa make web auth,, 
    Route::get('/kapal/{userid}', 'KapalController@show');
    Route::get('/userid','WPController@tesaja');
});




Route::middleware('auth:api')->group(function () {

    Route::get('/tesaja','UserController@aziz');
    Route::get('/logout', 'Usercontroller@logout');
    Route::get('/details', 'Usercontroller@user');
    
    
});