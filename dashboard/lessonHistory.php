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

        $lessons_sql = "SELECT TutorID, Date, Length, Topics, Comments FROM Lessons WHERE StudentID=" . strval($_SESSION['user']) . " ORDER BY Date Desc";
        $lessons_result = $conn->query($lessons_sql);

        $response = array();
        while ($row = $lessons_result->fetch_assoc()) {
            $main_sql = "SELECT Name FROM Main WHERE UserID=" . strval($row["TutorID"]);
            $main_result = $conn->query($main_sql);

            $tutor_info = $main_result->fetch_assoc();

            array_push($response, array(
                "tutorName" => $tutor_info["Name"],
                "date" => $row["Date"],
                "length" => $row["Length"],
                "topics" => $row["Topics"],
                "comments" => $row["Comments"],
            ));
        }

        $conn->close();
        echo json_encode($response);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>