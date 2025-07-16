<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function patient_can_register()
    {
        $response = $this->postJson('/api/patient/register', [
            'name' => 'Test Patient',
            'email' => 'patient@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'access_token',
                     'token_type',
                     'user' => ['id', 'name', 'email', 'role']
                 ]);

        $this->assertDatabaseHas('users', [
            'email' => 'patient@example.com',
            'role' => 'patient'
        ]);
    }

    public function doctor_can_register()
    {
        $response = $this->postJson('/api/doctor/register', [
            'name' => 'Dr. John Doe',
            'email' => 'doctor@example.com',
            'password' => 'securePass123',
            'password_confirmation' => 'securePass123',
            'specialization' => 'Cardiology',
            'medical_license_number' => 'LIC123456'
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'message',
                     'user' => ['id', 'name', 'email', 'role'],
                     'token'
                 ]);

        $this->assertDatabaseHas('users', [
            'email' => 'doctor@example.com',
            'role' => 'doctor'
        ]);
    }

    public function user_can_login()
    {
        $user = User::factory()->create([
            'email' => 'login@example.com',
            'password' => bcrypt('password123'),
            'role' => 'patient'
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'login@example.com',
            'password' => 'password123',
            'role' => 'patient'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'user' => ['id', 'name', 'email', 'role'],
                     'token'
                 ]);
    }

    public function unauthorized_access_to_protected_routes_should_fail()
    {
        $response = $this->getJson('/api/patients');

        $response->assertStatus(401);
    }
}

