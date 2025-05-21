<?php

/**
 * Created by Reliese Model.
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class Note extends Model{
 use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'notes';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $casts = [
        'note' => 'double',
        'comment' => 'string',
        'idClient' => 'int',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $fillable = [
        'note',
        'commentaire',
        'idClient',
    ];

    /**
     * Relation avec la table clients (One-to-One)
     */
    public function client()
    {
        return $this->belongsTo(Client::class, 'idClient', 'id');
    }
}