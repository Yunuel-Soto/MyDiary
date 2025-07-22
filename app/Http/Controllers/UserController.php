<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    public function newUserAuth(Request $req, $id)
    {
        Auth::logout();
        $req->session()->regenerateToken();

        Auth::loginUsingId($id);

        return redirect()->back();
    }

    /**
     * SingIn form
     */
    public function create()
    {
        return inertia('AuthPages/SingIn');
    }

    public function singIn(Request $req)
    {
        $req->validate([
            'password' => 'required|min:6',
            'passwordConfirm' => 'required|same:password',
            'email' => 'required|email',
            'name' => 'required'
        ]);

        $user = User::where('email', $req->email)->first();

        if($user) {
            return redirect()->route('singInForm')->with([
                'message' => 'email_already_exist'
            ]);
        }

        $user = new User();
        $user->email = $req->email;
        $user->name = $req->name;
        $user->password = Hash::make($req->password);
        $user->save();

        return $this->login($req);
    }

    public function loginForm()
    {
        return inertia('AuthPages/Login');
    }

    public function login(Request $req)
    {
        $credentials = [
            'email' => $req->email,
            'password' => $req->password,
        ];

        if(!Auth::attempt($credentials)) {
            return redirect()->back()->with([
                'message' => 'error_credentials',
            ]);
        }

        $req->session()->regenerate();

        return redirect()->route('homeSession');
    }

    public function logout(Request $req)
    {
        Auth::logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        return redirect()->route('main');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
