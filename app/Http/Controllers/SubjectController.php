<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Subject;
use Illuminate\Support\Facades\Auth;
class SubjectController extends Controller
{
    public function addSubject(Request $request)
    { 

        if($request->id!=null){
            $subject = Subject::find($request->id);
        
            if ($subject) {
                $subject->update([
                    'title' => $request->title,
                    'room' => $request->room,
                    'teacher_id' => $request->teacher_id, 
                ]);
                return response()->json(['message' => 'Subject updated successfully']);
            } else {
                return response()->json(['message' => 'Subject not found'], 404);
            }
        }else{

            Subject::create([
                'title' => $request->title,
                'room' => $request->room,
                'teacher_id' => $request->teacher_id, 
            ]);
            return response()->json(['message' => 'Subject created successfully']);
        }
    }
    public function deleteSubject($id)
    {
        // Find the subject by ID
        $subject = Subject::find($id);
    
        // Check if the subject exists
        if ($subject) {
            // Delete the subject
            $subject->delete();
            return response()->json(['message' => 'Subject deleted successfully']);
        } else {
            // If the subject does not exist, return an error response
            return response()->json(['message' => 'Subject not found'], 404);
        }
    }
    
    public function index()
    {
        $subjects = Subject::with('teacher')->get();
        return response()->json($subjects);
    }
    public function getSubject()
    {
        $subjects = Subject::with('teacher')
            ->where('teacher_id', Auth::id()) // Fetch subjects where teacher_id matches the authenticated user's ID
            ->get();
    
        return response()->json($subjects);
    }
    public function getSubjectByRoom($room)
    {
        $subjects = Subject::with('teacher')
            ->where('room', $room) // Fetch subjects where teacher_id matches the authenticated user's ID
            ->get();
    
        return response()->json($subjects);
    }
    public function getSubjectAndRoom($room, $teacherId)
    {
        $subjects = Subject::with('teacher')
        ->where('room', $room)
        ->whereHas('teacher', function ($query) use ($teacherId) {
            $query->where('id', $teacherId);
        })->get();
    
        return response()->json($subjects);
    }
    
}
