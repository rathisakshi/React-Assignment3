<?php
// Connect to MySQL
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$mysqli = new mysqli('localhost', 'admin', 'admin', 'contactdb');

// Check connection error
if ($mysqli->connect_errno) {
    die('Connection error: ' . $mysqli->connect_errno);
}

// Get ID parameter from query string
$id = $_GET['id'];

// Prepare and execute SQL statement to retrieve a single record by ID
$sql = "SELECT * FROM contact WHERE id = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();

// Check if record exists
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    die('Record not found');
}

// Fetch the record data as an associative array
$contact = $result->fetch_assoc();

// Close the database connection
$stmt->close();
$mysqli->close();

// Return the record data as a JSON object
header('Content-Type: application/json');
echo json_encode($contact);
?>