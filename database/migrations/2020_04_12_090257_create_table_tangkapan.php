<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableTangkapan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tangkapan', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('wajibpajak_id')->unsigned();
            $table->string('ikan');
            $table->bigInteger('berat');
            $table->bigInteger('harga');
            
            $table->foreign('wajibpajak_id')->references('id')->on('wajibpajak')->onDelete('cascade')->onUpdate('cascade');



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
        Schema::dropIfExists('tangkapan');
    }
}
