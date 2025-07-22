<?php

namespace App\Http\Controllers;

use App\Models\FriendRequests;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendRequestsController extends Controller
{
    function index(Request $req, $type = '')
    {
        $user = Auth::user()->load('friendsS')->load('friendsR');

        if(!$user) {
            return redirect()->route('main');
        }

        $query = User::query();

        if($type == '1') {
            $query->where('id', '!=', $user->id)
                ->where(function($query) use ($user) {
                    $query->whereHas('friendsS', function ($query) use ($user) {
                        $query->where('status', 'accepted')
                            ->where('recived_id', $user->id);
                    })
                    ->orWhereHas('friendsR', function ($query) use ($user) {
                        $query->where('status', 'accepted')
                            ->where('sender_id', $user->id);
                    });
                });
        } else if($type == '2') {
            $query->where('id', '!=', $user->id)
                ->where(function($query) use ($user) {
                    $query->whereHas('friendsS', function($query) use ($user) {
                        $query->where('status', 'pending')
                            ->where('recived_id', $user->id);
                    });
                });
        } else {
            $query->where('id', '!=', $user->id)
                ->whereDoesntHave('friendsS', function($query) use ($user) {
                    $query->where('status', 'accepted')
                        ->where('recived_id',$user->id);
                })->whereDoesntHave('friendsR', function($query) use ($user) {
                    $query->where('status', 'accepted')
                        ->where('sender_id',$user->id);
                });
        }

        $query->when($req->search, function($query, $s) {
            $query->where(function($query) use ($s) {
                $query->orWhere('name', 'like', '%' . $s . '%')
                    ->orWhere('email', 'like', '%' . $s . '%');
            });
        });

        $users = $query->get();

        return inertia('Friends/Friends', compact('users', 'type'));
    }

    function friendRequest($id)
    {
        $user = User::find($id);

        // Si enviaron solicitud, la acepta
        $friendRequest = $user->friendsS()
            ->where('recived_id', Auth::user()->id)
            ->wherePivot('status', 'pending')
            ->exists();

        if($friendRequest) {
            $user->friendsS()->updateExistingPivot(Auth::user()->id, [
                'response_at' => Carbon::now(),
                'status' => 'accepted'
            ]);

            return redirect()->back()->with([
                'message' => 'friend_request_send'
            ]);
        }
        //

        // Si son amigos, lo elimina
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

            return redirect()->back()->with([
                'message' => 'friend_request_send'
            ]);
        }

        if($friendR) {
            Auth::user()->friendsR()->detach($id);

            return redirect()->back()->with([
                'message' => 'friend_request_send'
            ]);
        }
        //

        // Si el usuario logeado envio solicitud lo elimina o crea la solicitud de lo contrario
        $friendRequest = Auth::user()->friendsS()->where('recived_id', $id)
            ->wherePivot('status', 'pending')
            ->first();

        if($friendRequest) {
            Auth::user()->friendsS()->detach($id);

            return redirect()->back()->with([
                'message' => 'friend_request_send'
            ]);
        } else {
            Auth::user()->friendsS()->attach($id, [
                'status' => 'pending',
                'send_at' => Carbon::now()
            ]);

            return redirect()->back()->with([
                'message' => 'friend_request_send'
            ]);
        }
    }

    public function friendRejectedRequest($id)
    {
        Auth::user()->friendsR()->detach($id);

        return redirect()->back()->with([
            'message' => 'friend_request_rejected'
        ]);
    }
}
