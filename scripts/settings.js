$(document).ready(async function() {

    // Session Check
    await $.ajax({
        url: "../login/sessionCheck.php",
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


    // Retrieve User Data
    var userStripeID;
    var userPhoneNumber;
    var userEmail;
    var userSubjects;
    var userLevel;
    var userStatus;

    await infoFetch();

    async function infoFetch() {
        await $.ajax({
            url: "infoFetch.php",
            type: "GET",
            dataType: 'json',
            success: function(response) {
                console.log(response);
                
                userStripeID = response['stripeID'];
                userPhoneNumber = response['phoneNumber'];
                userEmail = response['email'];
                userSubjects = response['subjects'];
                userLevel = response['level'];
                userStatus = response['status'];
            },
            error: function(error) {
                console.log(error);
                
                $('.server-error-message').css("display", "block");
            }
        })
    }


    // Retrieve Stripe Data
    var paymentMethods;

    await paymentMethodsFetch();

    async function paymentMethodsFetch() {
        await $.ajax({
            url: "paymentMethods.php",
            type: "POST",
            dataType: 'json',
            data: {stripeID: userStripeID},
            success: function(response) {
                console.log(response);
                
                paymentMethods = response["paymentMethods"];
            },
            error: function(error) {
                console.log(error);
                
                $('.server-error-message').css("display", "block");
            }
        })
    }


    // Change active settings option on click
    $(".settings-option").on("click", function() {
        $(".settings-option.active").removeClass("active");
        $(this).addClass("active");

        changeSettingsCard($(this).text());
    })



    // Add appropriate settings card
    changeSettingsCard("Contact Information");

    async function changeSettingsCard(option) {
        if (option == "Contact Information") {
            $(".settings-card").html(`
                <div class="container mt-4">
                    <div class="settings-card-heading mb-4">
                        Contact Information
                    </div>

                    <form novalidate id="settings-contact-info-form">
                        <div class="mb-3">
                            <label for="phone-number" class="form-label">Phone Number</label>
                            <input type="text" class="form-control" id="phone-number" name="phone-number" value="` + userPhoneNumber + `" required>
                            <div class="invalid-feedback">
                                Please enter a valid phone number.
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="email-address" class="form-label">Email</label>
                            <input type="email" class="form-control mb-1" id="email-address" name="email-address" value="` + userEmail + `" readonly>
                            <a class="form-link" id="change-email" href="#">Change Email</a>
                        </div>

                        <div id="change-email-group" style="display:none;">
                            <div class="mb-3">
                                <label for="new-email-address" class="form-label">New Email Address</label>
                                <input type="email" class="form-control" id="new-email-address" name="new-email-address">
                                <div class="invalid-feedback">
                                    Please enter a valid email address.
                                </div>
                            </div>
                            <div class="mb-4">
                                <label for="password" class="form-label">Chun Tutors Password</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="password" name="password">
                                    <span class="input-group-text">
                                        <a class="password-eye" href=""><i id="eye-icon" class="fa fa-eye-slash" aria-hidden="true"></i></a>
                                    </span>
                                    <div class="invalid-feedback">
                                        Please enter your current Chun Tutors password.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <button id="settings-submit-button" class="mb-5 btn btn-primary btn-xl" type="submit">
                                <div class="spinner hidden" id="settings-submit-spinner"></div>
								<span id="settings-submit-text">Update</span>
                            </button>
                        </div>
                    </form>
                </div>
            `);
        } else if (option == "Tutoring Preferences") {
            $(".settings-card").html(`
                <div class="container mt-4">
                    <div class="settings-card-heading mb-4">
                        Tutoring Preferences
                    </div>

                    <form novalidate id="settings-tutoring-pref-form">
                        <div class="mb-4">
                            <label for="subjects" class="form-label">Subjects</label>
                            <input type="text" class="form-control" id="subjects" name="subjects" value="` + userSubjects + `" required>
                            <div class="invalid-feedback">
                                Please enter a subject.
                            </div>
                        </div>

                        <label for="level" class="form-label">Level</label>
                        <div class="form-group mb-4">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="level" id="high-school" value="High School" required>
                                <label class="form-check-label" for="high-school">
                                    High School
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="level" id="college" value="College" required>
                                <label class="form-check-label" for="college">
                                    College
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="level" id="graduate" value="Graduate" required>
                                <label class="form-check-label" for="graduate">
                                    Graduate
                                </label>
                                <div class="invalid-feedback" style="margin-left: -24px">
                                    Please select one of the options above.
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <button id="settings-submit-button" class="mb-5 btn btn-primary btn-xl" type="submit">
                                <div class="spinner hidden" id="settings-submit-spinner"></div>
                                <span id="settings-submit-text">Update</span>
                            </button>
                        </div>
                    </form>
                </div>
            `);

            // Use userLevel to select the right level
            if (userLevel == "High School") {
                $('#settings-tutoring-pref-form #high-school').prop('checked', 'true');
            } else if (userLevel == "College") {
                $('#settings-tutoring-pref-form #college').prop('checked', 'true');
            } else if (userLevel == "Graduate") {
                $('#settings-tutoring-pref-form #graduate').prop('checked', 'true');
            }
        } else if (option == "Payment Methods") {
            if (userStatus == "Consultation") {
                $(".settings-card").html(`
                    <div class="container mt-4">
                        <div class="settings-card-heading mb-4">
                            Payment Methods
                        </div>

                        <div>
                            You will be able to input payment information after your consultation.
                        </div>
                    </div>
                `);
            } else if (userStatus == "Activated") {
                $(".settings-card").html(`
                    <div class="container mt-4">
                        <div class="settings-card-heading mb-4">
                            Payment Methods
                        </div>

                        <div>
                            Please go to the Services section to input your payment information.
                        </div>
                    </div>
                `);
            } else {
                $(".settings-card").html(`
                    <div class="container mt-4">
                        <div class="settings-card-heading mb-4">
                            Payment Methods
                        </div>
                        
                        <div id="settings-payment-methods-form">
                            <div id="paymentMethods"><!--Injection--></div>

                            <!--Add a New Card-->
                            <div class="add-new-card" style="display:none;">
                                <div class="form-group mb-3 mt-5">
                                    <label class="form-label">Cardholder's Name</label>
                                    <input type="text" class="form-control name-input">
                                </div>

                                <div class="form-group mb-4">
                                    <label class="form-name-label">Card Number</label>
                                    <div id="card-element"><!--Stripe.js injects the Card Element--></div>
                                </div>
                            </div>

                            <button id="submit" disabled>
                                <div class="spinner hidden" id="spinner"></div>
                                <span id="button-text">Set as primary card</span>
                            </button>
                            <p id="card-error" role="alert"></p>
                            <p class="result-message hidden text-muted">
                                Card added successfully! <a href="../dashboard/index.html">Click here</a> to return to the Chun Tutors dashboard.
                            </p>
                                
                            <div class="mb-5">
                                <div class="add-new-card" style="display:none;">
                                    <div class="row" style="margin-top:1.35em;">
                                        <div class="col-12 text-end">
                                            Secured by  <img src="../images/Stripe.png" class="stripe-image">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                
                // Default Payment Method 
                var defaultPM;

                await $.ajax({
                    url: "defaultPM.php",
                    type: "GET",
                    dataType: 'json',
                    success: function(response) {
                        console.log(response);
                        
                        defaultPM = response["defaultPM"];
                    },
                    error: function(error) {
                        console.log(error);
                        
                        $('.server-error-message').css("display", "block");
                    }
                })

                // Append payment methods
                paymentMethods.forEach(paymentMethod => {
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

                    var isPrimary;
                    if (pmID === defaultPM) {
                        isPrimary = "  (Primary)";
                    } else {
                        isPrimary = "";
                    }

                    $("#paymentMethods").append(`
                        <div class="row card-data mb-3" data-pmID="`+ pmID +`">
                            <div class="col-auto">` + cardBrandElem + `</div>
                            <div class="col-auto text-muted">
                                **** **** **** `+ lastFour + isPrimary +`
                            </div>
                            <div class="col text-end fst-italic text-muted">Expires `+ expMonth + "/" + (expYear % 100) + `</div>
                        </div>
                    `);
                });

                // Append "Add a new card" card
                $("#paymentMethods").append(`
                    <div class="row card-data mb-4" data-pmID="new">
                        <div class="col-auto"><i class="fas fa-plus"></i></div>
                        <div class="col-auto">
                            Add a new card
                        </div>
                    </div>
                `);

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
                        
                        $("#settings-payment-methods-form #submit").on("click", async function(event) {
                            event.preventDefault();

                            if ($("#settings #paymentMethods .card-data[data-selected=true]").attr("data-pmid") === "new") {
                                // Complete setup when the submit button is clicked
                                setupWithCard(stripe, card, data.clientSecret);
                            } else {
                                loading(true);

                                // Change primary card
                                await $.ajax({
                                    url: "changePrimary.php",
                                    type: "POST",
                                    dataType: 'json',
                                    data: {primary: $("#settings #paymentMethods .card-data[data-selected=true]").attr("data-pmid")},
                                    success: function(response) {
                                        console.log(response);

                                        $('#settings-payment-methods-form').css("display", "none");
                                        $('#settings .settings-card .container').append("<div class='mb-4 text-muted'>Your primary card has been updated.</div>");
                                    },
                                    error: function(error) {
                                        console.log(error);
                                        
                                        $('.server-error-message').css("display", "block");
                                        $('html').animate({scrollTop: $('#settings').offset().top}, 'fast');
                                    }
                                })
                                
                                loading(false);
                            }
                        })
                    })


            }
        } else if (option == "Change Password") {
            $(".settings-card").html(`
                <div class="container mt-4">
                    <div class="settings-card-heading mb-4">
                        Change Password
                    </div>

                    <form novalidate id="settings-change-password-form">
                        <div class="mb-4">
                            <label for="current-password" class="form-label">Current Password</label>
                            <div class="input-group">
                                <input type="password" class="form-control password" id="current-password" name="current-password" required>
                                <span class="input-group-text">
                                    <a class="password-eye" href=""><i id="eye-icon" class="fa fa-eye-slash" aria-hidden="true"></i></a>
                                </span>
                                <div class="invalid-feedback">
                                    Incorrect current password.
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="new-password" class="form-label">New Password</label>
                            <div class="input-group">
                                <input type="password" class="form-control password" id="new-password" name="new-password" required>
                                <span class="input-group-text">
                                    <a class="password-eye" href=""><i id="eye-icon" class="fa fa-eye-slash" aria-hidden="true"></i></a>
                                </span>
                                <div class="invalid-feedback">
                                    Please enter a new password that is 8 to 20 characters long.
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <button id="settings-submit-button" class="mb-5 btn btn-primary btn-xl" type="submit">
                                <div class="spinner hidden" id="settings-submit-spinner"></div>
                                <span id="settings-submit-text">Update</span>
                            </button>
                        </div>
                    </form>
                </div>
            `);
        }
    }





    // Custom Phone Number validity (Contact Info Form)
    $("#settings").on('input', "#settings-contact-info-form #phone-number", function() {
        // Test phone number for valid format
        let pnumber_regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!pnumber_regex.test(this.value)) {
            this.setCustomValidity('Invalid phone number.');

            let invalid_feedback = $(this).siblings('.invalid-feedback');
            this.value == "" ? invalid_feedback.text('Please enter a valid phone number.') : invalid_feedback.text('Invalid phone number.');
            return;
        }

        this.setCustomValidity('');
    });


    // Change Email Toggle (Contact Info Form)
    $("#settings").on('click', "#settings-contact-info-form #change-email", function(event) {
        event.preventDefault();

        if ($(this).parent().siblings("#change-email-group").css("display") == "none") {
            $(this).text("Cancel Email Change");
            $('#change-email-group #new-email-address').prop('required', true);
            $('#change-email-group #password').prop('required', true);
            $(this).parent().siblings("#change-email-group").css("display", "block");
        } else if ($(this).parent().siblings("#change-email-group").css("display") == "block") {
            $(this).text("Change Email");
            $('#change-email-group #new-email-address').prop('required', false);
            $('#change-email-group #password').prop('required', false);
            $(this).parent().siblings("#change-email-group").css("display", "none");
        };
    });


    // Password Eye toggle (Contact Info Form)
    $("#settings").on("click", "#settings-contact-info-form .password-eye", function(event) {
        event.preventDefault();
        
        if ($(this).parent().siblings('#password').attr('type') == "text") {
            $(this).parent().siblings('#password').attr('type', 'password');
            $(this).children('#eye-icon').addClass("fa-eye-slash").removeClass("fa-eye");
        } else {
            $(this).parent().siblings('#password').attr('type', 'text');
            $(this).children('#eye-icon').removeClass("fa-eye-slash").addClass("fa-eye");
        };
    });


    // Settings Contact Info Form Submission
    $("#settings").on("submit", "#settings-contact-info-form", async function(event) {
        event.preventDefault();
        event.stopPropagation();
        loadingSubmit(true);

        // Do the following only if #change-email is block
        if ($("#settings #settings-contact-info-form #change-email-group").css("display") == "block") {
            // Check if email is already in database
            await $.ajax({
                url: "checkEmail.php",
                type: "GET",
                dataType: 'json',
                data: {emailaddress: $('#settings-contact-info-form #new-email-address').val()},
                success: function(response){
                    if (!response['response']) {
                        document.getElementById('new-email-address').setCustomValidity('An account with this email already exists.');
                        $('#settings-contact-info-form #new-email-address').siblings('.invalid-feedback').text('An account with this email already exists.');
                    } else {
                        document.getElementById('new-email-address').setCustomValidity('');
                        $('#settings-contact-info-form #new-email-address').siblings('.invalid-feedback').text('Please enter a valid email address.');
                    }
                    console.log(response);
                },
                error: function(error){
                    $('.server-error-message').css('display', "block");
                    console.log(error);
    
                    document.getElementById('new-email-address').setCustomValidity('Internal Server Error. Please log out and log in again.');
                    $('#settings-contact-info-form #new-email-address').siblings('.invalid-feedback').text('Internal Server Error. Please log out and log in again.');
                }
            })

            // Check if password is valid
            await $.ajax({
                url: "isValidPassword.php",
                type: "POST",
                dataType: 'json',
                data: {password: $('#settings-contact-info-form #password').val()},
                success: function(response){
                    if (!response['response']) {
                        document.getElementById('password').setCustomValidity('Your password is incorrect.');
                        $('#settings-contact-info-form #password').siblings('.invalid-feedback').text('Your password is incorrect.');
                    } else {
                        document.getElementById('password').setCustomValidity('');
                        $('#settings-contact-info-form #password').siblings('.invalid-feedback').text('Please input your password.');
                    }
                    console.log(response);
                },
                error: function(error){
                    $('.server-error-message').css('display', "block");
                    console.log(error);
    
                    document.getElementById('password').setCustomValidity('Internal Server Error. Please log out and log in again.');
                    $('#settings-contact-info-form #password').siblings('.invalid-feedback').text('Internal Server Error. Please log out and log in again.');
                }
            })
        } else {
            document.getElementById('new-email-address').setCustomValidity('');
            document.getElementById('password').setCustomValidity('');
        }


        // If check validity, then save new phone number (and new email address and Chun Tutors password, if appropriate)
        if (this.checkValidity() === true) {
            await $.ajax({
                url: "contactInfoForm.php",
                type: "POST",
                dataType: 'json',
                data: $('#settings-contact-info-form').serialize() + "&change-email=" + ($("#settings #settings-contact-info-form #change-email-group").css("display") == "block").toString(),
                success: function(response){
                    $('#settings-contact-info-form').css("display", "none");
                    $('#settings .settings-card .container').append("<div class='mb-4 text-muted'>Your contact information has been updated.</div>");

                    console.log(response);
                },
                error: function(error){
                    $('.server-error-message').css('display', "block");
                    $('html').animate({scrollTop: $('#settings').offset().top}, 'fast');

                    console.log(error);
                }
            });

            await infoFetch();
        }

        loadingSubmit(false);
        $(this).addClass('was-validated');
    });






    // Settings Tutoring Pref Form Submission
    $("#settings").on("submit", "#settings-tutoring-pref-form", async function(event) {
        event.preventDefault();
        event.stopPropagation();
        loadingSubmit(true);

        // If check validity, then save new subjects and level
        if (this.checkValidity() === true) {
            await $.ajax({
                url: "tutoringPrefForm.php",
                type: "POST",
                dataType: 'json',
                data: $('#settings-tutoring-pref-form').serialize(),
                success: function(response){
                    $('#settings-tutoring-pref-form').css("display", "none");
                    $('#settings .settings-card .container').append("<div class='mb-4 text-muted'>Your tutoring preferences have been updated.</div>");

                    console.log(response);
                },
                error: function(error){
                    $('.server-error-message').css('display', "block");
                    $('html').animate({scrollTop: $('#settings').offset().top}, 'fast');

                    console.log(error);
                }
            });

            await infoFetch();
        }

        loadingSubmit(false);
        $(this).addClass('was-validated');
    });





    // Apply on click trigger to all of the data-selected elements (Payment Methods Form)
    $("#settings").on("click", "#paymentMethods > div", function() {
        $(this).siblings().attr("data-selected", "false");
        $(this).attr("data-selected", "true");

        $("#settings #settings-payment-methods-form #submit").prop("disabled", false);

        // Show form if 'add a new card' is selected, or else hide form
        if ($(this).is(":last-child")) {
            $(".add-new-card").css("display", "block");
            $("#settings-payment-methods-form #button-text").text("Add new card");
        } else {
            $(".add-new-card").css("display", "none");
            $("#settings-payment-methods-form #button-text").text("Set as primary card");
            document.querySelector("#card-error").textContent = "";
        }
    });







    // Password Eye toggle (Change Password Form)
    $("#settings").on("click", "#settings-change-password-form .password-eye", function(event) {
        event.preventDefault();
        
        if ($(this).parent().siblings('input').attr('type') == "text") {
            $(this).parent().siblings('input').attr('type', 'password');
            $(this).children('#eye-icon').addClass("fa-eye-slash").removeClass("fa-eye");
        } else {
            $(this).parent().siblings('input').attr('type', 'text');
            $(this).children('#eye-icon').removeClass("fa-eye-slash").addClass("fa-eye");
        };
    });


    // Custom Password validity (Change Password Form)
    $("#settings").on("input", "#settings-change-password-form #new-password", function() {
        // Test password for valid length
        if (this.value.length < 8 || this.value.length > 20) {
            this.setCustomValidity('Please enter a password that is 8 to 20 characters long.');
            return;
        }

        this.setCustomValidity('');
    });


    // Settings Change Password Form Submission
    $("#settings").on("submit", "#settings-change-password-form", async function(event) {
        event.preventDefault();
        event.stopPropagation();
        loadingSubmit(true);

        // Verify current password
        await $.ajax({
            url: "isValidPassword.php",
            type: "POST",
            dataType: 'json',
            data: {password: $('#settings-change-password-form #current-password').val()},
            success: function(response){
                if (!response['response']) {
                    document.getElementById('current-password').setCustomValidity('Your password is incorrect.');
                    $('#settings-change-password-form #current-password').siblings('.invalid-feedback').text('Your password is incorrect.');
                } else {
                    document.getElementById('current-password').setCustomValidity('');
                    $('#settings-change-password-form #current-password').siblings('.invalid-feedback').text('Please input your password.');
                }
                console.log(response);
            },
            error: function(error){
                $('.server-error-message').css('display', "block");
                console.log(error);

                document.getElementById('current-password').setCustomValidity('Internal Server Error. Please log out and log in again.');
                $('#settings-change-password-form #current-password').siblings('.invalid-feedback').text('Internal Server Error. Please log out and log in again.');
            }
        })

        // If form valid, then save new password
        if (this.checkValidity() === true) {
            await $.ajax({
                url: "changePasswordForm.php",
                type: "POST",
                dataType: 'json',
                data: $('#settings-change-password-form').serialize(),
                success: function(response){
                    $('#settings-change-password-form').css("display", "none");
                    $('#settings .settings-card .container').append("<div class='mb-4 text-muted'>Your password has been updated.</div>");

                    console.log(response);
                },
                error: function(error){
                    $('.server-error-message').css('display', "block");
                    $('html').animate({scrollTop: $('#settings').offset().top}, 'fast');

                    console.log(error);
                }
            });

            await infoFetch();
        }

        loadingSubmit(false);
        $(this).addClass('was-validated');
    });





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
                    // The setup succeeded!
                    setupComplete(result.setupIntent.id);
                }
            });
    };


    /* ------- UI helpers ------- */
    // Shows a success message when the setup is complete
    var setupComplete = async function(setupIntentId) {
        loading(false);
        document.querySelector("#settings #settings-payment-methods-form .result-message").classList.remove("hidden");
        document.querySelector("#settings #settings-payment-methods-form #submit").disabled = true;

        // Display success message and update cards
        $('#settings-payment-methods-form').css("display", "none");
        $('#settings .settings-card .container').append("<div class='mb-4 text-muted'>Your new card has been added successfully.</div>");

        await paymentMethodsFetch();
    };

    // Show the customer the error from Stripe if their card fails to setup
    var showError = function(errorMsgText) {
        loading(false);
        var errorMsg = document.querySelector("#settings #settings-payment-methods-form #card-error");
        errorMsg.textContent = errorMsgText;
        setTimeout(function() {
            errorMsg.textContent = "";
        }, 6000);
    };

    // Show a spinner on setup submission
    var loading = function(isLoading) {
        if (isLoading) {
            // Disable the button and show a spinner
            document.querySelector("#settings #settings-payment-methods-form #submit").disabled = true;
            document.querySelector("#settings #settings-payment-methods-form #spinner").classList.remove("hidden");
            document.querySelector("#settings #settings-payment-methods-form #button-text").classList.add("hidden");
        } else {
            document.querySelector("#settings #settings-payment-methods-form #submit").disabled = false;
            document.querySelector("#settings #settings-payment-methods-form #spinner").classList.add("hidden");
            document.querySelector("#settings #settings-payment-methods-form #button-text").classList.remove("hidden");
        }
    };

    // Show a spinner on form submission
    function loadingSubmit(isLoading) {
        if (isLoading) {
            // Disable the button and show a spinner
            document.querySelector("#settings-submit-button").disabled = true;
            document.querySelector("#settings-submit-spinner").classList.remove("hidden");
            document.querySelector("#settings-submit-text").classList.add("hidden");
        } else {
            document.querySelector("#settings-submit-button").disabled = false;
            document.querySelector("#settings-submit-spinner").classList.add("hidden");
            document.querySelector("#settings-submit-text").classList.remove("hidden");
        }
    };


})