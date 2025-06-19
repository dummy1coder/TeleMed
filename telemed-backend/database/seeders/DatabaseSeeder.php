<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
             'name' => 'Test User',
             'email' => 'test@example.com',
         ]);
          User::create([
        'name' => 'Doctor John',
        'email' => 'doctor@example.com',
        'password' => Hash::make('password'),
        'role' => 'doctor',
    ]);

    User::create([
        'name' => 'Patient Jane',
        'email' => 'patient@example.com',
        'password' => Hash::make('password'),
        'role' => 'patient',
    ]);
    }
}
