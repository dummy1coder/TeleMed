<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AppointmentController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'type' => 'required|string',
        'date' => 'required|date',
        'time' => 'required',
        'amount' => 'required|numeric',
        'doctor_id' => 'required|exists:users,id',
    ]);

    $appointment = Appointment::create([
        'patient_id' => auth()->id(),
        'doctor_id' => $request->doctor_id,
        'type' => $request->type,
        'date' => $request->date,
        'time' => $request->time,
        'amount' => $request->amount,
    ]);

    return response()->json($appointment, 201);
}


    public function index()
    {
         $appointments = Appointment::with('doctor')
        ->where('patient_id', auth()->id())
        ->get();

    return response()->json($appointments);
    }

    public function destroy($id)
{
    $appointment = Appointment::findOrFail($id);
    $appointment->delete();

    return response()->json(['message' => 'Appointment deleted successfully']);
}

}
