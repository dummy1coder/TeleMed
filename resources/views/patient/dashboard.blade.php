@extends('layouts.app')

@section('content')
<div class="container-fluid mt-4">
    <div class="row mb-4">
        <div class="col">
            <h2>Welcome, {{ auth()->user()->name }}</h2>
        </div>
    </div>

    <div class="row">
        <!-- Appointments -->
        <div class="col-md-4">
            <div class="card shadow rounded-lg border-0">
                <div class="card-body">
                    <h5 class="card-title">Upcoming Appointments</h5>
                    <p class="card-text">You have 2 appointments this week.</p>
                    <a href="{{ route('patient.appointment.index') }}" class="btn btn-sm btn-primary">View Appointments</a>
                </div>
            </div>
        </div>

        <!-- Messages -->
        <div class="col-md-4">
            <div class="card shadow rounded-lg border-0">
                <div class="card-body">
                    <h5 class="card-title">Messages</h5>
                    <p class="card-text">3 unread messages from your doctor.</p>
                    <a href="{{ route('patient.message.index') }}" class="btn btn-sm btn-primary">Check Messages</a>
                </div>
            </div>
        </div>

        <!-- Records -->
        <div class="col-md-4">
            <div class="card shadow rounded-lg border-0">
                <div class="card-body">
                    <h5 class="card-title">Medical Records</h5>
                    <p class="card-text">Prescriptions, history, and reports.</p>
                    <a href="{{ route('patient.record.index') }}" class="btn btn-sm btn-primary">View Records</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Health Chart -->
    <div class="row mt-4">
        <div class="col-md-12">
            <div class="card shadow rounded-lg border-0">
                <div class="card-body">
                    <h5 class="card-title">Health Trend: Blood Pressure</h5>
                    <canvas id="bpChart" height="100"></canvas>
                </div>
            </div>
        </div>
    </div>

    <!-- Reminders and Events -->
    <div class="row mt-4">
        <!-- Reminders -->
        <div class="col-md-6">
            <div class="card shadow rounded-lg border-0">
                <div class="card-body">
                    <h5 class="card-title">Reminders</h5>
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Take medication
                            <span class="badge bg-primary rounded-pill">8:00 AM</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Appointment: Dr. Smith
                            <span class="badge bg-danger rounded-pill">Tomorrow</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Check blood sugar
                            <span class="badge bg-success rounded-pill">Daily</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Upcoming Events -->
        <div class="col-md-6">
            <div class="card shadow rounded-lg border-0">
                <div class="card-body">
                    <h5 class="card-title">Upcoming Events</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><i class="fas fa-calendar-alt text-primary me-2"></i> <strong>May 15:</strong> Flu Shot Clinic</li>
                        <li class="mb-2"><i class="fas fa-calendar-check text-success me-2"></i> <strong>May 20:</strong> Dental Check-up</li>
                        <li class="mb-2"><i class="fas fa-calendar text-warning me-2"></i> <strong>May 22:</strong> Nutrition Webinar</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const ctx = document.getElementById('bpChart').getContext('2d');
const bpChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Systolic',
                data: [120, 122, 125, 121, 119],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.4
            },
            {
                label: 'Diastolic',
                data: [80, 82, 79, 81, 80],
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});
</script>
@endpush
