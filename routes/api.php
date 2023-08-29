<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/create_project', [ProjectController::class, 'store']);
    Route::post('/show_language_projects', [ProjectController::class, 'indexByUserLanguage']);



    Route::post('/logout', [AuthController::class, 'logout']);
    Route::patch('/patch', [AuthController::class, 'patch']);
});

Route::get('/show_all_projects', [ProjectController::class, 'index']);
Route::get('/project/{slug}', [ProjectController::class, 'show']);
Route::post('/filter_by_title', [ProjectController::class, 'indexBySearch']);


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);

Route::get('/index', [UserController::class, 'index']);
Route::post('/check_variable', [UserController::class, 'checkVariable']);
