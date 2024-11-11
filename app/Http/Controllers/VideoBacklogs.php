<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VideoBacklogs extends Controller
{
    public function saveBacklogs(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'url_links_id' => 'required', 
            'duration_time' => 'required',
        ]);
 
         LoginBacklog::create([
            'user_id' =>  $request->id, 
            'url_links_id' =>  time(), 
            'duration_time' =>   $request->duration_time, 
        ]);  

        return response()->json([
            'message' => 'Video Backlogs Save successful', 
        ]);
    }
}
