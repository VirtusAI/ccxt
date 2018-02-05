<?php

$root = dirname (dirname (dirname (__FILE__)));

include $root . '/ccxt.php';

date_default_timezone_set ('UTC');

// instantiate the exchange by id
$exchange = '\\ccxt\\kraken';
$exchange = new $exchange ();
$limit = 10; // up to ten order on each side, for example
var_dump ($exchange->fetch_order_book ('BTC/USD', $limit));


?>