<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $viewName;

    public function __construct($user)
    {
        $this->user = $user;

        if ($user->role === 'doctor') {
            $this->viewName = 'emails.welcome_doctor';
        } elseif ($user->role === 'admin') {
            $this->viewName = 'emails.welcome_admin';
        } else {
            $this->viewName = 'emails.welcome_patient';
        }
    }

    public function build()
    {
        return $this->subject('Welcome to Telemed')
                    ->view($this->viewName);
    }
}
