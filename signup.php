PHP
<!-- signup.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
</head>
<body>
    <h2>Sign Up Form</h2>
    <!-- Form for sign-up -->
    <form action="signup.php" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <label for="confirm_password">Confirm Password:</label>
        <input type="password" id="confirm_password" name="confirm_password" required><br><br>

        <button type="submit">Sign Up</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];

        // Check if passwords match
        if ($password != $confirm_password) {
            echo "Passwords do not match!";
        } else {
            // Hash the password before saving to database
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Database connection
            $conn = new mysqli('localhost', 'root', '', 'playtube');
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // SQL query to insert user into database
            $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";
            if ($conn->query($sql) === TRUE) {
                echo "Signup successful! Welcome, " . $username . ".";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            // Close the connection
            $conn->close();
        }
    }
    ?>
</body>
</html>
