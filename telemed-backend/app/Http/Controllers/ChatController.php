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
        $messages = Message::with('sender')
            ->where(function ($query) use ($userId) {
                $query->where('user_id', auth()->id())
                      ->where('receiver_id', $userId);
            })
            ->orWhere(function ($query) use ($userId) {
                $query->where('user_id', $userId)
                      ->where('receiver_id', auth()->id());
            })
            ->orderBy('created_at')
            ->get()
            ->map(function ($msg) {
                return [
                    'id' => $msg->id,
                    'sender_id' => $msg->user_id,
                    'receiver_id' => $msg->receiver_id,
                    'message' => $msg->message,
                    'sender_name' => $msg->sender->name ?? 'Unknown',
                    'created_at' => $msg->created_at,
                    'image_url' => $msg->image_url ? asset('storage/' . $msg->image_url) : null,
                    'file_path' => $msg->file_path ? asset('storage/' . $msg->file_path) : null,
                ];
            });

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id|not_in:' . auth()->id(),
            'message' => 'nullable|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB
            'file' => 'nullable|file|mimes:pdf,docx,mp4|max:10240',      // 10MB
        ]);

        $imagePath = null;
        $filePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('chat_images', 'public');
        }

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('chat_uploads', 'public');
        }

        $message = Message::create([
            'user_id' => auth()->id(),
            'receiver_id' => $validated['receiver_id'],
            'message' => $validated['message'],
            'image_url' => $imagePath,
            'file_path' => $filePath,
        ]);

        $message->load('sender');

        broadcast(new MessageSent($message))->toOthers();

        return response()->json([
            'id' => $message->id,
            'sender_id' => $message->user_id,
            'receiver_id' => $message->receiver_id,
            'message' => $message->message,
            'image_url' => $imagePath ? asset('storage/' . $imagePath) : null,
            'file_path' => $filePath ? asset('storage/' . $filePath) : null,
            'sender_name' => $message->sender->name ?? 'Unknown',
            'created_at' => $message->created_at,
        ]);
    }

    public function chatUsers()
    {
        $user = auth()->user();
        $oppositeRole = $user->role === 'doctor' ? 'patient' : 'doctor';

        $users = User::where('role', $oppositeRole)
            ->where('id', '!=', $user->id)
            ->get(['id', 'name', 'email']);

        return response()->json($users);
    }
}
