<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Events\CetakEvent;
 
Route::get('/loginPage' , function() {
    return view('login');
});


Route::middleware('auth')->group(function() {

    Route::view('/{path?}', 'home'); // buat route ke ReactJS

    Route::get('/user/details','Usercontroller@details');
    Route::get('/wp/userid','WPController@tesaja');
    Route::get('/wp/fetchshow', 'WPController@show');
    Route::get('/wp/besar','WPController@WPBesar');
    
    Route::post('/wp/fetchWP','WPController@fetchWP');
    Route::post('/wp/fdm','WPController@fetchWP_FDM');
    Route::post('/wp/tambahWP','WPController@createWP');
    Route::patch('/wp/editWP/{id}','WPController@edit'); // sebenarnya make method post juga ttp jalan
    Route::delete('/wp/deleteWP/{id}','WPController@delete');
 

    Route::get('/wp/tangkapan/all', 'TangkapanController@showAll');
    Route::get('/wp/tangkapan/{id}', 'TangkapanController@showPart');
    Route::post('/wp/tangkapan/add','TangkapanController@create');
    Route::delete('/wp/tangkapan/del/{id}','TangkapanController@delete');

    Route::get('/wp/kapal/{id}', 'KapalController@showPart');
    Route::post('/wp/kapal/add','KapalController@create');
    Route::delete('/wp/kapal/del/{id}','KapalController@delete');

    Route::get('/cetak/kertasKerja/{id}','WPController@kertas_kerja');
    Route::get('/cetak/FDM/{id}','WPController@fdm');

    Route::post('/kelas/create','KelasController@createKelas');
    Route::patch('/kelas/edit/{id}','KelasController@edit');
    Route::delete('/kelas/delete/{id}', 'KelasController@delete');
    Route::get('/kelas/listPeserta/{kelas}','KelasController@fetchPeserta');
    Route::delete('/kelas/listPeserta/delete/{id}', 'KelasController@deletePeserta');

    Route::get('/tes/pusher',function() {
        broadcast(new CetakEvent("solis gud",['cek','aman','sip']));
    });
    
}); 



Route::group(['prefix' => 'admin'], function() {
    
    Auth::routes();

});


Route::get('/home', 'HomeController@index')->name('home');
