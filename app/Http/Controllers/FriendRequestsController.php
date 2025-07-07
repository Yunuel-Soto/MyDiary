<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendRequestsController extends Controller
{
    function index()
    {
        $user = Auth::user();

        if(!$user) {
            return redirect()->route('main');
        }

        $users = User::where('id', '!=', $user->id)->get();
        return inertia('Friends/Friends', compact('users'));
    }
}
