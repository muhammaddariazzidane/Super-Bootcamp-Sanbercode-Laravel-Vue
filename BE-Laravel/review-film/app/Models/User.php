<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Role;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    public static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            $model->generateOtpCode();
        });
    }

    public function generateOtpCode()
    {
        do {
            $randomNumber = mt_rand(100000, 999999);
            $checkOptCode = OtpCode::where('otp', $randomNumber)->first();
        } while ($checkOptCode);

        $now = Carbon::now();

        OtpCode::updateOrCreate([
            'user_id' => $this->id
        ], [
            'otp' => $randomNumber,
            'valid_until' => $now->addMinutes(5)
        ]);
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'user_id');
    }

    public function otpcode(): HasOne
    {
        return $this->hasOne(OtpCode::class, 'user_id');
    }
}
