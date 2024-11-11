<!DOCTYPE html>
<html>
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link id="icon" rel="shortcut icon" href="TemplateData/favicon.ico">
    <title>Laravel with React</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
    <div id="root"></div>
    
</body>
</html>
