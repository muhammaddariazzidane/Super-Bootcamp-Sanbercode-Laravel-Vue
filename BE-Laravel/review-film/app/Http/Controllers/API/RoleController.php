<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json([
            'message' => 'Data berhasil ditampilkan',
            'data' => $roles
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        Role::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Data berhasil ditambahkan',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        $role = Role::find($id);

        if (!$role) return response()->json(['message' => 'Role tidak ditemukan'], 404);

        $role->name = $request->name;

        $role->save();

        return response()->json([
            'message' => 'Data berhasil diupdate',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);

        if (!$role) return response()->json(['message' => 'Role tidak ditemukan'], 404);

        $role->delete();

        return response()->json([
            'message' => 'Data berhasil di hapus',
        ], 200);
    }
}
