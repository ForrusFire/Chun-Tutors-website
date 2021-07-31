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

        $sql = "INSERT INTO Individual (name, pnumber, pref_tutor)
        VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sss', $_POST["name"], $_POST["pnumber"], $_POST["pref_tutor"]);
        $stmt->execute();

        $conn->close();
        echo json_encode(['response' => "Form submission successful"]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>