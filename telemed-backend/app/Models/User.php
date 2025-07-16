<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Appointment;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $appends = ['full_name'];
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    protected $fillable = [
    'name',
    'email',
    'password',
    'role',
    'phone',
    'dob',
    'gender',
    'address',
];


    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'user_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function toArray()
    {
        $array = parent::toArray();

        if ($this->role === 'patient') {
            unset(
                $array['specialization'],
                $array['medical_license_number'],
                $array['appointment_time'],
                $array['phone'],
                $array['services'],
                $array['profile'],
                $array['profile_image']
            );
        }

         if ($this->role === 'doctor') {
            
        }

        return $array;
    }

    public function notificationSetting()
    {
        return $this->hasOne(NotificationSetting::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

}
