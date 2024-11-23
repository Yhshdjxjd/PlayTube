PHP
<?php
// Include the configuration file
include 'config.php';

// Example query: Fetch all users
$sql = "SELECT * FROM users";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print_r($results); // Display fetched data
} catch (Exception $e) {
    echo "Query failed: " . $e->getMessage();
}
?>
