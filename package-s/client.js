// stripe reference initialized with publishable API key
var stripe = Stripe("pk_test_51IOU3zB1ukiuhET1QThfDycwDVdncbgQF9W4Kx8AoeGYSDAlHFaZ2qslnKnVR7My2GRoM2sWJAyyGCDifEq58nDp00LtGtHr0k");

// the items the customer wants to buy
var purchase = {
    items: [{id: "package"}]
};

// disable pay button until Stripe is set up on the page
document.querySelector(".sc-payment-button").disabled = true;

fetch("create.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(purchase)
})
    .then(function(result) {
        return result.json();
    })
    .then(function(data) {
        var elements = stripe.elements();
        var style = {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#ff2929",
                iconColor: "#ff2929"
            }
        };
        var card = elements.create("card", { style: style });

        // Stripe injects an iframe into the DOM
        card.mount("#card-element");
        card.on("change", function (event) {
            // disable the pay button if there are no card details in the element
            document.querySelector(".sc-payment-button").disabled = event.empty;
            document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
        });

        var form = document.getElementById("payment-form");
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            // Complete payment when the submit button is clicked
            payWithCard(stripe, card, data.clientSecret);
        });
});

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function(stripe, card, clientSecret) {
    loading(true);
    stripe
        .confirmCardPayment(clientSecret, {
            payment_method: {
                card: card
            }
        })
        .then(function(result) {
            if (result.error) {
                // Show error to your customer
                showError(result.error.message);
            } else {
                // The payment succeeded!
                orderComplete(result.paymentIntent.id);
            }
        });
};

/* ------- UI helpers ------- */
// Shows a success message when the payment is complete
var orderComplete = function(paymentIntentId) {
    loading(false);
    document.querySelector(".sc-payment-result-message").classList.remove("sc-hidden");
    document.querySelector(".sc-payment-button").disabled = true;

    // Store Form in Database
    fetch("form.php", {
        method: "POST",
    });

    // Redirect
    try {
        window.location.replace("https://chuntutors.com/package/complete/index.php");
    } catch(e) {
        window.location = "https://chuntutors.com/package/complete/index.php";
    };
};
// Show the customer the error from Stripe if their card fails to charge
var showError = function(errorMsgText) {
    loading(false);
    var errorMsg = document.querySelector("#card-error");
    errorMsg.textContent = errorMsgText;
    setTimeout(function() {
        errorMsg.textContent = "";
    }, 5000);
};
// Show a spinner on payment submission
var loading = function(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector(".sc-payment-button").disabled = true;
        document.querySelector("#spinner").classList.remove("sc-hidden");
        document.querySelector("#button-text").classList.add("sc-hidden");
    } else {
        document.querySelector(".sc-payment-button").disabled = false;
        document.querySelector("#spinner").classList.add("sc-hidden");
        document.querySelector("#button-text").classList.remove("sc-hidden");
    }
};