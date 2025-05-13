<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
{
    $appointments = [
        [
            'date' => '2025-05-14',
            'time' => '10:00 AM',
            'doctor' => 'Dr. Jane Smith',
            'status' => 'confirmed',
        ],
        [
            'date' => '2025-05-20',
            'time' => '2:30 PM',
            'doctor' => 'Dr. John Doe',
            'status' => 'pending',
        ],
        [
            'date' => '2025-04-10',
            'time' => '1:00 PM',
            'doctor' => 'Dr. Alex Green',
            'status' => 'cancelled',
        ],
    ];

    return view('patient.appointment.index', compact('appointments'));
}

}

