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
    var basePrice;

    await $.ajax({
        url: "../package/infoFetch.php",
        type: "GET",
        dataType: 'json',
        success: function(response) {
            console.log(response);
            
            status = response['status'];
            basePrice = response['basePrice'];
        },
        error: function(error) {
            console.log(error);
            
            $('.server-error-message').css("display", "block");
            // window.location.replace("https://chuntutors.com/login/index.html");
        }
    })


    // Put prices in html elements
    $('.order-summary-prediscount-price').text("$" + 12 * basePrice + " ");
    $('.order-summary-postdiscount-price').text("$" + 12 * Math.ceil(0.88 * basePrice));


    // Change message based on status
    if (status === "Activated") {
        $("#package .section-subheading").text("Please input your payment information. You will be automatically reverted to the \
        Pay As You Go service after running out of package sessions.");
    } else if (status === "PAYG") {
        $("#package .section-subheading").text("Lock in the lower package rate while you can! You will be automatically reverted to the \
        Pay As You Go service after running out of package sessions.");
    } else if (status === "Package" || status === "Package+") {
        $("#package .section-subheading").text("Lock in the lower package rate while you can! You will be automatically reverted to the \
        Pay As You Go service after running out of package sessions.")
    } else {
        window.location.replace("https://chuntutors.com/dashboard/index.html");
    }


    // Display existing payment options
    var previousPaymentMethod = true;

    await $.ajax({
        url: "../package/paymentMethods.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response);

            if (response["paymentMethods"].length == 0) {
                previousPaymentMethod = false;
                return;
            }

            response["paymentMethods"].forEach(paymentMethod => {
                var pmID = paymentMethod["id"];
                var cardBrand = paymentMethod["card"]["brand"];
                var expMonth = paymentMethod["card"]["exp_month"];
                var expYear = paymentMethod["card"]["exp_year"];
                var lastFour = paymentMethod["card"]["last4"];

                var cardBrandElem;
                if (cardBrand === "visa") {
                    cardBrandElem = "<i class='fab fa-cc-visa fa-2x'></i>";
                } else if (cardBrand === "mastercard") {
                    cardBrandElem = "<i class='fab fa-cc-mastercard fa-2x'></i>";
                } else if (cardBrand === "amex") {
                    cardBrandElem = "<i class='fab fa-cc-amex fa-2x'></i>";
                } else if (cardBrand === "discover") {
                    cardBrandElem = "<i class='fab fa-cc-discover fa-2x'></i>";
                } else if (cardBrand === "diners_club") {
                    cardBrandElem = "<i class='fab fa-cc-diners-club fa-2x'></i>";
                } else if (cardBrand === "jcb") {
                    cardBrandElem = "<i class='fab fa-cc-jcb fa-2x'></i>";
                } else {
                    cardBrandElem = "<i class='fas fa-credit-card fa-2x'></i>";
                };

                $("#paymentMethods").append(`
                    <div class="row card-data mb-3" data-pmID="`+ pmID +`">
                        <div class="col-auto">` + cardBrandElem + `</div>
                        <div class="col-auto text-muted">
                            **** **** **** `+ lastFour +`
                        </div>
                        <div class="col text-end fst-italic text-muted">Expires `+ expMonth + "/" + (expYear % 100) + `</div>
                    </div>
                `);
            });

            $("#paymentMethods").children().first().attr("data-selected", "true");
        },
        error: function(error) {
            console.log(error);

            $('.server-error-message').css("display", "block");
        }
    })


    // Stripe reference initialized with publishable API key
    var stripe = Stripe("pk_test_51IOU3zB1ukiuhET1QThfDycwDVdncbgQF9W4Kx8AoeGYSDAlHFaZ2qslnKnVR7My2GRoM2sWJAyyGCDifEq58nDp00LtGtHr0k");


    // Determine behavior based on if there was previous payment methods
    if (previousPaymentMethod) {
        // Append 'add new payment method' row
        $("#paymentMethods").append(`
            <div class="row card-data mb-5" data-pmID="new">
                <div class="col-auto"><i class="fas fa-plus"></i></div>
                <div class="col-auto">
                    Add new payment method
                </div>
            </div>
        `);

        // Fetch paymentIntent
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

                
                // Apply on click trigger to all of the data-selected elements
                $("#paymentMethods").children().on("click", function() {
                    $(this).siblings().attr("data-selected", "false");
                    $(this).attr("data-selected", "true");

                    // Show form if 'add new payment method' is selected, or else hide form
                    if ($(this).is(":last-child")) {
                        $(".form-group").css("display", "block");
                    } else {
                        $(".form-group").css("display", "none");
                        document.querySelector("#submit").disabled = false;
                        document.querySelector("#card-error").textContent = "";
                    }
                });
                document.querySelector("#submit").disabled = false; // Enable the submit button

                
                var form = document.getElementById("payment-form");
                form.addEventListener("submit", function(event) {
                    event.preventDefault();
                    // Complete payment when the submit button is clicked
                    if ($("#paymentMethods .card-data[data-selected=true]").attr("data-pmid") === "new") {
                        payWithCard(stripe, card, data.clientSecret);
                    } else {
                        payWithExistingCard(stripe, $("#paymentMethods .card-data[data-selected=true]").attr("data-pmid"), data.clientSecret);
                    }
                });
            })

    } else {
        $("#paymentMethods").css("display", "none");
        $(".form-group").css("display", "block");

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
                    // Complete payment when the submit button is clicked
                    payWithCard(stripe, card, data.clientSecret);
                });
        });
    }


    // Updates paymentIntent and then calls stripe.confirmCardPayment
    var payWithExistingCard = function(stripe, pmID, clientSecret) {
        loading(true);
        stripe 
            .confirmCardPayment(clientSecret, {
                payment_method: pmID,
                setup_future_usage: null,
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
    var orderComplete = async function(paymentIntentId) {
        loading(false);
        document.querySelector(".result-message").classList.remove("hidden");
        document.querySelector("#submit").disabled = true;

        // Update customer's status and add package session count
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
        window.location.replace("https://chuntutors.com/services/package-plus/success/index.html");
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