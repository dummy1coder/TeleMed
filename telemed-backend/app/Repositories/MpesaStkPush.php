<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Http;

class MpesaStkpush
{
    public function lipaNaMpesa($amount, $phone, $accountReference)
    {
        $timestamp = now()->format('YmdHis');
        $shortcode = env('MPESA_SHORTCODE');
        $passkey = env('MPESA_PASSKEY');
        $password = base64_encode($shortcode . $passkey . $timestamp);

        $response = Http::withToken($this->generateAccessToken())
            ->post(env('MPESA_STK_URL'), [
                "BusinessShortCode" => $shortcode,
                "Password" => $password,
                "Timestamp" => $timestamp,
                "TransactionType" => "CustomerPayBillOnline",
                "Amount" => $amount,
                "PartyA" => $phone,
                "PartyB" => $shortcode,
                "PhoneNumber" => $phone,
                "CallBackURL" => env('MPESA_CALLBACK_URL'),
                "AccountReference" => $accountReference,
                "TransactionDesc" => "Telemed Payment"
            ]);

        return $response->body();
    }


    public function status($checkoutRequestID)
{
    $timestamp = now()->format('YmdHis');
    $shortcode = env('MPESA_SHORTCODE');
    $initiatorName = env('MPESA_INITIATOR_NAME'); 
    $securityCredential = env('MPESA_SECURITY_CREDENTIAL'); 
    $response = Http::withToken($this->generateAccessToken())
        ->post('https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query', [
            "Initiator" => $initiatorName,
            "SecurityCredential" => $securityCredential,
            "CommandID" => "TransactionStatusQuery",
            "TransactionID" => $checkoutRequestID,
            "PartyA" => $shortcode,
            "IdentifierType" => "4",
            "ResultURL" => env('MPESA_CALLBACK_URL'),
            "QueueTimeOutURL" => env('MPESA_CALLBACK_URL'),
            "Remarks" => "Transaction status check",
            "Occasion" => "Check"
        ]);

    return $response->json();
}
    public function generateAccessToken()
    {
        $response = Http::withBasicAuth(
            env('MPESA_CONSUMER_KEY'),
            env('MPESA_CONSUMER_SECRET')
        )->get(env('MPESA_AUTH_URL'));

        return $response['access_token'] ?? null;
    }
}
