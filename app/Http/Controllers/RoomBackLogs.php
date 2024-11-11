<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoomBackLogs extends Controller
{
    public function saveBacklogs(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'room' => 'required',
            'type' => 'required',
        ]);
 
         LoginBacklog::create([
            'user_id' =>  $request->id, 
            'room' =>  time(), 
            'type' =>   $request->type, 
        ]);  

        return response()->json([
            'message' => 'Backlogs Save successful', 
        ]);
    }

}
