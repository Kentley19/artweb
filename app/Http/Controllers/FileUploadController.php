<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\activity;
use App\Models\ImagesUpload; 
use App\Models\User;
use App\Models\Announcement; // Assuming you have an Announcement model

class FileUploadController extends Controller
{
    public function viewFileDocs($filename)
    {

        $path = 'videos/' . basename($filename); // Adjust the path according to your storage structure

        if (Storage::disk('public')->exists($path)) {
             return response()->file($path, [
        'Content-Type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]); 
        }

        return response()->json(['error' => 'File not found'], 404);
    }
    public function upload(Request $request)
    { 

        // Validate the request
        $request->validate([
            'files.*' => 'required',  
            'announcement' => 'required|string|max:255',
        ]);
        
        $announcement = new Announcement();
        // Initialize an array to hold paths 
        // Initialize an array to hold paths 


        if( $request->has('announcementID')){
            $announcement = Announcement::find($request->announcementID);
        }
        if (!$announcement) {
            // If still no announcement found (neither newly created nor fetched), return an error
            $announcement = new Announcement(); // For creating a new announcement instead of update
        }
        if ($request->has('fileUrl')) {
            $fileUrls = json_decode($request->input('fileUrl'), true);
            \Log::info('File URLs:', $fileUrls);
            if($announcement->files()->exists()){
                $announcement->files()->delete(); // Optional: Remove old files if you want to replace them 

            }
        
            // Extract IDs from the file URLs for sync
            $fileIds = array_column($fileUrls, 'id');
         
        
            // Now, loop through the file URLs and save them to the database
            foreach ($fileUrls as $fileUrl) {
                $announcement->files()->create(['file_path' => $fileUrl['file_path']]); // Create new file entries
            }
        }
        
        $announcement->content = $request->announcement; // Store the content
        $user_id = Auth::user()->id;
        $announcement->user_id = $user_id; // Store the user_id
        
        $announcement->save();
        if ($request->hasFile('files')) {
            $allowedFileExtensions = ['jpeg', 'jpg', 'png', 'mp4','ppt','doc','docs','xlsx','xlsm','pdf','gsheet'];
            $files = $request->file('files');
             
            // Create the announcement
           
            $filePaths = []; // Array to hold file paths
            foreach ($files as $file) {
                // $filename = $file->getClientOriginalName();
                // $extension = $file->getClientOriginalExtension();
                // $check = in_array($extension, $allowedFileExtensions); 
                // if ($check) {
                    $filePath =  $file->store('uploads', 'public'); // Store file and get the path
                    $filePaths[] = $filePath; // Add path to array

                    \Log::info('file:', $filePaths);
                    // Create a new file entry in the database
                // $announcement->files()->create(['announcement_id' => $announcement->id,'file_path' => $filePath]); // Create new file entries
                    ImagesUpload::create(['announcement_id' => $announcement->id, 'file_path' => $filePath]);
                // }
            } 
        }

        // Now you can save the announcement and file paths to your database
        // Assuming you have an Announcement model
        return response()->json(['message' => 'File uploaded successfully!', 'announcement' => $announcement], 201);
    }
    public function delete($id){
        $announcement = Announcement::find($id); // Find the announcement by ID
        if ($announcement) {
            $announcement->files()->delete();
            $announcement->delete(); // Delete the announcement
                
            return response()->json(['message' => 'Deleted!'], 200);
        }

        return response()->json(['message' => 'ID not found!'], 404);
    }    public function delete_activity($id){
        $activity = activity::find($id); // Find the announcement by ID
        if ($activity) { 
            $activity->delete(); // Delete the announcement
                
            return response()->json(['message' => 'Deleted!'], 200);
        }

        return response()->json(['message' => 'ID not found!'], 404);
    }
    public function viewFiles()
    {
        // Find the announcement with its associated files
    $user_id = Auth::user()->id;
    $announcements = Announcement::with('files')->where('user_id', $user_id)->get();
     
    
        // Return the JSON response with announcement content and file URLs
        return response()->json([
            'announcements' => $announcements, 
        ]);
    }
    
    
}
