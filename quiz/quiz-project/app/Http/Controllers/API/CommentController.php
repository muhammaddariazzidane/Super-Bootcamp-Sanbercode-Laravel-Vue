<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = Comment::all();

        return response()->json([
            'message' =>  'Berhasil mendapatkan data komentar',
            'comments' => $comments
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|uuid|exists:posts,id',
            'comment' => 'required|string',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        Comment::create([
            'post_id' => $request->post_id,
            'comment' => $request->comment,
        ]);
        return response()->json(['message' => 'Berhasil membuat komentar'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) return response()->json(['message' => 'Comment not found'], 404);

        return response()->json(['message' => 'Berhasil mendapatkan detail komentar', 'comment' => $comment], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) return response()->json(['message' => 'Comment not found'], 404);

        $validator = Validator::make($request->all(), [
            'comment' => 'sometimes|string',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        if ($request->has('comment')) $comment->comment = $request->comment;

        $comment->save();

        return response()->json(['message' => 'Berhasil update komentar'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) return response()->json(['message' => 'Comment not found'], 404);

        $comment->delete();

        return response()->json(['message' => 'Berhasil menghapus komentar'], 200);
    }
}
