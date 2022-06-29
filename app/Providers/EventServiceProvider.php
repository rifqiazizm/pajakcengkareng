<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\CetakEvent;
use App\Listeners\NotifViaEmail;


class EventServiceProvider extends ServiceProvider
{



    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        CetakEvent::class => [
            NotifViaEmail::class,
        ]

    ];




    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
