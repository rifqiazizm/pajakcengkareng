<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Seksi extends Model
{
    protected $table = 'seksi';

    protected $fillable = [
        'username',
        'password',
        'namaSeksi',
        'userLevel'
    ];

    public function getRouteKeyName() {
        return 'username';
    }

    public function surattugas() {
        return $this->hasMany(Surattugas::class,'seksi_id');
    }
}
