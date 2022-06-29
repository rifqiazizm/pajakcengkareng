<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRpnkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rpnk', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('seksi_id')->unsigned();
            $table->string('nama');
            $table->string('nip');
            $table->string('tglmulai');
            $table->string('tglselesai');
            $table->string('asal');
            $table->string('tujuan');
            $table->string('transport');
            $table->string('keperluan');
            $table->timestamps();

            $table->foreign('seksi_id')->references('id')->on('seksi')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rpnk');
    }
}
