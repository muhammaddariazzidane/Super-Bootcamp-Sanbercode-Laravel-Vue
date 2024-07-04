<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Mail\OtpCodeMail;
use App\Mail\RegisterMail;
use App\Models\OtpCode;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $role = Role::where('name', 'user')->first();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id
        ]);

        $user->generateOtpCode();

        $token = JWTAuth::fromUser($user);

        Mail::to($user->email)->queue(new RegisterMail($user));

        return response()->json([
            'message' => 'user berhasil di register',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function generateOtpCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        $user = User::where('email', $request->email)->first();

        $user->generateOtpCode();

        Mail::to($user->email)->queue(new OtpCodeMail($user));

        return response()->json([
            'message' => 'Berhasil generate ulang otp code',
            'user' => $user
        ], 200);
    }
    public function verifikasi(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'otp' => 'required|max:6',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        $otp_code = OtpCode::where('otp', $request->otp)->first();

        if (!$otp_code) return response()->json(['message' => 'OTP Code tidak ditemukan'], 404);

        $now = Carbon::now();

        if ($now > $otp_code->valid_until) return response()->json(['message' => 'OTP sudah kadaluarsa, silahkan generate ulang'], 400);

        $user = User::find($otp_code->user_id);

        if (!$user) return response()->json(['message' => 'Pengguna tidak ditemukan'], 404);

        $user->email_verified_at = $now;

        $user->save();

        $otp_code->delete();

        return response()->json(['message' => 'Berhasil Verifikasi Akun'], 200);
    }
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) return response()->json(['error' => 'Unauthorized'], 401);

        $user = auth()->user();

        return response()->json([
            'message' => 'user berhasil login',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Logout Berhasil'], 200);
    }

    public function me()
    {
        $user = auth()->user();

        return response()->json([
            "message" =>  "Profile berhasil ditampilkan",
            "user" => $user
        ]);
    }

    public function updateUser(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        $user->name = $request->name;

        $user->save();

        return response()->json([
            'message' => 'berhasil Update user'
        ], 200);
    }
}
