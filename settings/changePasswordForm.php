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

        // Hash password
        $pword = password_hash($_POST["new-password"], PASSWORD_DEFAULT);

        // Execute SQL Update
        $sql = "UPDATE Main SET Password=? WHERE UserID=" . strval($_SESSION['user']);
        $stmt = $conn->prepare($sql);

        $stmt->bind_param('s', $pword);
        $stmt->execute();

        $conn->close();
        echo json_encode(['response' => "Form Update Successful"]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>