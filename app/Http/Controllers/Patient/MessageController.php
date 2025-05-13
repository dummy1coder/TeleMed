<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
{
    $messages = [
        [
            'from' => 'Dr. Jane Smith',
            'subject' => 'Lab Results',
            'preview' => 'Your lab results are ready. Please see the attached file...',
            'timestamp' => '2025-05-12 09:15 AM',
            'unread' => true
        ],
        [
            'from' => 'Dr. John Doe',
            'subject' => 'Follow-up Appointment',
            'preview' => 'Just a reminder for your follow-up on the 15th...',
            'timestamp' => '2025-05-10 2:00 PM',
            'unread' => false
        ],
    ];

    return view('patient.messages.index', compact('messages'));
}

}

