<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rpnk extends Model
{
    protected $table = 'rpnk';

    protected $fillable = [
        'nama',
        'seksi_id',
        'nip',
        'tglmulai',
        'tglselesai',
        'asal',
        'tujuan',
        'transport',
        'keperluan',
        'status'

    ];

    public function seksinya() {
        return $this->belongsTo(Seksi::class,'seksi_id');
    }

}
