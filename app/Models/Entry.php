<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    public function creator()
    {
        return $this->belongsTo(User::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'entry_users');
    }

    public function imageEntry()
    {
        return $this->hasOne(ImageEntry::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
