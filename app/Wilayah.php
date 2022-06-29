<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wilayah extends Model
{
    protected $table = 'wpp';

    protected $fillable = [
        'kode',
        'daerah',
        'luas'
    ];

    public function wajibpajak() {
        return $this->hasMany(WajibPajak::class,'wpp_id');
    }

    // public function getLuasAttribute($data) {
    //     $jml = strlen($data);
        
        
    // }
}
