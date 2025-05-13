<?php

namespace App\Models\Paiements;

use App\Models\Reservations\Reservation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;
    
    protected $table = 'paiements';

    protected $primaryKey = 'idPaiement';
    public $incrementing = true;
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'datePaiement',
        'montant',
        'methode_paiement',
        'reservation_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'datePaiement' => 'datetime',
        'montant' => 'double'
    ];

    // Relation avec la réservation
    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'reservation_id', 'idReservation');
    }
}
