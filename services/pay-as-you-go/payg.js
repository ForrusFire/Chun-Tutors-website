$(document).ready(async function() {

    // Call session check
    await $.ajax({
        url: "../../login/sessionCheck.php",
        type: "GET",
        dataType: 'json',
        success: function(response) {
            console.log(response);

            if (!response['response']) {
                // Session is not active
                window.location.replace("https://chuntutors.com/login/index.html");
            }
        },
        error: function(error) {
            console.log(error);

            $('.server-error-message').css("display", "block");
            window.location.replace("https://chuntutors.com/login/index.html");
        }
    })

    
    // Disable pay button until Stripe is set up on the page
    document.querySelector("#submit").disabled = true;


    // Fetch info once session activation is verified
    var status;
    var sessionCount;

    await $.ajax({
        url: "infoFetch.php",
        type: "GET",
        dataType: 'json',
        success: function(response) {
            console.log(response);
            
            status = response['status'];
            sessionCount = response['sessionCount'];
        },
        error: function(error) {
            console.log(error);
            
            $('.server-error-message').css("display", "block");
            // window.location.replace("https://chuntutors.com/login/index.html");
        }
    })


    // Change behavior based on status
    if (status === "Activated") {
        $("#payg .section-subheading").text("Please input your payment information. Remember, you won't be charged until after a session is completed.");

        // Display stripe payment form
        $("#payment-form").css("display", "block");

        // Stripe reference initialized with publishable API key
        var stripe = Stripe("pk_test_51IOU3zB1ukiuhET1QThfDycwDVdncbgQF9W4Kx8AoeGYSDAlHFaZ2qslnKnVR7My2GRoM2sWJAyyGCDifEq58nDp00LtGtHr0k");

        // Fetch setupIntent
        fetch("create.php", {
            method: "POST",
        })
            .then(function(result) {
                return result.json();
            })
            .then(function(data) {
                var elements = stripe.elements();
                var style = {
                    base: {
                        color: "#32325d",
                        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSmoothing: "antialiased",
                        fontSize: "16px",
                        "::placeholder": {
                            color: "#32325d"
                        }
                    },
                    invalid: {
                        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        color: "#ff2929",
                        iconColor: "#ff2929"
                    }
                };
                var card = elements.create("card", { style: style });

                // Stripe injects an iframe into the DOM
                card.mount("#card-element");
                card.on("change", function(event) {
                    // Disable the pay button if there are no card details in the element
                    document.querySelector("#submit").disabled = event.empty;
                    document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
                });

                var form = document.getElementById("payment-form");
                form.addEventListener("submit", function(event) {
                    event.preventDefault();
                    // Complete setup when the submit button is clicked
                    setupWithCard(stripe, card, data.clientSecret);
                });
        });
    } else if (status === "Package" || status === "Package+") {
        $("#payg .section-subheading").text("You have " + sessionCount + " package sessions remaining. You will be automatically reverted to the \
        Pay As You Go service after running out of package sessions.")
        
        // Display return to dashboard button
        $(".button-container").css("display", "block");
    } else {
        window.location.replace("https://chuntutors.com/dashboard/index.html");
    }




    // Calls stripe.confirmCardSetup
    // If the card requires authentication Stripe shows a pop-up modal to
    // prompt the user to enter authentication details without leaving your page.
    var setupWithCard = function(stripe, card, clientSecret) {
        loading(true);
        stripe
            .confirmCardSetup(clientSecret, {
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
                    orderComplete(result.setupIntent.id);
                }
            });
    };


    /* ------- UI helpers ------- */
    // Shows a success message when the payment is complete
    var orderComplete = async function(setupIntentId) {
        loading(false);
        document.querySelector(".result-message").classList.remove("hidden");
        document.querySelector("#submit").disabled = true;

        // Update customer's status
        await $.ajax({
            url: "update.php",
            type: "GET",
            dataType: "json",
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);

                $('.server-error-message').text("Internal Server Error. Please contact your specialist for assistance.").css("display", "block");
            }
        })

        // Redirect
        window.location.replace("https://chuntutors.com/services/pay-as-you-go/success/index.html");
    };

    // Show the customer the error from Stripe if their card fails to charge
    var showError = function(errorMsgText) {
        loading(false);
        var errorMsg = document.querySelector("#card-error");
        errorMsg.textContent = errorMsgText;
        setTimeout(function() {
            errorMsg.textContent = "";
        }, 6000);
    };

    // Show a spinner on payment submission
    var loading = function(isLoading) {
        if (isLoading) {
            // Disable the button and show a spinner
            document.querySelector("#submit").disabled = true;
            document.querySelector("#spinner").classList.remove("hidden");
            document.querySelector("#button-text").classList.add("hidden");
        } else {
            document.querySelector("#submit").disabled = false;
            document.querySelector("#spinner").classList.add("hidden");
            document.querySelector("#button-text").classList.remove("hidden");
        }
    };
})