<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PesertaKelas extends Model
{
    protected $table = 'peserta_kelas';

    protected $fillable = [
        'kelas_id',
        'npwp',
        'namaWP',
        'no_efin',
        'no_hp'
    ];


    public function kelas() {
        return $this->belongsTo(Kelas::class,'kelas_id');
    }

}
