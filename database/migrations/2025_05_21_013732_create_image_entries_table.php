<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('image_entries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('path');

            $table->unsignedBigInteger('entry_id');
            $table->foreign('entry_id')
                ->on('entries')
                ->references('id')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_entries');
    }
};
