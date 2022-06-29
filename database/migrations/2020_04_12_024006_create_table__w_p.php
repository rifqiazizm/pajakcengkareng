<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableWP extends Migration
{
    /** 
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::enableForeignKeyConstraints();
        Schema::create('wajibpajak', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('wpp_id')->unsigned();
            $table->string('npwp')->unique();
            $table->string('namaWP');
            $table->string('nop');
            $table->string('alamat');
            $table->string('kelurahan');
            $table->boolean('spop_kembali')->nullable();
            $table->bigInteger('no_spop');
            $table->date('tgl_spop');
              
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('wpp_id')->references('id')->on('wpp')->onDelete('cascade')->onUpdate('cascade');

            

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
        Schema::dropIfExists('wajibpajak');
    }
}
