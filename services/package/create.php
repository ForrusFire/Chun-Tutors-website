<?php
    session_start();
?>
    
<?php
    require_once("../../stripe-php/init.php");
    require_once("../../keyConstants.php");

    \Stripe\Stripe::setApiKey(STRIPE_SK);

    function calculateOrderAmount(): int {
        // Package Full Price, 8 sessions
        return 800 * ceil(0.88 * $_SESSION["basePrice"]);
    }

    try {
        $paymentIntent = \Stripe\PaymentIntent::create([
            'amount' => calculateOrderAmount(),
            'currency' => 'usd',
            'receipt_email' => $_SESSION["emailAddress"],
            'customer' => $_SESSION["stripeID"],
            'description' => 'Package (8 Sessions)',
            'setup_future_usage' => 'off_session',
        ]);

        $output = [
            'clientSecret' => $paymentIntent->client_secret,
        ];
        echo json_encode($output);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>