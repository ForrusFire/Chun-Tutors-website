<?php
    require_once("../keyConstants.php");

    try {
        // Create connection
        $conn = new mysqli(SERVER_NAME, USERNAME, PASSWORD, DBNAME);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT Email FROM Main";
        $result = $conn->query($sql);
        
        $isValidEmail = true;
        while ($row = $result->fetch_assoc()) {
            if ($_GET['emailaddress'] == $row["Email"]) {
                $isValidEmail = false;
            }
        }

        $conn->close();
        echo json_encode(['response' => $isValidEmail]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>