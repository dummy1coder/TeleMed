<?php

namespace App\Http\Controllers;

use App\Repositories\MpesaStkpush;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\Payment;
use App\Models\Appointment;

class TransactionController extends Controller
{
    public function stkPushRequest(Request $request)
    {

        Log::info('MPESA STK PUSH REQUEST:', $request->all());
        dump($request);
        $request->validate([
            'phone_number' => 'required|string',
            'amount' => 'required|numeric|min:1',
            'appointment_id' => 'required|exists:appointments,id',
            'description' => 'nullable|string'
        ]);

        $phone = $this->formatPhone($request->phone_number);
        $amount = $request->amount;
        $description = $request->description ?? 'Telemed Payment';
        $accountReference = 'TXN#' . strtoupper(Str::random(8));

        $appointment = Appointment::findOrFail($request->appointment_id);

        $mpesa = new MpesaStkpush();
        $response = $mpesa->lipaNaMpesa($amount, $phone, $accountReference);
        $result = json_decode($response, true);

        dump($response);
        dump($result);

        if (!isset($result['errorCode']) && isset($result['CheckoutRequestID'])) {
            Appointment::where('id', $request->appointment_id)->update([
                'checkout_request_id' => $result['CheckoutRequestID'],
            ]);
            return response()->json([
                'status' => 'error',
                'message' => $result['errorMessage'] ?? 'Invalid phone number or request failed.',
            ], 400);
        }

        if (!empty($result['CheckoutRequestID'])) {
            \App\Models\Appointment::where('id,$request->appointment_id')->update(['checkout_request_id' => $result['CheckoutRequestID']]);
        }

        $appointment->checkout_Request_id = $result['CheckoutRequestID'];

        $payment = Payment::create([
            'patient_id' => $appointment->patient_id,
            'patient_email' => $appointment->email,
            'patient_name' => $appointment->name,
            'reference_number' => $accountReference,
            'amount' => $amount,
            'transaction_status' => 'pending',
            'transaction_id' => 'none'
        ]);

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
