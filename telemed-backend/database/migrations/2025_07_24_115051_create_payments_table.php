<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('patient_id');
            $table->string('patient_email')->nullable()->change();
            $table->string('patient_name')->nullable()->change();
            $table->string('reference_number')->nullable()->change();;
            $table->string('amount');
            $table->string('transaction_status');
            $table->string('transaction_id');
            $table->string('phone_number');
            $table->string('appointment_id');
            $table->string('description_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
