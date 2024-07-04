<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CastMovieRequest;
use App\Models\CastMovie;
use Illuminate\Http\Request;

class CastMovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware(['auth:api', 'isAdmin'])->except(['index', 'show']);
    }

    public function index()
    {
        $castMovies = CastMovie::all();

        return response()->json([
            'message' => 'Berhasil Tampil cast Movie',
            'data' => $castMovies
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CastMovieRequest $request)
    {
        CastMovie::create($request->all());

        return response()->json([
            'message' => 'Berhasil tambah cast Movie'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $castMovie = CastMovie::with(['cast', 'movie'])->find($id);

        if (!$castMovie) {
            return response()->json([
                'message' => 'Cast movie not found!',
                'data' => null
            ], 404);
        }

        return response()->json([
            'message' => 'Berhasil Tampil cast Movie',
            'data' => $castMovie
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CastMovieRequest $request, string $id)
    {
        $castMovie = CastMovie::find($id);

        if (!$castMovie) {
            return response()->json([
                'message' => 'Cast movie not found!'
            ], 404);
        }

        $castMovie->name = $request->name;
        $castMovie->cast_id = $request->cast_id;
        $castMovie->movie_id = $request->movie_id;

        $castMovie->save();

        return response()->json([
            'message' => 'Berhasil Update cast Movie'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $castMovie = CastMovie::find($id);

        if (!$castMovie) {
            return response()->json([
                'message' => 'Cast movie not found!'
            ], 404);
        }

        CastMovie::destroy($id);

        return response()->json([
            'message' => 'Berhasil Delete cast Movie'
        ]);
    }
}
