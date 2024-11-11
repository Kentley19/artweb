<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckDevice
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {  
        if ($this->isMobileDevice($request->header('User-Agent'))) { 
            $token = rand();
            $request->session()->put('is_mobile_access', $token);
            
            // Redirect to the `isMobile` route with the token as a query parameter
            return redirect()->route('isMobile', ['token' => $token]);
        } 

        return $next($request);
    }
    private function isMobileDevice($userAgent)
    {
        return preg_match('/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i', $userAgent);
    }
}
