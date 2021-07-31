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
        
        $sql = "SELECT * FROM Tutors";
        $result = $conn->query($sql);
    
        $output = array();
    
        // Add the retrieved list of tutors to the output array
        while($row = $result->fetch_assoc()) {
            array_push($output, $row["tutor"]);
        }
    
        $conn->close();
        echo json_encode($output);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>