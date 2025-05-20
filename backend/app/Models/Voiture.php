<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Class Voiture
 * 
 * @property int $id
 * @property string $car_name
 * @property string $car_model
 * @property string $car_categorie
 * @property double $prix
 * @property string $immatriculation
 * @property string|null $statut
 * @property string|null $car_photo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Voiture extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'voitures';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'car_categorie' => 'string',
        'statut' => 'string', // ENUM('reservé', 'disponible', 'loué')
    ];

    protected $fillable = [
        'car_name',
        'car_model',
        'car_categorie',
        'immatriculation',
        'statut',
        'car_photo',
        'prix',
    ];

    /**
     * Relation avec la table reservations (One-to-Many)
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'idVoiture', 'id');
    }
}