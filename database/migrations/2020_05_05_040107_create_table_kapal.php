<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableKapal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kapal', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('wajibpajak_id')->unsigned();
            $table->string('nama_kapal');
            $table->string('no_siup');
            $table->string('no_sipi');
            $table->string('berat');
            $table->timestamps();


            $table->foreign('wajibpajak_id')->references('id')->on('wajibpajak')->onDelete('cascade')->onUpdate('cascade');

            
            


        });



    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kapal');
    }
}
