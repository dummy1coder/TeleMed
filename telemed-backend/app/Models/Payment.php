<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id', 
        'patient_email', 
        'patient_name', 
        'reference_number', 
        'amount', 
        'transaction_status', 
        'transaction_id'
    ];
}
