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
        Schema::create('activity', function (Blueprint $table) {
            $table->id(); 
            $table->string('url');
            $table->string('title');  
            $table->date('dateDue')->nullable();  
            $table->string('user_id')->constrained('users')->onDelete('cascade');
            $table->string('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->timestamps();
        });
        
        Schema::create('activity_backlogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');  
            $table->foreignId('activity_id')->constrained('activity')->onDelete('cascade');  
            $table->string('duration_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity');
        Schema::dropIfExists('activity_backlogs');
    }
};
