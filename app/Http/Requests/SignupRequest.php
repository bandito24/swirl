<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'user_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'about_me' => ['max:250', 'nullable'],
            'github' => ['nullable', 'max:255'],
            'linkedin' => ['nullable', 'max:255'],
            'instagram' => ['nullable', 'max:255'],
            'profile_picture' => ['image', 'nullable'],
            'password' => ['required', 'max:255'],
            'password_confirmation' => ['same:password', 'required', 'max:255']
            
        ];
    }
    public function messages(){
        return [
            'user_name' => 'name must be less than ten letters long with no symbols',
            'password' => 'must give a password',
            'password_confirmation' => 'passcodes do not match',
            'email' => 'email is not valid'
        ];
    }
}
