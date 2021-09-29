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

        $sql = "SELECT Password FROM Main WHERE UserID=" . strval($_SESSION["user"]);
        $result = $conn->query($sql);

        $row = $result->fetch_assoc();
        
        $isValidPassword = false;
        if (password_verify($_POST['password'], $row["Password"])) {
            $isValidPassword = true;
        }

        $conn->close();
        echo json_encode(['response' => $isValidPassword]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>