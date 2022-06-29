<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableWilayah extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wpp', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->string('kode')->unique();
            $table->string('daerah');
            $table->bigInteger('luas')->unsigned();
            
            // INGETTT MIGRASI ITU DIJALANIN BERURUTAN!!! (filenya, urut dari alpabet nama file)

            // jadi kalo ada tablew yang ada foreign key nya ke table lain, maka table lain tersebut harus udah dibuat
            // dan juga syarat foreign key itu harus sama PERSIS datatype nya sama reference nya
            // sama2 unsigned() dan bigInteger() misal

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
        Schema::dropIfExists('wpp');
    }
}
