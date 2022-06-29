<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CetakEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    
    public $namaWP;
    public $rincianPBB;


    public function __construct($namaWP,$rincianPBB)
    {
        $this->namaWP = $namaWP;
        $this->rincianPBB = $rincianPBB;
    }

   


    
    public function broadcastOn()
    {
        return new PrivateChannel('cetak-KK');
    }
}
