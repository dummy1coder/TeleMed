<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MpesaCallbackController extends Controller
{
    public function handleCallback(Request $request)
    {
        Log::info('M-Pesa Callback:', $request->all());

        return response()->json(['status' => 'Callback received'], 200);
    }
}

