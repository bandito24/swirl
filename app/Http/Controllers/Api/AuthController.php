<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\PatchRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function signin(LoginRequest $request)
    {
        /** @var User $user */
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'messages' => 'Provided email or address is incorrect'
            ], 401); // Unauthorized status code
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        /** @var User $user */
        $user->currentAccessToken()->delete();
    }
    public function patch(PatchRequest $request){
        $user = Auth::user();
        $attributes = $request->validated();

        if ($request->hasFile('profile_picture')) {
            // Delete the old profile picture if it exists
            if ($user->profile_picture) {
                $path = parse_url($user->profile_picture, PHP_URL_PATH);
                $profile_picture_path = strstr($path, '/profile_picture');
                Storage::delete($profile_picture_path);

            }

            // Update the profile_picture attribute; the setProfilePictureAttribute method will handle the upload
            $attributes['profile_picture'] = $request->file('profile_picture');
        }


        $attributes['profile_picture'] = $request->file('profile_picture');

        $user->update($attributes);
        return response(compact('user'));
    }


}
