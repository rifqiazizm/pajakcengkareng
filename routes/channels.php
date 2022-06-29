<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) { 
    return (int) $user->id === (int) $id;
});
 
// parameter pertama closure function akan mengambil instance user model yg sedang sign in, untuk parameter kedua diambil dari wildcard di dalam {} 
// bisa juga ngasi type hint model binding di parameter kedua supaya bisa mereturn langsung desired element from the eloquest model 

Broadcast::channel('cetak-KK', function($user) {
    return $user->email == 'aziz@gmail.com'; 
});