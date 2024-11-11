<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash; // Import the Hash facade
class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'school_id' => 'required|unique:users',
            'fname' => 'required',
            'mname' => 'required',
            'lname' => 'required',
            'type' => 'required|in:teacher,student',
            'password' => 'required',
        ]);

        $user = User::create([
            'fname' =>  $request->fname,
            'mname' =>  $request->mname,
            'lname' =>  $request->lname,
            'school_id' => $request->school_id,
            'type' => $request->type,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'school_id' => $user->school_id,
                'type' => $user->type,
            ],
        ]);
    }
    public function GetTeacher(){
        $teacher=User::where("type","teacher")->get();
        return response()->json(['teacher' =>$teacher]);
    }
    public function registerForWeb(Request $request)
    {
        // Validate the request
        $request->validate([
            'fname' => 'required|string|max:255',
            'mname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'school_id' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
            'type' => 'required|in:teacher,student',
        ]);

        // Create the user
        $user = User::create([
            'fname' => $request->fname,
            'mname' => $request->mname,
            'lname' => $request->lname,
            'school_id' => $request->school_id,
            'password' => Hash::make($request->password),
            'type' => $request->type,
        ]);

        // Log in the user or redirect to a page
        return redirect()->route('faculty.register')->with('success', 'Registration successful!.');
    }
}
