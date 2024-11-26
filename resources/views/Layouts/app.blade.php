<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Blue Investment</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />


        <link href="{{asset('/css/app.css') }}" rel="stylesheet">


        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Merienda:wght@300..900&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">


        <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicons/favicon-16x16.png">
    <link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicons/favicon.ico">
    <link rel="manifest" href="/assets/img/favicons/manifest.json">
    <meta name="msapplication-TileImage" content="/assets/img/favicons/mstile-150x150.png">
    <meta name="theme-color" content="#ffffff">
    <script src="/assets/js/config.js"></script>
    <script src="/vendors/simplebar/simplebar.min.js"></script>

        <!-- ===============================================-->
        <!--    Favicons-->
        <!-- ===============================================-->
{{--        <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicons/apple-touch-icon.png">--}}
{{--        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicons/favicon-32x32.png">--}}
{{--        <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicons/favicon-16x16.png">--}}
{{--        <link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicons/favicon.ico">--}}
{{--        <link rel="manifest" href="/assets/img/favicons/manifest.json">--}}
{{--        <meta name="msapplication-TileImage" content="/assets/img/favicons/mstile-150x150.png">--}}
{{--        <meta name="theme-color" content="#ffffff">--}}
{{--        <script src="/assets/js/config.js"></script>--}}
{{--        <script src="/vendors/simplebar/simplebar.min.js"></script>--}}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap">
        <style>
            .custom-font {
                font-family: 'Poppins', sans-serif;
            }
        </style>

        <!-- ===============================================-->
        <!--    Stylesheets-->
        <!-- ===============================================-->
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet">
        <link href="/vendors/simplebar/simplebar.min.css" rel="stylesheet">
        <link href="/assets/css/theme-rtl.min.css" rel="stylesheet" id="style-rtl">
        <link href="/assets/css/theme.min.css" rel="stylesheet" id="style-default">
        <link href="/assets/css/user-rtl.min.css" rel="stylesheet" id="user-style-rtl">
        <link href="/assets/css/user.min.css" rel="stylesheet" id="user-style-default">
{{--        <script>--}}
{{--            var isRTL = JSON.parse(localStorage.getItem('isRTL'));--}}
{{--            if (isRTL) {--}}
{{--                var linkDefault = document.getElementById('style-default');--}}
{{--                var userLinkDefault = document.getElementById('user-style-default');--}}
{{--                linkDefault.setAttribute('disabled', true);--}}
{{--                userLinkDefault.setAttribute('disabled', true);--}}
{{--                document.querySelector('html').setAttribute('dir', 'rtl');--}}
{{--            } else {--}}
{{--                var linkRTL = document.getElementById('style-rtl');--}}
{{--                var userLinkRTL = document.getElementById('user-style-rtl');--}}
{{--                linkRTL.setAttribute('disabled', true);--}}
{{--                userLinkRTL.setAttribute('disabled', true);--}}
{{--            }--}}
{{--        </script>--}}
    </head>
    <body>
        @yield('content')
        <script src="{{asset('/js/app.js')}}"></script>
        <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
        <script>
            feather.replace()
        </script>

        <!-- ===============================================-->
        <!--    JavaScripts-->
        <!-- ===============================================-->
{{--        <script src="/vendors/popper/popper.min.js"></script>--}}
{{--        <script src="/vendors/bootstrap/bootstrap.min.js"></script>--}}
{{--        <script src="/vendors/anchorjs/anchor.min.js"></script>--}}
{{--        <script src="/vendors/is/is.min.js"></script>--}}
{{--        <script src="/vendors/fontawesome/all.min.js"></script>--}}
{{--        <script src="/vendors/lodash/lodash.min.js"></script>--}}
{{--        <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>--}}
{{--        <script src="/vendors/list.js/list.min.js"></script>--}}
{{--        <script src="/assets/js/theme.js"></script>--}}

<script src="/vendors/popper/popper.min.js"></script>
    <script src="/vendors/bootstrap/bootstrap.min.js"></script>
    <script src="/vendors/anchorjs/anchor.min.js"></script>
    <script src="/vendors/is/is.min.js"></script>
    <script src="/vendors/swiper/swiper-bundle.min.js"> </script>
    <script src="/vendors/typed.js/typed.js"></script>
    <script src="/vendors/fontawesome/all.min.js"></script>
    <script src="/vendors/lodash/lodash.min.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
    <script src="/vendors/list.js/list.min.js"></script>
    <script src="/assets/js/theme.js"></script>
    </body>
</html>
