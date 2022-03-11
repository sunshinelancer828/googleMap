<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="{{ asset('css/bootstrap.css') }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <title>Laravel</title>

    </head>
    <body>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7Nmq3eS_qlblGnuJmAIDyLq9tbJw9_cQ&libraries=places&region=DE&language=de"></script>
        <div id="root" style="height: 100%;"></div>

        <script src="{{ asset('js/manifest.js') }}"></script>
        <script src="{{ asset('js/vendor.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
