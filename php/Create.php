<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Check if all required fields are present
if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['address']) && isset($_POST['email'])) {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $email = $_POST['email'];

    // Connect to the database
    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "contactdb";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO contact (name, phone, address, email) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $phone, $address, $email);

    // Execute the SQL statement
    if ($stmt->execute() === TRUE) {
        echo json_encode(array('message' => 'Data stored successfully'));
    } else {
        echo json_encode(array('error' => 'Error storing data'));
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array('error' => 'Missing required fields'));
}

?>