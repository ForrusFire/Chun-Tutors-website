<?php
    session_start();
?>

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

        $sql = "INSERT INTO Form (name, studentparent, pnumber, eaddress, pref_tutor, past_referral, referral_name, num_sessions, num_weeks, time_pref)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ssssssssss', $_SESSION["name"], $_SESSION["studentparent"], $_SESSION["pnumber"], $_SESSION["eaddress"], $_SESSION["pref_tutor"], $_SESSION["past_referral"], $_SESSION["referral_name"], $_SESSION["num_sessions"], $_SESSION["num_weeks"], $_SESSION["time_pref"]);
        $stmt->execute();

        $conn->close();
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>