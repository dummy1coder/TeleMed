<?php

namespace App\Http\Controllers;

use App\Repositories\MpesaStkpush;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    public function stkPushRequest(Request $request)
    {

         Log::info('MPESA STK PUSH REQUEST:', $request->all());
         
        $request->validate([
            'phone_number' => 'required|string',
            'amount' => 'required|numeric|min:1',
            'appointment_id' => 'required|exists:appointments,id',
            'description' => 'nullable|string'
        ]);

        $phone = $this->formatPhone($request->phone_number);
        $amount = $request->amount;
        $description = $request->description ?? 'Telemed Appointment Payment';
        $accountReference = 'TXN#' . strtoupper(Str::random(8));

        $mpesa = new MpesaStkpush();
        $response = $mpesa->lipaNaMpesa($amount, $phone, $accountReference);

        $result = json_decode($response, true);

        if (isset($result['errorCode'])) {
            return response()->json([
                'status' => 'error',
                'message' => $result['errorMessage'] ?? 'Invalid phone number or request failed.',
            ], 400);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'STK Push request sent to phone.',
            'transaction' => $result,
            'accountReference' => $accountReference
        ]);
    }

    public function checkTransactionStatus($transactionCode)
    {
        $mpesa = new MpesaStkpush();
        $status = $mpesa->status($transactionCode);

        return response()->json([
            'status_code' => $status->ResponseCode ?? 'N/A',
            'message' => $status->ResultDesc ?? 'Unknown',
        ]);
    }


    private function formatPhone($phone)
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);

        if (Str::startsWith($phone, '0')) {
            $phone = '254' . substr($phone, 1);
        } elseif (Str::startsWith($phone, '+')) {
            $phone = substr($phone, 1);
        } elseif (!Str::startsWith($phone, '254')) {
            $phone = '254' . $phone;
        }

        return $phone;
    }
}
