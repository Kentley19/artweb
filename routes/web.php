<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Response;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\LoginBacklogController;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\CheckDevice;

use Illuminate\Http\Request;

Route::get('/isMobile', function (Request $request) {
    
   
    $token = $request->query('token');
    $sessionToken = $request->session()->get('is_mobile_access');

    // Check if the session token matches the token parameter
    if ($token !== $sessionToken."") {
        // If the tokens don’t match, redirect to the dashboard
        // return response()->json([
        //     'token' => $token,
        //     'sessionToken' => $sessionToken,
        // ], 200);

        return redirect()->route('dashboard');
    }else{
        
        $token = rand();
        $request->session()->put('is_mobile_access', $token);
    }
    return view('OnlyPC');
})->name('isMobile');
Route::middleware(CheckDevice::class)->group(function () {
    
    Route::post('/api/upload', [FileUploadController::class, 'upload']);

    Route::delete('/api/delete/{id}', [FileUploadController::class, 'delete']);
    Route::delete('/api/delete/record/{id}', [FileUploadController::class, 'delete_activity']);

    Route::get('/api/getLoginBacklog', [LoginBacklogController::class, 'index']);
    Route::post('/api/getupload', [FileUploadController::class, 'viewFiles']);
    Route::get('/view/{filename}', [FileUploadController::class, 'viewFileDocs'])->name('document.view');

    Route::post('/get/teacher', [UserController::class, 'GetTeacher'])->name('register');
    Route::post('/get/calendar/activity', [ActivityController::class, 'getLinksUrl'])->name('get.calendar.activity');

    Route::post('/api/getvideos', [ActivityController::class, 'getLinksUrl']);//unity
    Route::post('/api/uploadActivity', [ActivityController::class, 'stores']);//unity
    Route::get('/get/auth', function () {
        if(Auth::check()){
            $auth=Auth::user();
            return response()->json(['auth' => $auth]);
        }else{
            
            return response()->json(['auth' => false]);
        }
        
    });

    Route::get('/csrf-token', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    });
    // Route::post('/register/user', [UserController::class, 'registerForWeb'])->name('register');
    Route::post('/loginTeacher', [LoginController::class, 'loginTeacher'])->name('teacher.login');

    Route::get('/dashboard', [LoginController::class, 'dashboard'])->name('dashboard');

    Route::post('/login', [LoginController::class, 'login'])->name('login');//unity login

    Route::get('/faculty/login', [LoginController::class, 'loginTeacherView'])->name('faculty.login');//view
    Route::get('/faculty/register', [LoginController::class, 'registerTeacherView'])->name('faculty.register');//view

    Route::post('/register', [UserController::class, 'register']);
    Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('/announcements', [AnnouncementController::class, 'getAnnouncements']); 
    Route::delete('/subjects/{id}', [SubjectController::class, 'deleteSubject']); 
    Route::post('/subjects/create', [SubjectController::class, 'addSubject']);
    Route::get('/subjects/view/all', [SubjectController::class, 'index']);
    Route::get('/subjects/view/{room}', [SubjectController::class, 'getSubjectByRoom']);


    Route::get('/subjects/get/{id}', [ActivityController::class, 'getActivity']);


    Route::get('/subjects/view/{room}/{id}', [SubjectController::class, 'getSubjectAndRoom']);
    Route::get('/subjects/view', [SubjectController::class, 'getSubject']);
    Route::get('/', function () {
        return view('index');
    });



    Route::get('/build/{file}', function ($file) {
        $path = public_path("build/$file");

        if (file_exists("$path.gz")) {
            return Response::make(file_get_contents("$path.gz"))
                ->header('Content-Encoding', 'gzip')
                ->header('Content-Type', mime_content_type($path));
        }

        abort(404);
    })->where('file', '.*');
    Route::get('/getlinksurl', [ActivityController::class, 'getLinksUrlAll']);
    Route::post('/teacher/upload', [ActivityController::class, 'stores']);
    Route::post('/teacher/getUploads', [ActivityController::class, 'getUploads']);
});