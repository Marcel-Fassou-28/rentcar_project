<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyNewEmail extends Notification implements ShouldQueue
{
    use Queueable;

    protected $newEmail;
    protected $verificationToken;

    public function __construct(string $newEmail, string $verificationToken)
    {
        $this->newEmail = $newEmail;
        $this->verificationToken = $verificationToken;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $verificationUrl = url('/api/verify-new-email/' . $this->verificationToken);

        return (new MailMessage)
            ->subject('Vérification de votre nouvel email')
            ->line('Vous avez demandé à changer votre adresse email pour : ' . $this->newEmail)
            ->action('Vérifier le nouvel email', $verificationUrl)
            ->line('Si vous n\'avez pas effectué cette demande, ignorez cet email.');
    }
}
