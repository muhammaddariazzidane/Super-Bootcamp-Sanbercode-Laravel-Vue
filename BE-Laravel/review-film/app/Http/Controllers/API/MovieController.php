<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\MovieRequest;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
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
        $movies = Movie::latest()->get()->load('genre');

        return response()->json([
            'message' => 'tampil data berhasil',
            'data' => $movies
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MovieRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('poster')) {
            $image_name = time() . '.' . $request->poster->extension();
            $request->poster->storeAs('public/posters', $image_name);

            $path = env('APP_URL') . '/storage/posters/';
            $data['poster'] = $path . $image_name;
        }

        Movie::create($data);

        return response()->json([
            'message' => 'Tambah Movie berhasil',
            'data' => $data
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $movie = Movie::with(['genre', 'list_cast', 'list_reviews'])->find($id);

        if (!$movie) return response()->json(['message' => 'Movie not found'], 404);

        return response()->json([
            'message' => 'Detail Data Movie',
            'data' => $movie
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MovieRequest $request, string $id)
    {
        $movie = Movie::find($id);

        if (!$movie) return response()->json(['message' => 'Movie not found'], 404);

        if ($request->hasFile('poster')) {

            if ($movie->poster) Storage::delete('/public/posters/' . basename($movie->poster));

            $image_name = time() . '.' . $request->poster->extension();
            $request->poster->storeAs('public/posters', $image_name);

            $path = env('APP_URL') . '/storage/posters/';
            $movie->poster = $path . $image_name;
        }

        $movie->title = $request->title;
        $movie->summary = $request->summary;
        $movie->genre_id = $request->genre_id;
        $movie->year = $request->year;
        $movie->save();

        return response()->json([
            'message' => 'Update Movie berhasil'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movie = Movie::find($id);

        if (!$movie) return response()->json(['message' => 'Movie not found'], 404);

        if ($movie->poster) Storage::delete('/public/posters/' . basename($movie->poster));

        $movie->delete();

        return response()->json([
            'message' => 'berhasil Menghapus Movie'
        ], 200);
    }
}
