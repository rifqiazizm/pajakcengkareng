<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;


class Surattugas extends Model
{
    protected $table = 'surattugas';

    protected $fillable = [
        'namaPeserta',
        'alamatST',
        'tujuanST',
        'tglmulaiST',
        'tglselesaiST',
        'jammulaiST',
        'jamselesaiST',
        'agendaST',
        'urlFoto',
        'koordinat',
        'uraianLaporan',
        'notekakap',
        'seksi_id',
        'transport',        
        'approved',
        'released',
        'mobildinas_id',
    ];

    public function mobildinas() {
        return $this->belongsTo(Mobildinas::class,'mobildinas_id');
    }

    public function seksinya() {
        return $this->belongsTo(Seksi::class,'seksi_id');
    }

    // public function geturlFotoAttribute($value) {
    //     $st = Storage::url($value);
    //     $this->attributes['urlFoto'].'/initambahan';
    //     // return ucwords($st);
    // }


}
