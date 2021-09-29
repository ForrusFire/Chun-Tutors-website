<?php
    session_start();

    require_once("../keyConstants.php");

    try {
        // Create connection
        $conn = new mysqli(SERVER_NAME, USERNAME, PASSWORD, DBNAME);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        if ($_POST["change-email"] == "true") {
            // Execute SQL Update
            $sql = "UPDATE Main SET Email=?, PhoneNumber=? WHERE UserID=" . strval($_SESSION['user']);
            $stmt = $conn->prepare($sql);

            $stmt->bind_param('ss', $_POST["new-email-address"], $_POST["phone-number"]);
            $stmt->execute();
        } else {
            // Execute SQL Update
            $sql = "UPDATE Main SET PhoneNumber=? WHERE UserID=" . strval($_SESSION['user']);
            $stmt = $conn->prepare($sql);

            $stmt->bind_param('s', $_POST["phone-number"]);
            $stmt->execute();
        }

        $conn->close();
        echo json_encode(['response' => "Form Update Successful"]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>