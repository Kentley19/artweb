<?php

namespace App\Http\Controllers;

use App\Models\Announcement; // Assuming you have an Announcement model
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function getAnnouncements()
    {
        // Fetch all announcements with their associated files
        $announcements = Announcement::with('files')->with('user')->get();

        // Return the data as a JSON response
        return response()->json($announcements);
    }
}
