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
        Schema::create('login_backlogs', function (Blueprint $table) {
            $table->id();
            $table->string('school_id');
            $table->timestamp('login_time');
            $table->timestamps();
        });
        Schema::create('room_backlogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id'); 
            $table->string('room');
            $table->enum('type', ['exit', 'enter']);
            $table->timestamp('logs_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('login_backlogs');
        Schema::dropIfExists('room_backlogs');
    }
};
