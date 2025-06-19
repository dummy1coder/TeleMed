<?php

namespace App\Repositories;

use Carbon\Carbon;

class MpesaStkpush
{
    protected $consumer_key;
    protected $consumer_secret;
    protected $passkey;
    protected $amount;
    protected $accountReference;
    protected $phone;
    protected $env;
    protected $short_code;
    protected $parent_short_code;
    protected $initiatorName;
    protected $initiatorPassword;
    protected $CallBackURL;

    public function __construct()
    {
        $this->short_code = '7854001';
        $this->consumer_key = ' rfKeop0oAFELMhxaDAJr2wZ0P1FD77wANFfOLpxA5pIPiAbo';
        $this->consumer_secret = ' PdeYdbGgW1y9VA6HM1zOIrxrfazT5cPsvRpLrt6VR3oQnYKfDzNM1DLMtG8dGQRb'; 
        $this->passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; 
        $this->CallBackURL = ' '; // Your Callback URL
        $this->env = 'sandbox'; // Environment
        //$this->initiatorName = 'testapi';
        //$this->initiatorPassword = 'Safaricom978!';
        $this->parent_short_code = '5868111';
    }

    public function getPassword($timestamp)
    {
        return base64_encode($this->short_code . $this->passkey . $timestamp);
    }

    public function lipaNaMpesa($amount, $phone, $accountReference)
    {
        $this->phone = $phone;
        $this->amount = $amount;
        $this->accountReference = $accountReference;

        $timestamp = Carbon::now()->format('YmdHis');
        $password = $this->getPassword($timestamp);

        $headers = ['Content-Type:application/json; charset=utf8'];

        $access_token_url = $this->env == "live"
            ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
            : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

        $initiate_url = $this->env == "live"
            ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
            : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

        // Get access token
        $curl = curl_init($access_token_url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curl, CURLOPT_HEADER, FALSE);
        curl_setopt($curl, CURLOPT_USERPWD, $this->consumer_key . ':' . $this->consumer_secret);
        $result = curl_exec($curl);
        $result = json_decode($result);
        curl_close($curl);

        $access_token = $result->access_token ?? null;
        if (!$access_token) {
            return response()->json(['error' => 'Access token missing'], 500);
        }

        $stkheader = [
            'Content-Type:application/json',
            'Authorization:Bearer ' . $access_token
        ];

        $curl_post_data = [
            'BusinessShortCode' => $this->short_code,
            'Password' => $password,
            'Timestamp' => $timestamp,
            'TransactionType' => 'CustomerBuyGoodsOnline',
            'Amount' => $this->amount,
            'PartyA' => $phone,
            'PartyB' => $this->parent_short_code,
            'PhoneNumber' => $phone,
            'CallBackURL' => $this->CallBackURL,
            'AccountReference' => $this->accountReference,
            'TransactionDesc' => "$phone has paid {$this->amount} to {$this->short_code}"
        ];

        $data_string = json_encode($curl_post_data);

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $initiate_url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $stkheader);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
        $response = curl_exec($curl);
        curl_close($curl);

        return $response;
    }

    public function status($transactionCode)
    {
        $type = 4;
        $command = "TransactionStatusQuery";
        $remarks = "Transaction Status Query";
        $occasion = "Transaction Status Query";
        $results_url = "https://mydomain.com/TransactionStatus/result/";
        $timeout_url = "https://mydomain.com/TransactionStatus/queue/";

        $access_token_url = $this->env == "live"
            ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
            : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

        $credentials = base64_encode($this->consumer_key . ':' . $this->consumer_secret);

        $ch = curl_init($access_token_url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Basic " . $credentials]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        curl_close($ch);

        $result = json_decode($response);
        $token = $result->access_token ?? null;

        if (!$token) return response()->json(['error' => 'Access token not available'], 500);

        $publicKey = file_get_contents(__DIR__ . "/mpesa_public_cert.cer");
        openssl_public_encrypt($this->initiatorPassword, $encrypted, $publicKey, OPENSSL_PKCS1_PADDING);
        $password = base64_encode($encrypted);

        $curl_post_data = [
            "Initiator" => $this->initiatorName,
            "SecurityCredential" => $password,
            "CommandID" => $command,
            "TransactionID" => $transactionCode,
            "PartyA" => $this->short_code,
            "IdentifierType" => $type,
            "ResultURL" => $results_url,
            "QueueTimeOutURL" => $timeout_url,
            "Remarks" => $remarks,
            "Occasion" => $occasion,
        ];

        $data_string = json_encode($curl_post_data);

        $endpoint = $this->env == "live"
            ? "https://api.safaricom.co.ke/mpesa/transactionstatus/v1/query"
            : "https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query";

        $ch2 = curl_init($endpoint);
        curl_setopt($ch2, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json'
        ]);
        curl_setopt($ch2, CURLOPT_POST, 1);
        curl_setopt($ch2, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch2);
        curl_close($ch2);

        return json_decode($response);
    }
}
