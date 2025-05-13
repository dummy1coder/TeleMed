@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Doctor Dashboard</h1>
    <p>Welcome, Dr. {{ auth()->user()->name }}!</p>
</div>
@endsection
