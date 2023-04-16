<?php
$server = 'localhost';
$username = 'admin';
$password = 'admin';
$database = 'contactdb';

$con = mysqli_connect($server, $username, $password);
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "CREATE DATABASE IF NOT EXISTS `$database`";
if (mysqli_query($con, $sql)) {
    $sql = "USE `$database`";
    mysqli_query($con, $sql);
    $sql = "CREATE TABLE IF NOT EXISTS contact (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )";
    mysqli_query($con, $sql);
} else {
    die("Error creating database: " . mysqli_error($con));
}
function getConnection() {
    global $con;
    return $con;
}

?>