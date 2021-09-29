<?php
    session_start();
?>

<?php
    require_once("../stripe-php/init.php");
    require_once("../keyConstants.php");

    \Stripe\Stripe::setApiKey(STRIPE_SK);

    try {
        $customer = \Stripe\Customer::update(
            $_SESSION["stripeID"],
            ["invoice_settings" => ["default_payment_method" => $_POST["primary"]]],
        );
    
        echo json_encode(["Update Successful"]);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>