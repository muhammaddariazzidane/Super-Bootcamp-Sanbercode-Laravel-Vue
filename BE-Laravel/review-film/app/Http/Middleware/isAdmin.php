<?php

namespace App\Http\Middleware;

use App\Models\Role;
// use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        $userAdmin = Role::where('name', 'admin')->first();

        if ($user && $user->role_id === $userAdmin->id) return $next($request);

        return response()->json(['message' => 'Akses dilarang'], 403);
    }
}
