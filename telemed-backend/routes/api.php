<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Auth\DoctorRegisterController;
use App\Http\Controllers\MpesaCallbackController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;

// 🔓 Public routes
Route::post('/patient/register', [AuthController::class, 'register']);
Route::post('/doctor/register', [DoctorRegisterController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ M-PESA PUBLIC ROUTES
Route::post('/mpesa/stkpush', [TransactionController::class, 'stkPushRequest']);
Route::post('/mpesa/callback', [MpesaCallbackController::class, 'handleCallback']);
Route::get('/confirm/{transactionCode}', [TransactionController::class, 'checkTransactionStatus']);
Route::post('/mpesa/status/result', [MpesaCallbackController::class, 'handleResult']);
Route::post('/mpesa/status/timeout', [MpesaCallbackController::class, 'handleTimeout']);


// 🔐 Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn() => response()->json(auth()->user()));

    // Doctors
    Route::get('/doctors', [DoctorRegisterController::class, 'index']);  
    Route::get('/doctors/{id}', [DoctorRegisterController::class, 'show']);
    Route::put('/doctors/{id}', [DoctorRegisterController::class, 'update']);
    Route::patch('/doctors/{id}', [DoctorRegisterController::class, 'patch']); 
    Route::delete('/doctors/{id}', [DoctorRegisterController::class, 'destroy']); 
    Route::get('/doctor/profile', [DoctorController::class, 'profile']);
    Route::post('/doctor/update', [DoctorController::class, 'updateProfile']);
    Route::post('/doctor/change-password', [DoctorController::class, 'changePassword']);

    // Patients
    Route::get('/patients', [AuthController::class, 'index']); 
    Route::get('/patients/{id}', [AuthController::class, 'show']); 
    Route::put('/patients/{id}', [AuthController::class, 'update']); 
    Route::patch('/patients/{id}', [AuthController::class, 'patch']); 
    Route::delete('/patients/{id}', [AuthController::class, 'destroy']); 

    // Chat
    Route::get('/chat-users', [ChatController::class, 'chatUsers']);
    Route::post('/messages', [ChatController::class, 'message']);
    Route::get('/messages/{userId}', [ChatController::class, 'fetchMessages']);
});
