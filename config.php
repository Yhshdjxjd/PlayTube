<?php
// Database connection configuration
$servername = "localhost"; // Server name or IP address
$username = "your_username"; // Database username
$password = "your_password"; // Database password
$database = "PlayTube"; // Name of your database

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Exit if the connection fails
}

// If connection is successful, print a confirmation message
echo "Connection successful!";
?>
