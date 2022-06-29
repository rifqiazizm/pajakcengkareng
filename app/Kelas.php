<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    protected $table = 'kelas';

    protected $fillable = [
        'nama_sosis',
        'jenis_kelas',
        'tgl_kelas',
        'jam_mulai',
        'jam_selesai',
        'media',
        'kapasitas',
        'id_zoom',
        'password_zoom'
    ];

    
    public function peserta() {
        return $this->hasMany(PesertaKelas::class, 'kelas_id');
    }


}
