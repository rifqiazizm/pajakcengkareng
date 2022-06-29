<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kapal extends Model
{
    protected $table = 'kapal';

    protected $fillable = [
        'wajibpajak_id',
        'nama_kapal',
        'no_siup',
        'no_sipi',
        'berat'
    ];

    public function wajibpajak() {
        return $this->belongsTo(WajibPajak::class,'wajibpajak_id');
    }
}
