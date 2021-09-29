<?php
    session_start();
    session_destroy();

    echo json_encode(['response' => "Logout successful"]);
    exit;
?>