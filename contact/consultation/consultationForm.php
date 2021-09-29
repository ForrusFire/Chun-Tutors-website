<?php
    require_once("../../stripe-php/init.php");
    require_once("../../keyConstants.php");

    try {
        // Create connection
        $conn = new mysqli(SERVER_NAME, USERNAME, PASSWORD, DBNAME);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Create random User ID
        $userID = random_int(100000000, 999999999);
        $basePrice = 0;
        $sessionCount = 0;
        $status = "Consultation";

        // Hash password
        $pword = password_hash($_POST["password"], PASSWORD_DEFAULT);

        // Create customer object from Stripe
        \Stripe\Stripe::setApiKey(STRIPE_SK);
        $customer = \Stripe\Customer::create([
            "email" => $_POST["email-address"],
            "metadata" => [
                "UserID" => $userID, 
                "SPT" => $_POST["student-parent"], 
                "StudentName" => $_POST["student-name"], 
                "Subjects" => $_POST["subjects"], 
                "Level" => $_POST["level"],
            ],
            "name" => $_POST["name"],
            "phone" => $_POST["phone-number"],
        ]);
        $stripeID = $customer->id;

        // Execute SQL Insert
        $sql = "INSERT INTO Main (UserID, StripeID, Name, PhoneNumber, Email, Password, SPT, StudentName, Subjects, Level, Comments, Status, SessionCount, BasePrice) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ssssssssssssss', $userID, $stripeID, $_POST["name"], $_POST["phone-number"], $_POST["email-address"], 
            $pword, $_POST["student-parent"], $_POST["student-name"], $_POST["subjects"], $_POST["level"], $_POST["additional"], $status, $sessionCount, $basePrice);
        $stmt->execute();

        // Close connection and send response
        $conn->close();
        echo json_encode(['response' => "Form submission successful"]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>