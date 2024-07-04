<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'uuid';

    protected $table = 'movie';
    public $incrementing = false;

    protected $fillable = ['title', 'summary', 'poster', 'genre_id', 'year'];

    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }

    public function list_cast(): BelongsToMany
    {
        return $this->belongsToMany(Cast::class, 'cast_movie', 'movie_id', 'cast_id');
    }

    public function list_reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
