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
 * Class Administrateur
 * 
 * @property int $id
 *
 * @package App\Models
 */
class Administrateur extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'administrateurs';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false;

    /**
     * Relation avec la table utilisateurs (One-to-One, inverse)
     */
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id', 'id');
    }
}