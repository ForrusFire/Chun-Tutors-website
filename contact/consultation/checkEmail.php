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