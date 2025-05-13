@extends('layouts.app')

@section('content')
<div class="content-header">
    <div class="container-fluid">
        <h1 class="m-0">My Medical Records</h1>
    </div>
</div>

<div class="content">
    <div class="container-fluid">

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Medical History</h3>
            </div>

            <div class="card-body p-0">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Doctor</th>
                            <th>Summary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($records as $record)
                            <tr>
                                <td>{{ $record['date'] }}</td>
                                <td>{{ $record['doctor'] }}</td>
                                <td>{{ $record['summary'] }}</td>
                                <td>
                                    <a href="{{ asset('storage/records/' . $record['file']) }}" class="btn btn-sm btn-primary" target="_blank">View</a>
                                    <a href="{{ asset('storage/records/' . $record['file']) }}" class="btn btn-sm btn-secondary" download>Download</a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="text-center text-muted">No medical records found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
@endsection
