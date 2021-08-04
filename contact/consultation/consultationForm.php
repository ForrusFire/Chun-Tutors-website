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

        // Create random User ID
        $userID = random_int(100000000, 999999999);
        $basePrice = 0;

        $sql = "INSERT INTO Main (UserID, Name, PhoneNumber, Email, Password, SPT, StudentName, Subjects, Level, Comments, BasePrice) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sssssssssss', $userID, $_POST["name"], $_POST["phone-number"], $_POST["email-address"], 
            $_POST["password"], $_POST["student-parent"], $_POST["student-name"], $_POST["subjects"], $_POST["level"], $_POST["additional"], $basePrice);
        $stmt->execute();

        $conn->close();
        echo json_encode(['response' => "Form submission successful"]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>