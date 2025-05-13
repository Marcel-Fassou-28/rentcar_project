<?php

namespace App\Models\Reservations;

use App\Models\Paiements\Paiement;
use App\Models\Utilisateurs\Administrateur;
use App\Models\Utilisateurs\Client;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $table = 'reservations';

    protected $primaryKey = 'idReservation';
    public $incrementing = true;
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'dateDebut',
        'dateFin',
        'statut',
        'montant_total',
        'reservation_client_id',
        'reservation_admin_id',
        'reservation_voiture_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'dateDebut' => 'datetime',
        'dateFin' => 'datetime',
        'montant_total' => 'double'
    ];

    // Relation avec le client
    public function client()
    {
        return $this->belongsTo(Client::class, 'reservation_client_id', 'idClient');
    }

    // Relation avec l'administrateur
    public function administrateur()
    {
        return $this->belongsTo(Administrateur::class, 'reservation_admin_id', 'idAdmin');
    }

    // Relation avec la voiture (1 voiture a une seule réservation)
    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'reservation_voiture_id', 'idVoiture');
    }

    // Relation avec le paiement (0 ou 1 paiement par réservation)
    public function paiement()
    {
        return $this->hasOne(Paiement::class, 'reservation_id', 'idReservation');
    }
}
