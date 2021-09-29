<?php
    session_start();
?>
    
<?php
    require_once("../stripe-php/init.php");
    require_once("../keyConstants.php");

    \Stripe\Stripe::setApiKey(STRIPE_SK);

    try {
        $paymentMethods = \Stripe\PaymentMethod::All([
            "customer" => $_POST["stripeID"],
            "type" => "card",
        ]);

        $output = [
            'paymentMethods' => $paymentMethods->data,
        ];
        echo json_encode($output);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>