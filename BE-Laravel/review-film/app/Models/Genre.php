<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Genre extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'uuid';
    public $incrementing = false;

    protected $fillable = [
        'name'
    ];

    public function list_movies(): HasMany
    {
        return $this->hasMany(Movie::class);
    }
}
