<?php

namespace App\Models\Reservations;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    use HasFactory;

    protected $table = 'voitures';

    protected $primaryKey = 'idVoiture';
    public $incrementing = true;
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'car_name',
        'car_model',
        'car_categorie',
        'immatriculation',
        'statut',
        'car_photo'
    ];

    public function reservation()
    {
        return $this->hasOne(Reservation::class, 'reservation_voiture_id', 'idVoiture');
    }
}
