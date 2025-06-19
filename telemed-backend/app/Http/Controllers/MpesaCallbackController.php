<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MpesaCallbackController extends Controller
{
    public function handleCallback(Request $request)
    {
        Log::info('📥 M-Pesa STK Push Callback Received', $request->all());

        $data = $request->input('Body.stkCallback');

        if (!$data) {
            Log::warning('⚠️ Missing stkCallback in M-Pesa callback');
            return response()->json(['status' => 'Invalid callback format'], 400);
        }

        $resultCode = $data['ResultCode'];
        $resultDesc = $data['ResultDesc'];
        $merchantRequestID = $data['MerchantRequestID'];
        $checkoutRequestID = $data['CheckoutRequestID'];
        $amount = null;
        $mpesaReceipt = null;
        $phoneNumber = null;

        if ($resultCode === 0) {
            // Parse callback metadata
            foreach ($data['CallbackMetadata']['Item'] as $item) {
                if ($item['Name'] === 'Amount') {
                    $amount = $item['Value'];
                } elseif ($item['Name'] === 'MpesaReceiptNumber') {
                    $mpesaReceipt = $item['Value'];
                } elseif ($item['Name'] === 'PhoneNumber') {
                    $phoneNumber = $item['Value'];
                }
            }

            Log::info("✅ Payment Successful | Phone: $phoneNumber | Amount: $amount | Receipt: $mpesaReceipt");

            // Optional: Save transaction in DB here

        } else {
            Log::error("❌ Payment Failed | Code: $resultCode | Desc: $resultDesc");
        }

        return response()->json(['status' => 'Callback processed'], 200);
    }

    public function handleResult(Request $request)
    {
        Log::info("Transaction Status Result", $request->all());
        return response()->json(['status' => 'Result received'], 200);
    }

    public function handleTimeout(Request $request)
    {
        Log::info("Transaction Status Timeout", $request->all());
        return response()->json(['status' => 'Timeout received'], 200);
    }
}
