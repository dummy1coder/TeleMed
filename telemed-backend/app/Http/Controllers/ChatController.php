<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function fetchMessages($userId)
    {
        $messages = Message::where(function ($query) use ($userId) {
            $query->where('user_id', auth()->id())
                  ->where('receiver_id', $userId);
        })->orWhere(function ($query) use ($userId) {
            $query->where('user_id', $userId)
                  ->where('receiver_id', auth()->id());
        })->orderBy('created_at')->get();

        return response()->json($messages);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'receiver_id' => 'required|exists:users,id|not_in:' . auth()->id(),
        'message' => 'required|string|max:1000',
    ]);

    $message = Message::create([
        'user_id' => auth()->id(),
        'receiver_id' => $validated['receiver_id'],
        'message' => $validated['message'],
    ]);

    broadcast(new MessageSent($message))->toOthers();

    return response()->json($message);
}

    public function chatUsers()
{
    $authUser = auth()->user();

    if ($authUser->role === 'doctor') {
        return User::where('role', 'patient')
                   ->where('id', '!=', $authUser->id)
                   ->get();
    }

    if ($authUser->role === 'patient') {
        return User::where('role', 'doctor')
                   ->where('id', '!=', $authUser->id)
                   ->get();
    }

    return response()->json([]);
}

}
