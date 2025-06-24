<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    //Register Patient
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
    'name' => 'required|string|max:255',
    'email' => [
        'required',
        'email',
        Rule::unique('users')->where(function ($query) {
            return $query->where('role', 'patient');
        }),
    ],
    'password' => 'required|string|confirmed|min:8',
]);


        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'patient',
        ]);

        Mail::to($user->email)->send(new WelcomeMail($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Patient registered successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    //Login (works for all users)
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'role' => 'required|in:admin,doctor,patient',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
        ]);
    }

    //profile
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateProfile(Request $request)
    {

        \Log::info('UpdateProfile Request', $request->all());

        $user = $request->user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'dob' => 'nullable|date',
            'gender' => 'nullable|string',
            'address' => 'nullable|string|max:255',
        ]);
        $user->update($validated);
        return response()->json($user);
    }


    //Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    //Get All Patients
    public function index()
    {
        return User::where('role', 'patient')->get();
    }

    //Get Single Patient
    public function show($id)
    {
        return User::where('role', 'patient')->findOrFail($id);
    }

    //Full Update Patient
    public function update(Request $request, $id)
    {
        $user = User::where('role', 'patient')->findOrFail($id);
        $user->update($request->all());

        return $user;
    }

    //Partial Update Patient
    public function patch(Request $request, $id)
    {
        $user = User::where('role', 'patient')->findOrFail($id);
        $user->fill($request->only(['name', 'email']))->save();

        return $user;
    }

    //Delete Patient
    public function destroy($id)
    {
        $user = User::where('role', 'patient')->find($id);

        if (!$user) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Patient deleted successfully']);
    }
}
