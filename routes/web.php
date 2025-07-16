<?php

use App\Http\Controllers\EntryController;
use App\Http\Controllers\FriendRequestsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ViewController;
use App\Http\Middleware\AuthUser;
use App\Models\FriendRequests;
use Illuminate\Support\Facades\Route;

Route::controller(ViewController::class)->group(function() {
    Route::get('/', 'main')->name('main');

    Route::get('Home', 'homeSession')->name('homeSession');
});

Route::controller(UserController::class)->group(function() {
    Route::get('/Login', 'loginForm')->name('loginForm');
    Route::get('/SingIn', 'create')->name('singInForm');
    Route::post('/SingIn/create', 'singIn')->name('singIn');
    Route::post('/Login/initial', 'login')->name('login');
    Route::get('/Logout', 'logout')->name('logout');
});

Route::middleware('auth')->group(function() {
    Route::controller(EntryController::class)->group(function() {
        Route::post('/Entry', 'create')->name('create.entry');
        Route::delete('Delete/Entry/{entry}', 'delete')->name('delete.entry');
        Route::post('Update/Entry/{entry}', 'update')->name('update.entry');
    });

    Route::controller(FriendRequestsController::class)->group(function() {
        Route::get('/Friends/{type?}', 'index')->name('index.friends');
        Route::post('/Friend/Request/{id}', 'friendRequest')->name('friendRequest');
    });
});
