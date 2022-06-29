<!DOCTYPE html>
<html lang="en">
<head>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Pattaya&family=Quicksand&display=swap" rel="stylesheet"> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <title>AdminX10</title>
    <!-- <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Pattaya&family=Quicksand&display=swap');
    </style> -->
</head>
<body>
    <div id="root"></div>
    <div id="portal"></div>

    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>