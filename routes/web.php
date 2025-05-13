<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Doctor\DashboardController as DoctorDashboard;
use App\Http\Controllers\Patient\DashboardController;
use App\Http\Controllers\Patient\AppointmentController;
use App\Http\Controllers\Patient\MessageController;
use App\Http\Controllers\Patient\RecordController;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::middleware(['auth', 'role:doctor'])->group(function () {
    Route::get('/doctor/dashboard', [DoctorDashboard::class, 'dashboard'])->name('doctor.dashboard');
});

Route::middleware(['auth', 'role:patient'])->prefix('patient')->name('patient.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/appointments', [\App\Http\Controllers\Patient\AppointmentController::class, 'index'])->name('appointment.index');
    Route::get('/messages', [\App\Http\Controllers\Patient\MessageController::class, 'index'])->name('message.index');
    Route::get('/records', [\App\Http\Controllers\Patient\RecordController::class, 'index'])->name('record.index');
});






