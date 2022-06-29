<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tangkapan extends Model
{
    protected $table = 'tangkapan';

    protected $fillable = [ 
        'wajibpajak_id',
        'ikan',
        'berat',
        'harga'
    ];

    public function wajibpajak() {
        return $this->belongsTo(WajibPajak::class,'wajibpajak_id');
    }



}
