<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use App\Notifications\CustomResetPassword;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class Utilisateur
 * 
 * @property int $id
 * @property string $nom
 * @property string $prenom
 * @property string $email
 * @property string|null $role
 * @property string $password
 * @property string $adresse
 * @property string $birthday
 * @property string $photo
 * @property Carbon|null $email_verified_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $token
 *
 * @package App\Models
 */
class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'role' => 'string', // ENUM('admin', 'client')
    ];

    protected $hidden = [
        'password',
        'token',
        'remember_token'
    ];

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'role',
        'password',
        'adresse',
        'photo',
        'email_verified_at',
        'token',
        'birthday',
        'telephone',
        'remember_token',
        'google_id',
    ];

    /**
     * Relation avec la table administrateurs (One-to-One)
     */
    public function administrateur()
    {
        return $this->hasOne(Administrateur::class, 'id', 'id');
    }

    /**
     * Relation avec la table clients (One-to-One)
     */
    public function client()
    {
        return $this->hasOne(Client::class, 'id', 'id');
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new CustomResetPassword($token));
    }
}