<?php

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\NexmoMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class AppointmentReminder extends Notification
{
    public function via($notifiable)
    {
        $channels = [];

        if ($notifiable->notificationSetting->email) $channels[] = 'mail';
        if ($notifiable->notificationSetting->sms) $channels[] = 'nexmo';
        if ($notifiable->notificationSetting->push) $channels[] = 'broadcast';

        return $channels;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("Appointment Reminder")
            ->line("You have an appointment tomorrow.");
    }

    public function toNexmo($notifiable)
    {
        return (new NexmoMessage)
            ->content("Reminder: You have an appointment tomorrow.");
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'title' => 'Appointment Reminder',
            'body' => 'You have an appointment tomorrow.',
        ]);
    }
}
