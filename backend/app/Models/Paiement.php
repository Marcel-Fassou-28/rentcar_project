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
 * Class Paiement
 * 
 * @property int $id
 * @property Carbon|null $datePaiement
 * @property float $montant
 * @property string|null $methode_paiement
 * @property int $idClient
 *
 * @package App\Models
 */
class Paiement extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'paiements';
    protected $primaryKey = 'id';
    protected $keyType = 'bigint';
    public $incrementing = true;
    public $timestamps = false;

    protected $casts = [
        'datePaiement' => 'datetime',
        'montant' => 'float',
        'idClient' => 'integer',
        'methode_paiement' => 'string', // ENUM('carte')
    ];

    protected $fillable = [
        'datePaiement',
        'montant',
        'methode_paiement',
        'idClient',
    ];

    /**
     * Relation avec la table clients (Many-to-One)
     */
    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'idReservation', 'id');
    }
}