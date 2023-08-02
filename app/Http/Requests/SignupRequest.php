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
            'name' => ['required', 'max: 10', 'string', 'alpha'],
            'email' => ['required', 'email'],
            'password' => ['required'],
            'password_confirmation' => ['same:password', 'required']
//
        ];
    }
    public function messages(){
        return [
            'name' => 'name must be less than ten letters long with no symbols',
            'password' => 'must give a password',
            'password_confirmation' => 'passcodes do not match',
            'email' => 'email is not valid'
        ];
    }
}
