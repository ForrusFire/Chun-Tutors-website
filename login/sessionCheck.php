<?php
    session_start();

    $sessionCheck = isset($_SESSION['user']);
    echo json_encode(['response' => $sessionCheck]);
    exit;
?>