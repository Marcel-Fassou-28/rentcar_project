<?php

namespace App\Models\Utilisateurs;

use App\Models\Reservations\Reservation;
use App\Models\Reservations\Voiture;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrateur extends Model
{
    use HasFactory;

    // Spécifie le nom de la table si nécessaire (Laravel prend 'clients' par défaut)
    protected $table = 'administrateurs';
    protected $primaryKey = 'idAdmin';
    public $incrementing = true;
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'admin_user_id'
    ];

    // Définit la relation inverse entre Client et Utilisateur
    public function utilisateurs()
    {
        return $this->belongsTo(Utilisateur::class, 'admin_user_id', 'idUser');
    }

    // Le client a plusieurs réservations
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'idAdmin');
    }

    public function voitures() {
        return $this->hasMany(Voiture::class, 'idAdmin');
    }
}
