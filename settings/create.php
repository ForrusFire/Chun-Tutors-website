<?php
    session_start();
?>
    
<?php
    require_once("../stripe-php/init.php");
    require_once("../keyConstants.php");

    \Stripe\Stripe::setApiKey(STRIPE_SK);

    try {
        $setupIntent = \Stripe\SetupIntent::create([
            'customer' => $_SESSION["stripeID"],
            'usage' => 'off_session',
        ]);

        $output = [
            'clientSecret' => $setupIntent->client_secret,
        ];
        echo json_encode($output);
    } catch (Error $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
?>