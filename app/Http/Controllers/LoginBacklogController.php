<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginBacklog;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
class LoginBacklogController extends Controller
{
    public function index()
    {
        $user=Auth::user();
        $backlogs =[];
        if($user->school_id=="admin"){
            
            $backlogs = LoginBacklog::all();
        }else{
            $backlogs = LoginBacklog::select('login_backlogs.*') // Select all fields from LoginBacklog
            ->join('users', 'login_backlogs.school_id', '=', 'users.school_id') // Join with the users table
            ->where('users.type', 'student') // Filter for users with type 'student'
            ->get();
        
        }
        return response()->json($backlogs); // Return the data as JSON
    }
}
