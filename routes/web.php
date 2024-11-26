<?php

use App\Http\Controllers\APIController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//
//
//
//
//
//
//Route::get('/', function () {
//    return redirect('/temp');
//});



Route::get('/tourismsector/{any}', function () {
    return view('welcome');
});

Route::get('/map', function () {
    return view('welcome');
});

Route::get('/map/{any}', function () {
    return view('welcome');
});

Route::get('/dashboard/{any}', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('login');
});
Route::get('/checkJSON', function () {
    return response()->json(['http'=>'Hi']);
});
