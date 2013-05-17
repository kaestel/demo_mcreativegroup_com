<?php

/**
* This file contains generel database connection information and creates a permanent connection to the specified database
* SQL: GRANT ALL PRIVILEGES ON w_hhd.* TO 'w_hhd'@'localhost' IDENTIFIED BY 'hv1D3Va2' WITH GRANT OPTION;
*
* @package Config
*/

$db_hostname = "localhost";
$db_username = "w_hhd";
$db_password = isset($_SERVER["DB_PASS"]) ? $_SERVER["DB_PASS"] : "hv1D3Va2";

@mysql_pconnect($db_hostname, $db_username, $db_password) or die; //header(WWW_PATH."/errors/db.php");

// correct the database connection setting
mysql_query("SET NAMES utf8");
mysql_query("SET CHARACTER SET utf8");

?>