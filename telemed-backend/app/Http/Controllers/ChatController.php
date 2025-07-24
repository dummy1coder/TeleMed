<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Appointment;

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
                    // 'file_path' => $msg->file_path ? asset('storage/' . $msg->file_path) : null,
                ];
            });

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id|not_in:' . auth()->id(),
            'message' => 'nullable|string|max:1000',
            'file' => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf,docx,mp4|max:10240',
        ]);

        $imagePath = null;
        $filePath = null;

        if ($request->hasFile('file')) {
            $extension = strtolower($request->file('file')->getClientOriginalExtension());
            $isImage = in_array($extension, ['jpg', 'jpeg', 'png', 'gif']);

            $storedPath = $request->file('file')->store(
                $isImage ? 'chat_images' : 'chat_uploads',
                'public'
            );

            if ($isImage) {
                $imagePath = $storedPath;
            } else {
                $filePath = $storedPath;
            }
        }

        if (empty($validated['message']) && !$imagePath && !$filePath) {
            return response()->json(['error' => 'Empty message not allowed.'], 422);
        }

        $message = Message::create([
            'user_id' => auth()->id(),
            'receiver_id' => $validated['receiver_id'],
            'message' => $validated['message'],
            'image_url' => $imagePath,
            // 'file_path' => $filePath,
        ]);

        $message->load('sender');

        broadcast(new MessageSent($message))->toOthers();

        return response()->json([
            'id' => $message->id,
            'sender_id' => $message->user_id,
            'receiver_id' => $message->receiver_id,
            'message' => $message->message,
            'image_url' => $imagePath ? asset('storage/' . $imagePath) : null,
            // 'file_path' => $filePath ? asset('storage/' . $filePath) : null,
            'sender_name' => $message->sender->name ?? 'Unknown',
            'created_at' => $message->created_at,
        ]);
    }

    public function chatUsers(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'patient') {
            $doctorIds = Appointment::where('patient_id', $user->id)

                ->where('is_paid', 0)
                ->get(['doctor_id'])
                ->unique('doctor_id')
                ->pluck('doctor_id');
            $users = \App\Models\User::whereIn('id', $doctorIds)->get();
        } elseif ($user->role === 'doctor') {
            $patientIds = Appointment::where('doctor_id', $user->id)

                ->where('is_paid', 0)
                ->get(['patient_id'])
                ->unique('patient_id')
                ->pluck('patient_id');

            $users = \App\Models\User::whereIn('id', $patientIds)->get();
        } else {
            $users = collect();
        }

        return response()->json($users);
    }
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
            'appointment_id' => 'nullable|exists:appointments,id',
        ]);

        $message = Message::create([
            'user_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
            'appointment_id' => $request->appointment_id,
        ]);

        return response()->json($message);
    }
}
