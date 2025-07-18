<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ViewController extends Controller
{
    public function main()
    {
        return inertia('Home/Home');
    }

    function homeSession()
    {
        if(!Auth::check()) {
            return redirect()->route('main');
        }

        $user = Auth::user()->load('entries')->load('friendsS')->load('friendsR');

        $friendsS = $user->friendsS()->where('status', 'accepted')
            ->pluck('recived_id')
            ->toArray();

        $friendsR = $user->friendsR()->where('status', 'accepted')
            ->pluck('sender_id')
            ->toArray();

        $friends = array_merge($friendsR, $friendsS);
        
        $entries = Entry::where('creator_id', $user->id)
            ->orWhere(function($query) use ($friends) {
                $query->where('visibility', 'public')
                    ->whereHas('creator', function($query) use ($friends) {
                        $query->whereIn('id', $friends);
                    });
            })
            ->orWhere(function($query) use ($user) {
                $query->where('visibility', 'friends')
                    ->whereHas('users', function($query) use ($user) {
                        $query->where('user_id', $user->id);
                    });
            })
            ->with([
                'creator.imageUser',
                'imageEntry'
            ])
            ->with('users')
            ->orderByDesc('created_at')
            ->get();

        return inertia('Home/Main', [
            'entries' => $entries
        ]);
    }
}
