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

        $sql = "SELECT StripeID, PhoneNumber, Email, Subjects, Level, Status FROM Main WHERE UserID=" . strval($_SESSION['user']);
        $result = $conn->query($sql);

        $row = $result->fetch_assoc();

        $conn->close();

        echo json_encode([
            'stripeID' => $row["StripeID"], 
            'phoneNumber' => $row["PhoneNumber"],
            'email' => $row["Email"],
            'subjects' => $row["Subjects"],
            'level' => $row["Level"],
            'status' => $row["Status"]
        ]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>