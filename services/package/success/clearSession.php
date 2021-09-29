<?php
    session_start();

    $_SESSION["stripeID"] = "";
    $_SESSION["emailAddress"] = "";
    $_SESSION["basePrice"] = "";
    $_SESSION["status"] = "";
    $_SESSION["sessionCount"] = "";
    echo json_encode(['response' => "Session clear success"]);
    exit;
?>