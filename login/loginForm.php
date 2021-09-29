<?php
    require_once("../keyConstants.php");

    try {
        // Create connection
        $conn = new mysqli(SERVER_NAME, USERNAME, PASSWORD, DBNAME);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT UserID, Email, Password FROM Main";
        $result = $conn->query($sql);

        $isValidLogin = false;
        while ($row = $result->fetch_assoc()) {
            if ($_POST['email-address'] == $row["Email"] && password_verify($_POST['password'], $row["Password"])) {
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