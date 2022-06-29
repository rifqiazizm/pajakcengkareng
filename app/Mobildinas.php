<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mobildinas extends Model
{
    protected $table = 'mobildinas';

    protected $fillable = [
        'merk',
        'tipe',
        'warna',
        'plat',
        'url'
    ];

    public function surattugas() {
        return $this->hasMany(Mobildinas::class,'mobildinas_id');
    }


}
