<?php

/**
* This file contains definitions
*
* @package Config
*/
error_reporting(E_ALL);

/**
* Site name
*/
define("SITE_UID", "mcn");
define("SITE_NAME", "mcreativegroup.net");
define("SITE_DB", "w_mcn");
define("SITE_URL", "mcreativegroup.dk");
#define("ADMIN_FRONT", "/sites/navigation.php");

define("DEFAULT_LANGUAGE_ISO", "EN"); // Regional language English
define("DEFAULT_COUNTRY_ISO", "US"); // Regional country USA

include_once($_SERVER["FRAMEWORK_PATH"]."/config/file_paths.php");
include_once("config/databases.php");
include_once("config/connect.php");


?>
