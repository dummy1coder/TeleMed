<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountSettingsController extends Controller
{
    public function changePassword(Request $request)
    {
        $request->validate([
            'current' => 'required|string',
            'new' => 'required|string|min:6',
            'confirm' => 'required|same:new',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect.'], 422);
        }

        $user->update([
            'password' => Hash::make($request->new),
        ]);

        return response()->json(['message' => 'Password updated successfully.']);
    }
}
