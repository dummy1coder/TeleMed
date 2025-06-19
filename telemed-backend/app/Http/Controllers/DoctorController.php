<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    public function profile(Request $request)
    {
        $doctor = $request->user();

        return response()->json($doctor);
    }

    public function updateProfile(Request $request)
    {
        $doctor = $request->user();

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'specialization' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'appointmentTime' => 'nullable|string|max:10',
            'services' => 'nullable|string|max:500',
            'profile' => 'nullable|string|max:1000',
            'profileImage' => 'nullable|image|max:2048', 
        ]);

        if (isset($data['appointmentTime'])) {
            $data['appointment_time'] = $data['appointmentTime'];
            unset($data['appointmentTime']);
        }

        if ($request->hasFile('profileImage')) {
            if ($doctor->profile_image) {
                Storage::delete($doctor->profile_image);
            }

            $path = $request->file('profileImage')->store('profile_images', 'public');
            $data['profile_image'] = $path;
        }

        $doctor->update($data);

        return response()->json([
            'message' => 'Profile updated successfully.',
            'doctor' => $doctor
        ]);
    }

    public function changePassword(Request $request)
{
    $validator = Validator::make($request->all(), [
        'current' => 'required|string',
        'new' => 'required|string|min:8|confirmed',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors(),
        ], 422);
    }

    $doctor = $request->user();

    // Check current password
    if (!Hash::check($request->current, $doctor->password)) {
        return response()->json([
            'message' => 'Current password is incorrect.',
        ], 403);
    }

    // Update password
    $doctor->password = Hash::make($request->new);
    $doctor->save();

    return response()->json([
        'message' => 'Password changed successfully.',
    ]);
}
}
