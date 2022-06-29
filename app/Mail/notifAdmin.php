<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class notifAdmin extends Mailable
{
    use Queueable, SerializesModels;

    
    public $namaWP;
    public $rincianPBB;


    public function __construct($namaWP,$rincianPBB)
    {
        $this->namaWP = $namaWP;
        $this->rincianPBB = $rincianPBB;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('adminX10@aziz.com')->view('mail.notif');
    }
}
