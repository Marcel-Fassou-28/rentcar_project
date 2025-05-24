<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Class Client
 * 
 * @property int $id
 * @property string $telephone
 * @property string|null $permisConduire
 *
 * @package App\Models
 */
class Client extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'clients';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'permisConduire'
    ];

    /**
     * Relation avec la table utilisateurs (One-to-One, inverse)
     */
    public function utilisateur(){
        return $this->belongsTo(Utilisateur::class, 'idUtilisateur');

    }


    /**
     * Relation avec la table reservations (One-to-Many)
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'idClient', 'id');
    }

}