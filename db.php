<?php
// Database configuration
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'saffdb';

// Create a database connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check if the connection was successful
if (!$conn) {
    die('Error connecting to the database: ' . mysqli_connect_error());
}
?>