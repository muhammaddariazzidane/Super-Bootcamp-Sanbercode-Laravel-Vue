<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenreRequest;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'isAdmin'])->except(['index', 'show']);
    }

    public function index()
    {
        $genres = Genre::all();
        return response()->json([
            'message' => 'Berhasil Tampil semua genre',
            'data' => $genres
        ]);
    }

    public function store(GenreRequest $request)
    {
        Genre::create($request->all());

        return response()->json([
            'message' => 'Berhasil tambah genre'
        ], 201);
    }

    public function show(string $id)
    {
        $genre = Genre::find($id)->load('list_movies');

        if (!$genre) {
            return response()->json([
                'message' => 'Genre not found!',
                'data' => null
            ], 404);
        }

        return response()->json([
            'message' => 'Berhasil Detail data dengan id ' . $id,
            'data' => $genre
        ]);
    }

    public function update(GenreRequest $request, string $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'message' => 'Genre not found!',
            ], 404);
        }

        $genre->name = $request['name'];

        $genre->save();
        return response()->json([
            'message' => 'Berhasil melakukan update Genre id : ' . $id
        ]);
    }

    public function destroy(string $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'message' => 'Genre not found!',
            ], 404);
        }

        Genre::destroy($id);

        return response()->json([
            'message' => "data dengan id : {$id} berhasil terhapus"
        ]);
    }
}
