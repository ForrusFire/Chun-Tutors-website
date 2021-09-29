<?php
    session_start();

    require_once("../../keyConstants.php");

    try {
        // Create connection
        $conn = new mysqli(SERVER_NAME, USERNAME, PASSWORD, DBNAME);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "UPDATE Main SET Status=? WHERE UserID=" . strval($_SESSION['user']);
        $stmt = $conn->prepare($sql);

        // Determine what to change Status to
        $status = "PAYG";

        $stmt->bind_param('s', $status);
        $stmt->execute();

        $conn->close();
        echo json_encode(['response' => "Update Successful"]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>