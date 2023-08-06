<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\PatchRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Language;
use App\Models\User;
use App\Models\UserLanguage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;


class AuthController extends Controller
{

    /**
     * @throws Throwable
     */
    public function signup(SignupRequest $request)
    {
        $response = null;
        DB::transaction(function () use ($request, &$response) {
                $languages = $request['languages'];
                unset($request['languages']);

                $data = $request->validated();

                $defaults = [
                    'github'          => null,
                    'linkedin'        => null,
                    'instagram'       => null,
                    'about_me'        => null,
                    'profile_picture' => null
                ];

                $attributes = array_merge($defaults, $data);


                $user = User::create([
                    'user_name'       => $attributes['user_name'],
                    'email'           => $attributes['email'],
                    'password'        => bcrypt($attributes['password']),
                    'profile_picture' => $attributes['profile_picture'],
                    'github'          => $attributes['github'],
                    'linkedin'        => $attributes['linkedin'],
                    'instagram'       => $attributes['instagram'],
                    'about_me'        => $attributes['about_me'],
                ]);

                foreach ($languages as $language) {
                    $language = Language::where('name', $language)->firstOrFail();
                    if($language) {
                        UserLanguage::create([
                            'user_id'     => $user->id,
                            'language_id' => $language->id
                        ]);

                    }
                }

            $token = $user->createToken('main')->plainTextToken;
            $user->load('languages');
            $response = response(compact('user', 'token'));
            });
                return $response;
    }

    public function signin(LoginRequest $request)
    {
        /** @var User $user */
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)) {
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

    public function patch(PatchRequest $request)
    {
        $user = Auth::user();
        $attributes = $request->validated();

        if($request->hasFile('profile_picture')) {
            // Delete the old profile picture if it exists
            if($user->profile_picture) {
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
