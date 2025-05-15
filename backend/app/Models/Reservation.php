<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Class Reservation
 * 
 * @property int $id
 * @property Carbon $dateDebut
 * @property Carbon $dateFin
 * @property string|null $statut
 * @property float $montant_total
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int $idClient
 * @property int $idVoiture
 *
 * @package App\Models
 */
class Reservation extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'reservations';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $casts = [
        'dateDebut' => 'date',
        'dateFin' => 'date',
        'montant_total' => 'float',
        'idClient' => 'integer',
        'idVoiture' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'statut' => 'string', // ENUM('payé', 'expiré', 'en cours', 'en attente')
    ];

    protected $fillable = [
        'dateDebut',
        'dateFin',
        'statut',
        'montant_total',
        'idClient',
        'idVoiture',
    ];

    /**
     * Relation avec la table clients (Many-to-One)
     */
    public function client()
    {
        return $this->belongsTo(Client::class, 'idClient', 'id');
    }

    /**
     * Relation avec la table voitures (Many-to-One)
     */
    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'idVoiture', 'id');
    }

    /**
     * Relation avec la table paiements (One-to-Many)
     */
    public function paiements()
    {
        return $this->hasMany(Paiement::class, 'idReservation', 'id');
    }
}