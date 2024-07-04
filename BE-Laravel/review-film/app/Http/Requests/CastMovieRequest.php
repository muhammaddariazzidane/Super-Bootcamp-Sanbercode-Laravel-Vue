<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CastMovieRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'cast_id' => 'required|exists:casts,id',
            'movie_id' => 'required|exists:movie,id',
        ];
    }

    public function messages(): array
    {
        return   [
            'name.required' => 'Name is required.',
            'name.max' => 'Name must not exceed 255 characters.',
            'cast_id.required' => 'Cast is required.',
            'cast_id.exists' => 'The selected cast does not exist.',
            'movie_id.required' => 'Movie is required.',
            'movie_id.exists' => 'The selected movie does not exist.',
        ];
    }
}
