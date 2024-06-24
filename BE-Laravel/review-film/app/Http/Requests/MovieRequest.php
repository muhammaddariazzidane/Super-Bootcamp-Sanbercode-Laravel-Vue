<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovieRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'year' => 'required|date',
            'poster' => 'nullable|mimes:jpg,png',
            'genre_id' => 'required'
        ];
    }

    public function messages(): array
    {
        return   [
            'title.required' => 'Title is required.',
            'title.max' => 'Title must not exceed 255 characters.',
            'summary.required' => 'Summary is required.',
            'year.required' => 'Year is required.',
            'year.date' => 'Year must be a valid date.',
            'poster.mimes' => 'Poster must be a file of type: jpg, png.',
            'genre_id.required' => 'Genre Id is required.'
        ];
    }
}
