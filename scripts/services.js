$(document).ready(async function(){

    var session = "Inactive";
    var status = "Logged Out";
    var basePrice = 0;

    // Call session check
    await $.ajax({
        url: "../login/sessionCheck.php",
        type: "GET",
        dataType: 'json',
        success: function(response) {
            console.log(response);

            if (response['response']) {
                // Session is active
                $("#navbarResponsive .navbar-nav").html(`
                    <li class="nav-item">
                        <a class="nav-link text-uppercase" href="../dashboard/index.html">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-uppercase" href="../lessons/index.html">Lessons</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-uppercase active" href="#">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-uppercase" href="../settings/index.html">Settings</a>
                    </li>
                    <li class="nav-item">
                        <div class="logout-button">
                            <a class="nav-link text-uppercase" href="#">Logout</a>
                        </div>
                    </li>`);

                $(".navbar .navbar-brand").attr("href", "../dashboard/index.html");

                session = "Active";
            } else {
                // Session is not active
                $("#navbarResponsive .navbar-nav").html(`
                    <li class="nav-item">
                        <a class="nav-link text-uppercase" href="../index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-uppercase" href="../about/index.html">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-uppercase" aria-current="page" href="../team/index.html">Team</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link text-uppercase dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Services
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="../how-it-works/index.html">How It Works</a></li>
                                <li><a class="dropdown-item" href="../why-choose-us/index.html">Why Choose Us</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Our Services</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown contact">
                        <a class="nav-link text-uppercase" href="#" data-bs-toggle="dropdown">Contact</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="../contact/consultation/index.html">Book Your Consultation</a></li>
                            <li><a class="dropdown-item disabled" href="#">Join Us (For Tutors)</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <div class="login-button">
                            <a class="nav-link text-uppercase" href="../login/index.html">Login</a>
                        </div>
                    </li>`);

                $(".navbar .navbar-brand").attr("href", "../index.html");
            }
        },
        error: function(error) {
            console.log(error);

            $('.services-message-text').text("Internal Server Error. Please refresh the page.").css("display", "block");
        }
    })


    // Fetch status if session is active
    if (session === "Active") {
        await $.ajax({
            url: "statusFetch.php",
            type: "GET",
            dataType: 'json',
            success: function(response) {
                console.log(response);
                
                status = response['status'];
                basePrice = response['base-price'];
            },
            error: function(error) {
                console.log(error);
                
                $('.services-message-text').text("Internal Server Error. Please refresh the page.").css("display", "block");
            }
        })
    }


    // Change Act Now button behavior based on status
    if (status === "Logged Out") {
        // If Act Now buttons are pressed, then inform the user to log in first
        $('#services .button').click(function() {
            console.log('You must log in first');
            $('.services-message-text').css('display', 'block');
        });
    } else if (status === "Consultation") {
        // If Act Now buttons are pressed, then inform the user to log in first
        $('#services .button').click(function() {
            console.log('You will be able to purchase sessions after your consultation');
            $('.services-message-text').text("You will be able to purchase sessions after your consultation.").css('display', 'block');
        });
    } else if (status === "Activated") {
        // Change Act Now button hrefs
        $('.button-package').attr("href", "package/index.html");
        $('.button-package-plus').attr("href", "package-plus/index.html");
        $('.button-payg').attr("href", "pay-as-you-go/index.html");

        displayPrices();
    } else if (status === "PAYG") {
        // Disable PAYG button
        $('.button-payg').text("ACTIVATED").addClass("button-disabled").attr("aria-disabled", "true");

        // Change Package Act Now button hrefs
        $('.button-package').attr("href", "package/index.html");
        $('.button-package-plus').attr("href", "package-plus/index.html");

        displayPrices();
    } else if (status === "Package" || status === "Package+") {
        // Change Act Now button hrefs
        $('.button-package').attr("href", "package/index.html");
        $('.button-package-plus').attr("href", "package-plus/index.html");
        $('.button-payg').attr("href", "pay-as-you-go/index.html");

        displayPrices();
    }


    function displayPrices() {
        // Display prices
        $('.table-payg-price').text("$ " + basePrice + " / hr");
        $('.table-package-price').text("$ " + Math.ceil(0.88 * basePrice) + " / hr");
        $('.table-package-plus-price').text("$ " + Math.ceil(0.88 * basePrice) + " / hr");

        $('.table-price').css('display', 'block');
    }
});