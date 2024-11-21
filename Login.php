<?php
// Code for database connection
$conn = new mysqli('localhost', 'root', '', 'playtube');

// If the connection is not successful, display an error message
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connection successful!"; // Confirmation message
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // SQL code
    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                echo "Login successful!";
            } else {
                echo "Invalid password.";
            }
        } else {
            echo "No user found.";
        }
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close(); // Close database connection
}
?>

      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login Form</h2>
    <!-- Form for login -->
    <form action="login.php" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <button type="submit">Login</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Database connection
        $conn = new mysqli('localhost', 'root', '', 'playtube');
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Search in the database with username
        $sql = "SELECT * FROM users WHERE username='$username'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // If user is found, check the password
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                echo "Login successful!";
            } else {
                echo "Invalid password.";
            }
        } else {
            echo "No user found.";
        }

        $conn->close();
    }
    ?>
</body>
</html>


<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'playtube');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Redirect to home page after successful login
            header("Location: home.php");
            exit();
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found.";
    }
    $conn->close();
}
?>
