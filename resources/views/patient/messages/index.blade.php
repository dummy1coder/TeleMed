@extends('layouts.app')

@section('content')
<div class="content-header">
    <div class="container-fluid">
        <h1 class="m-0">Messages</h1>
    </div>
</div>

<div class="content">
    <div class="container-fluid">

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Inbox</h3>
            </div>

            <div class="card-body p-0">
                <ul class="list-group list-group-flush">
                    @forelse ($messages as $message)
                        <li class="list-group-item d-flex justify-content-between align-items-start {{ $message['unread'] ? 'bg-light font-weight-bold' : '' }}">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">{{ $message['subject'] }}</div>
                                <small>From: {{ $message['from'] }}</small><br>
                                <span class="text-muted">{{ $message['preview'] }}</span>
                            </div>
                            <span class="text-muted small">{{ $message['timestamp'] }}</span>
                        </li>
                    @empty
                        <li class="list-group-item text-muted text-center">No messages yet.</li>
                    @endforelse
                </ul>
            </div>
        </div>

    </div>
</div>
@endsection
