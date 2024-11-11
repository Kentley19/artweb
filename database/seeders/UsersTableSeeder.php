<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder; 
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash; // For password hashing
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'fname' => 'Admin',
                'mname' => 'Super',
                'lname' => 'User',
                'school_id' => 'admin',
                'email_verified_at' => now(),
                'password' => Hash::make('admin'),
                'type' => 'admin',
                'remember_token' => \Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
