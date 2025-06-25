<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FriendRequestsController extends Controller
{
    function index()
    {
        $users = User::all();
        return inertia('Friends/Friends', compact('users'));
    }
}
