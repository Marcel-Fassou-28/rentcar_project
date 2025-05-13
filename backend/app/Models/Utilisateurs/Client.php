<?php

namespace App\Models\Utilisateurs;

use App\Models\Reservations\Reservation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    // Spécifie le nom de la table si nécessaire (Laravel prend 'clients' par défaut)
    protected $table = 'clients';
    protected $primaryKey = 'idClient';
    public $incrementing = true;
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'telephone',
        'permis_conduire',
        'client_user_id'
    ];

    // Définit la relation inverse entre Client et Utilisateur
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'client_user_id', 'idUser');
    }

    // Si le client peut avoir plusieurs réservations, par exemple :
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'idClient');
    }
}
