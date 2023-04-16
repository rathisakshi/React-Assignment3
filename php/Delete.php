<?php
include 'dbconfig.php';
//header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];

    $con = getConnection();

    $stmt = $con->prepare("DELETE FROM contact WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $stmt->close();
        mysqli_close($con);
        echo "Contact deleted successfully";
    } else {
        echo "Error deleting contact: " . $con->error;
    }
} else {
    echo "Invalid request";
}
