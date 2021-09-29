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

        $sql = "SELECT StripeID, Email, Status, SessionCount, BasePrice FROM Main WHERE UserID=" . strval($_SESSION['user']);
        $result = $conn->query($sql);

        $row = $result->fetch_assoc();

        $conn->close();

        $_SESSION["stripeID"] = $row["StripeID"];
        $_SESSION["emailAddress"] = $row["Email"];
        $_SESSION["basePrice"] = $row["BasePrice"];
        $_SESSION["status"] = $row["Status"];
        $_SESSION["sessionCount"] = $row["SessionCount"];
        echo json_encode(['status' => $row["Status"], 'basePrice' => $row["BasePrice"]]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>