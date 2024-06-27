<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';

    protected $table = 'movie';
    public $incrementing = false;

    protected $fillable = ['title', 'summary', 'poster', 'genre_id', 'year'];
}