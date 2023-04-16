<?php
include 'dbconfig.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $con = getConnection();
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Get form data
    $id =  $_GET['id'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $email = $_POST['email'];
//
//    echo "id: $id\n";
//    echo "name: $name\n";
//    echo "phone: $phone\n";
//    echo "address: $address\n";
//    echo "email: $email\n";
    $con->select_db("contactdb");
    // Update data in database
    $stmt = mysqli_prepare($con, "UPDATE contact SET name=?, phone=?, address=?, email=? WHERE id=?");
    mysqli_stmt_bind_param($stmt, "ssssi", $name, $phone, $address, $email, $id);

    if (!mysqli_stmt_execute($stmt)) {
        echo 'Error: ' . mysqli_stmt_error($stmt);
    } else {
        echo 'Data updated successfully';
    }

    mysqli_stmt_close($stmt);
    mysqli_close($con);
}
?>