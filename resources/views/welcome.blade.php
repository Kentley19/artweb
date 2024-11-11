<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>My React App</title>
        
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/jsx/main.jsx'])

    {{-- @vite('js/app.js'); --}}
    <body>
        <div id="root"></div> 

    </body>
</html>