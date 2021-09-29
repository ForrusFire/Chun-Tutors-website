<?php
    session_start();
?>

<?php
    require_once("../stripe-php/init.php");
    require_once("../keyConstants.php");

    \Stripe\Stripe::setApiKey(STRIPE_SK);

    try {
        $customer = \Stripe\Customer::retrieve(
            $_SESSION["stripeID"],
        );
    
        echo json_encode(["defaultPM" => $customer["invoice_settings"]["default_payment_method"]]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>