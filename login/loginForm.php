<?php
    try {
        $servername = "localhost";
        $username = "uooqnklfygq2q";
        $password = "(3w?@q23s5fP";
        $dbname = "dbizw9tdvmzdch";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT UserID, Email, Password FROM Main";
        $result = $conn->query($sql);

        $isValidLogin = false;
        while ($row = $result->fetch_assoc()) {
            if ($_POST['email-address'] == $row["Email"] && $_POST['password'] == $row["Password"]) {
                $isValidLogin = true;

                // Set session variable
                session_start();
                $_SESSION['user'] = $row["UserID"];

                break;
            }
        }

        $conn->close();
        echo json_encode(['response' => $isValidLogin]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>