<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKelasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kelas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama_sosis');
            $table->string('jenis_kelas');
            $table->date('tgl_kelas');
            $table->string('jam_mulai');
            $table->string('jam_selesai');
            $table->string('media');
            $table->integer('kapasitas');
            $table->string('id_zoom');
            $table->string('password_zoom');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kelas');
    }
}
