<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Persyaratan extends Model
{
    protected $table = 'persyaratan';

    protected $fillable = [
        'klasifikasi',
        'jenis_permohonan',
        'detail_persyaratan',
    ];

    public function getJenisPermohonanAttribute(String $str) {
        return ucwords($str);
    }
}
