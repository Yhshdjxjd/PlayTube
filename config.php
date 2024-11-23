<?php
// Database configuration details
$host = 'localhost';         // Your MySQL server address
$username = 'root';          // Your MySQL username
$password = '';              // Your MySQL password (leave blank if no password)
$database = 'PlayTube';      // Your database name

try {
    // Establish a PDO connection
    $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
<?php
echo "Database connection successful!";
?>
