<?php
include 'dbconfig.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$con = getConnection();

// Fetch all contacts from database
$sql = "SELECT * FROM contact";
$result = mysqli_query($con, $sql);


$contacts = array();

// Add each contact to the array
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $contacts[] = $row;
    }
}

// Send the response in JSON format
echo json_encode($contacts);

mysqli_close($con);
?>
