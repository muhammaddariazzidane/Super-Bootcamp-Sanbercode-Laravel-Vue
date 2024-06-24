<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\MovieRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    public function store(MovieRequest $request)
    {
        return response()->json(["message" => 'Tes 123'], 200);
    }
}
