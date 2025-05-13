@extends('layouts.app')

@section('content')
<div class="content-header">
    <div class="container-fluid">
        <h1 class="m-0">My Appointments</h1>
    </div>
</div>

<div class="content">
    <div class="container-fluid">

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Appointment History</h3>
            </div>
            <div class="card-body p-0">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($appointments as $appointment)
                            <tr>
                                <td>{{ $appointment['date'] }}</td>
                                <td>{{ $appointment['time'] }}</td>
                                <td>{{ $appointment['doctor'] }}</td>
                                <td>
                                    @php
                                        $badgeClass = match($appointment['status']) {
                                            'confirmed' => 'badge-success',
                                            'pending' => 'badge-warning',
                                            'cancelled' => 'badge-danger',
                                            default => 'badge-secondary'
                                        };
                                    @endphp
                                    <span class="badge {{ $badgeClass }}">{{ ucfirst($appointment['status']) }}</span>
                                </td>
                                <td>
                                    <a href="#" class="btn btn-sm btn-info">View</a>
                                    @if($appointment['status'] === 'pending')
                                        <a href="#" class="btn btn-sm btn-danger">Cancel</a>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                        @if (count($appointments) === 0)
                            <tr>
                                <td colspan="5" class="text-center text-muted">No appointments found.</td>
                            </tr>
                        @endif
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
@endsection
