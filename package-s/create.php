<?php
    session_start();
?>

<?php
    require_once('../stripe-php/init.php');

    \Stripe\Stripe::setApiKey('sk_test_51IOU3zB1ukiuhET1pFqHOlYbq07MlbTKWYLtaCGfoGDQjENtwXlCK462U91TSXHNJGanvdAcxD9z2aOsJGeOLTpH003QgE6gdA');

    function calculateOrderAmount(): int {
        // full price
        return $_SESSION["final_price"];
    }
    
    header('Content-Type: application/json');

    try {
        $paymentIntent = \Stripe\PaymentIntent::create([
            'amount' => calculateOrderAmount(),
            'currency' => 'usd',
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