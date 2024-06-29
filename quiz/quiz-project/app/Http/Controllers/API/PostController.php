<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();

        return response()->json([
            'message' =>  'Berhasil mendapatkan data postingan',
            'posts' => $posts
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 422);

        Post::create([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Berhasil membuat postingan'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);

        if (!$post) return response()->json(['message' => 'Post not found'], 404);

        return response()->json(['message' => 'Berhasil mendapatkan detail postingan', 'post' => $post], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::find($id);

        if (!$post) return response()->json(['message' => 'Post not found'], 404);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 422);

        if ($request->has('title')) $post->title = $request->title;

        if ($request->has('content'))  $post->content = $request->content;

        $post->save();

        return response()->json(['message' => 'Berhasil update postingan'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);

        if (!$post) return response()->json(['message' => 'Post not found'], 404);

        $post->delete();

        return response()->json(['message' => 'Berhasil menghapus postingan'], 200);
    }
}
