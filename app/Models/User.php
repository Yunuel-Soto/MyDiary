<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function entries()
    {
        return $this->hasMany(Entry::class, 'creator_id');
    }

    // Las que enviaste
    public function friendsS()
    {
        return $this->belongsToMany(User::class, 'friend_requests', 'sender_id', 'recived_id')
            ->withPivot('response_at', 'send_at', 'status');
    }

    // Las que reciviste
    public function friendsR()
    {
        return $this->belongsToMany(User::class, 'friend_requests', 'recived_id', 'sender_id')
            ->withPivot('response_at', 'send_at', 'status');
    }

    public function imageUser()
    {
        return $this->hasMany(ImageUser::class);
    }

    public function friendEntries()
    {
        return $this->belongsToMany(Entry::class, 'entry_users');
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucwords($value);
    }
}
