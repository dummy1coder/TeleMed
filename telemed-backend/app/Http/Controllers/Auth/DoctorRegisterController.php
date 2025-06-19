<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;
use Illuminate\Validation\Rule;

class DoctorRegisterController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
    'name' => 'required|string|max:255',
    'email' => [
        'required',
        'email',
        Rule::unique('users')->where(function ($query) {
            return $query->where('role', 'doctor');
        }),
    ],
    'password' => ['required', 'confirmed', Rules\Password::defaults()],
    'specialization' => 'required|string|max:255',
    'medical_license_number' => 'required|string|max:100|unique:users,medical_license_number',
]);


        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'doctor',
            'specialization' => $validated['specialization'],
            'medical_license_number' => $validated['medical_license_number'],
        ]);

        Mail::to($user->email)->send(new WelcomeMail($user));

        Auth::login($user);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Doctor registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function index()
    {
        return User::where('role', 'doctor')->get();
    }

    public function show($id)
    {
        return User::where('role', 'doctor')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $doctor = User::where('role', 'doctor')->findOrFail($id);
        $doctor->update($request->all());
        return $doctor;
    }

    public function patch(Request $request, $id)
    {
        $doctor = User::where('role', 'doctor')->findOrFail($id);
        $doctor->fill($request->only(['name', 'email', 'specialization']))->save();
        return $doctor;
    }

    public function destroy($id)
    {
        $doctor = User::where('role', 'doctor')->findOrFail($id);
        $doctor->delete();
        return response()->json(null, 204);
    }
}
