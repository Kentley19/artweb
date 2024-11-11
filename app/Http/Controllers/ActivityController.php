<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\activity;

class ActivityController extends Controller
{
    public function stores(Request $request)
    { 
        // Validate the incoming request
        $request->validate([
            'files.*' => 'required|file', // Validate each file
            'title' => 'required|string|max:255',
            'subject_id' => 'required', // Ensure the subject exists 
        ]);


        $activity = new activity();
        // Initialize an array to hold paths 
        // Initialize an array to hold paths 


        if( $request->has('activityID')){
            $activity = activity::find($request->activityID);
        }
        if (!$activity) {
            // If still no announcement found (neither newly created nor fetched), return an error
            $activity = new activity(); // For creating a new announcement instead of update
            
        }

        $filePaths = []; // Array to hold file paths
        if ($request->has('fileUrl')) {
            if ($request->fileUrl!="[]") {
                \Log::info('fileUrl: has');
                $fileUrls = json_decode($request->input('fileUrl'), true);  
                $filePaths = array_merge($filePaths, $fileUrls);
            }
        }
    
        if ($request->hasFile('files') ) {
            $files = $request->file('files');

            // Iterate through the uploaded files
            foreach ($files as $file) {
                $filePath = $file->store('uploads', 'public'); // Store file and get the path
                $filePaths[] = $filePath; // Add path to array 
            }
            $userId='';
            if (Auth::check()) {

                $userId = Auth::user()->id;
            } else {
                // Handle the case where the user is not authenticated
                return redirect()->route('faculty.login')->with('error', 'You must be logged in.');
            }
            \Log::info('userId:');
            // Create the record in the database
           
        } 

        $activity->title = $request->title;
        $activity->subject_id = $request->subject_id;

        $activity->dateDue = $request->dateDue;  
        
        $activity->url=json_encode($filePaths); 
        $activity->user_id=Auth::user()->id; 
        $activity->save();
        
        return response()->json(['msg' => 'Activity Uploaded Successfully']);
    }
     
    public function getLinksUrlAll()
    {
        // Fetch the uploads based on user id and filters
        $uploads = activity::all(); 

        // Transform the data to match Unity's expected format
       

        return response()->json(["uploads"=>$uploads]);
    }   
    public function getLinksUrl()
    {
        // Fetch the uploads based on user id and filters
        $uploads = activity::where('user_id', Auth::user()->id)->get(); 
        // Transform the data to match Unity's expected format
       

        return response()->json(["uploads"=>$uploads]);
    }
    public function getUploads(Request $request)
    {
        // Fetch the uploads based on user id and filters
        $uploads = activity::where("user_id",$request->user_id)->get(); 

        // Transform the data to match Unity's expected format
       

        return response()->json(["uploads"=>$uploads]);
    }
    public function getActivity($id)
    {
        // Fetch the uploads based on user id and filters
        $uploads = activity::where("subject_id",$id)->get(); 

        // Transform the data to match Unity's expected format
       

        return response()->json($uploads);
    }

}
