<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CastMovie extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'cast_movie';

    protected $fillable = ['name', 'cast_id', 'movie_id'];
    protected $keyType = 'uuid';

    public function cast(): BelongsTo
    {
        return $this->belongsTo(Cast::class, 'cast_id');
    }

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }
}
