PHP
<?php
// Database connection details
$host = 'localhost';          // Your MySQL server address (use 'localhost' if it's on your local machine)
$dbname = 'PlayTube';         // Your database name (use the correct name of your database)
$username = 'root';           // MySQL username (use your MySQL username)
$password = '';               // MySQL password (leave it empty if no password is set)

try {
    // Create a new PDO instance and establish the connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // If connection is successful, print this message (remove this for production environment)
    echo "Database connection successful!";
} catch (PDOException $e) {
    // If connection fails, display the error message
    echo "Database connection failed: " . $e->getMessage();
}
?>

<?php
// Include the database connection file
include 'db_connection.php'; // If the file is in a subfolder, use the correct path, like 'includes/db_connection.php'

// Database operation code will be here
$sql = "SELECT * FROM users"; // Example query to fetch all users
$stmt = $conn->prepare($sql);
$stmt->execute();

// Fetch results
$results = $stmt->fetchAll();
print_r($results);
?>