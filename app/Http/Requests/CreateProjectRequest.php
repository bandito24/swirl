<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Exists;

class CreateProjectRequest extends FormRequest
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
            'creator_id' => ['integer'],
            'project_name' => ['max:255', 'required'],
            'project_description' => ['required'],
            'projectRoles.*' => ['string', 'required', 'max:255'],
            'projectLanguages.*' => ['exists:languages,name']
        ];
    }
}
