<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CastRequest;
use App\Models\Cast;
use Illuminate\Http\Request;

class CastController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'isAdmin'])->except(['index', 'show']);
    }

    public function index()
    {
        $casts = Cast::all();

        return response()->json([
            'message' => 'tampil data berhasil',
            'data' => $casts
        ], 200);
    }

    public function store(CastRequest $request)
    {
        Cast::create($request->all());

        return response()->json([
            'message' => 'Tambah Cast berhasil'
        ], 201);
    }

    public function show(string $id)
    {
        $cast = Cast::with('list_movie')->find($id);

        if (!$cast) {
            return response()->json([
                'message' => 'Cast not found!',
                'data' => null
            ], 404);
        }

        return response()->json([
            'message' => 'Detail Data Cast',
            'data' => $cast
        ], 200);
    }

    public function update(CastRequest $request, string $id)
    {
        $cast = Cast::find($id);

        if (!$cast) {
            return response()->json([
                'message' => 'Cast not found!'
            ], 404);
        }

        $cast->name = $request['name'];
        $cast->bio = $request['bio'];
        $cast->age = $request['age'];

        $cast->save();

        return response()->json([
            'message' => "Berhasil melakukan update Cast id : {$id}"
        ], 200);
    }

    public function destroy(string $id)
    {
        $cast = Cast::find($id);

        if (!$cast) {
            return response()->json([
                'message' => 'Cast not found!'
            ], 404);
        }

        Cast::destroy($id);

        return response()->json([
            'message' => 'berhasil Menghapus Cast'
        ]);
    }
}
