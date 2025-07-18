<?php

namespace App\Http\Controllers;

use App\Models\FriendRequests;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendRequestsController extends Controller
{
    function index($type = '')
    {
        $user = Auth::user()->load('friendsS')->load('friendsR');

        if(!$user) {
            return redirect()->route('main');
        }

        if($type == '1') {
            $users = User::where('id', '!=', $user->id)
                ->where(function($query) use ($user) {
                    $query->whereHas('friendsS', function ($query) use ($user) {
                        $query->where('status', 'accepted')
                            ->where('recived_id', $user->id);
                    })
                    ->orWhereHas('friendsR', function ($query) use ($user) {
                        $query->where('status', 'accepted')
                            ->where('sender_id', $user->id);
                    });
                })
                ->get();
        } else if($type == '2') {
            $users = $user->friendsR()->where('status', 'pending')->get();
        } else {
            $users = User::where('id', '!=', $user->id)
                ->whereDoesntHave('friendsS', function($query) use ($user) {
                    $query->where('status', 'accepted')
                        ->where('recived_id',$user->id);
                })->whereDoesntHave('friendsR', function($query) use ($user) {
                    $query->where('status', 'accepted')
                        ->where('sender_id',$user->id);
                })
                ->get();
        }

        return inertia('Friends/Friends', compact('users', 'type'));
    }

    function friendRequest($id)
    {
        // Configuracion
        $user = User::find($id);

        $friendRequest = $user->friendsS()
            ->where('recived_id', Auth::user()->id)
            ->wherePivot('status', 'accepted')
            ->exists();

        if($friendRequest) {
            $user->friendsS()->updateExistingPivot(Auth::user()->id, [
                'response_at' => Carbon::now(),
                'status' => 'accepted'
            ]);
        }

        $friendRequest = Auth::user()->friendsS()->where('recived_id', $id)->first();

        if($friendRequest) {
            Auth::user()->friendsS()->detach($id);
        } else {
            Auth::user()->friendsS()->attach($id, [
                'status' => 'pending',
                'send_at' => Carbon::now()
            ]);
        }

        $friendS = Auth::user()->friendsS()
            ->where('recived_id', $id)
            ->wherePivot('status', 'accepted')
            ->first();
        $friendR = Auth::user()->friendsR()
            ->where('sender_id', $id)
            ->wherePivot('status', 'accepted')
            ->first();

        if($friendS) {
            Auth::user()->friendsS()->detach($id);
        }

        if($friendR) {
            Auth::user()->friendsR()->detach($id);
        }

        return redirect()->back()->with([
            'message' => 'friend_request_send'
        ]);
    }
}
