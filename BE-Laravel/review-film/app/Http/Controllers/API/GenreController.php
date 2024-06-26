<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenreRequest;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::all();
        return response()->json([
            'message' => 'tampil data berhasil',
            'data' => $genres
        ]);
    }

    public function store(GenreRequest $request)
    {
        Genre::create($request->all());

        return response()->json([
            'message' => 'Tambah Genre berhasil'
        ]);
    }

    public function show(string $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'message' => 'Genre not found!',
                'data' => null
            ], 404);
        }

        return response()->json([
            'message' => 'Detail Data Genre',
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
            'message' => 'Update Genre berhasil'
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
            'message' => 'berhasil Menghapus Genre'
        ]);
    }
}
