<?php

namespace App\Listeners;

use App\Events\CetakEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use App\Mail\notifAdmin;


class NotifViaEmail implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  CetakEvent  $event
     * @return void
     */
    public function handle(CetakEvent $event)
    {
      
        Mail::to('rifqiazizsmg@gmail.com')->send(new notifAdmin($event->namaWP,$event->rincianPBB));

    }
}
