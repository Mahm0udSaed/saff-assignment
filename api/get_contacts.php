<?php
include '../db.php';

// Set the response header to JSON
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Other headers to allow specific methods and headers
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// Fetch all contacts from the database
$query = "SELECT c.name,c.email,c.phone  FROM contacts c";
$result = mysqli_query($conn, $query);

// Check if there are any contacts
if (mysqli_num_rows($result) > 0) {
    $contacts = array();

    // Loop through each contact and add it to the contacts array
    while ($row = mysqli_fetch_assoc($result)) {
        $contacts[] = $row;
    }

    echo json_encode($contacts);
} else {
    echo json_encode(array());
}
?>