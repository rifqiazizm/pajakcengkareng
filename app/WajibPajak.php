<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WajibPajak extends Model
{
    protected $table = 'wajibpajak';

    protected $fillable = [
        'npwp',
        'namaWP',
        'nop',
        'alamat',
        'kelurahan',
        'spop_kembali',
        'no_spop',
        'tgl_spop',
        'user_id',
        'wpp_id'
    ];

    // public function setNamaWPAttribute() {
    //     return 
    // }

    public function getNamaWPAttribute($str) {
        return ucwords($str);
    }

    public function wpp() {
        return $this->belongsTo(Wilayah::class,'wpp_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function tangkapan() {
        return $this->hasMany(Tangkapan::class,'wajibpajak_id');
    }

    public function kapal() {
        return $this->hasMany(Kapal::class, 'wajibpajak_id');
    }

    // public function getNpwpAttribute($data) {
    //     return ;
    // }


}
