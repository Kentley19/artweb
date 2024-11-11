<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VideoComments extends Controller
{
    public function saveBacklogs(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'user_id' => 'required', 
            'url_id' => 'required',
            'message' => 'required', 
        ]);
 
         LoginBacklog::create([
            'user_id' =>  $request->id, 
            'url_id' =>   $request->message, 
            'message' =>   $request->message, 
        ]);  

        return response()->json([
            'message' => 'Video Comment Created successful', 
        ]);
    }
}
