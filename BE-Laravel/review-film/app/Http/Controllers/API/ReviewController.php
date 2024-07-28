<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'critic' => 'required',
            'rating' => 'required|between:1,5',
            'movie_id' => 'required|exists:movie,id',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 422);

        $review = Review::updateOrCreate([
            'user_id' => auth()->user()->id,
            'movie_id' => $request->movie_id,
        ], [
            'critic' => $request->critic,
            'rating' => $request->rating,
        ]);

        return response()->json(['message' => 'Review berhasil dibuat/diubah', 'data' => $review], 201);
    }
}
