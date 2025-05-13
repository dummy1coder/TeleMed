<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    public function index()
{
    $records = [
        [
            'date' => '2025-04-15',
            'doctor' => 'Dr. Jane Smith',
            'summary' => 'Routine check-up, all vitals normal.',
            'file' => 'report_2025_04_15.pdf'
        ],
        [
            'date' => '2025-03-20',
            'doctor' => 'Dr. John Doe',
            'summary' => 'Blood test and ECG done. Slightly elevated cholesterol.',
            'file' => 'ecg_bloodtest_2025_03_20.pdf'
        ],
    ];

    return view('patient.record.index', compact('records'));
}

}

