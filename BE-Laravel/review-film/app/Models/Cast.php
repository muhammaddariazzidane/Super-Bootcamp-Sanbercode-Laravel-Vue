<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Cast extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'uuid';
    protected $table = 'casts';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'bio',
        'age',
    ];

    public function list_movie(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'cast_movie', 'cast_id', 'movie_id');
    }
}
