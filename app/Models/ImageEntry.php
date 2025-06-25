<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageEntry extends Model
{
    public function entry()
    {
        return $this->belongsTo(User::class);
    }
}
