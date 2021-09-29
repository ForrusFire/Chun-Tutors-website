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

        $sql = "SELECT Name, Email, PhoneNumber, Status, SessionCount FROM Main WHERE UserID=" . strval($_SESSION['user']);
        $result = $conn->query($sql);

        $row = $result->fetch_assoc();

        $conn->close();
        echo json_encode([
            'name' => $row['Name'], 
            'email' => $row['Email'], 
            'phone-number' => $row['PhoneNumber'], 
            'status' => $row["Status"], 
            'sessionCount' => $row["SessionCount"]
        ]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>