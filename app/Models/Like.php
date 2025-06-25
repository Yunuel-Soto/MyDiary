<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public function entries()
    {
        return $this->belongsTo(Entry::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
