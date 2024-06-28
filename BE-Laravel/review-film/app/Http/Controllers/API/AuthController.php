<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $role = Role::where('name', 'user')->first();

        $newUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id
        ]);

        $token = JWTAuth::fromUser($newUser);

        Auth::guard('api')->attempt($request->only('email', 'password'));

        $user = Auth::guard('api')->user();

        return response()->json([
            'message' => 'user berhasil di register',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('api')->attempt($credentials)) return response()->json(['error' => 'Unauthorized'], 401);

        $user = Auth::guard('api')->user();

        return response()->json([
            'message' => 'user berhasil login',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json(['message' => 'Logout Berhasil']);
    }

    public function me()
    {
        return response()->json([
            "message" =>  "Profile berhasil ditampilkan",
            "user" => Auth::guard('api')->user()
        ]);
    }

    public function updateUser(Request $request)
    {
        $user = Auth::guard('api')->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        $user->name = $request->name;

        $user->save();

        return response()->json([
            'response_message' => 'Profile berhasil diupdate'
        ], 200);
    }
}
