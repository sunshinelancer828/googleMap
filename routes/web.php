<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

function file_get_contents_ssl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3000); // 3 sec.
    curl_setopt($ch, CURLOPT_TIMEOUT, 10000); // 10 sec.
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api', function () {
    $xml = file_get_contents_ssl('https://lak-bw-portal.notdienst-portal.de/lakbwportal/xmlschnittstelle/kennziffer/ergebnis?digits=127&dayCount=1&key=1639569272519_-2008290756');
    echo $xml;
});

Route::get('/version', function () {
    $version = file_get_contents_ssl('https://apothekennotdienst-bw.de/lakbwportal/resources/common/js/emergencyInterface/html/version.txt');
    echo $version;
});
