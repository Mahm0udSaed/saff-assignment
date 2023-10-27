<?php
include '../db.php';

// Set the response header to JSON
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Get the input data from the request
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];

// Insert the data into the database
$query = "INSERT INTO contacts (name, email, phone) VALUES ('$name', '$email', '$phone')";
$result = mysqli_query($conn, $query);

// Check if the insertion was successful
if ($result) {
    $response = array('status' => 'success', 'message' => 'Contact inserted successfully');
} else {
    $response = array('status' => 'error', 'message' => 'Error inserting contact');
}

echo json_encode($response);
?>