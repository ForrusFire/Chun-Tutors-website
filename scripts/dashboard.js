$(document).ready(async function() {

    // Call session check
    await $.ajax({
        url: "../login/sessionCheck.php",
        type: "GET",
        dataType: 'json',
        success: function(response){
            console.log(response);
            
            if (!response['response']) {
                window.location.replace("https://chuntutors.com/login/index.html");
            }
        },
        error: function(error){
            console.log(error);

            $('.server-error-message').css('display', 'block');
            window.location.replace("https://chuntutors.com/login/index.html");
        }
    });



    // Get user data
    $.ajax({
        url: "userData.php",
        type: "GET",
        dataType: 'json',
        success: function(response) {
            console.log(response);

            // Inject name, email, and phone number
            const split_name = response["name"].split(" ");
            $('#dashboard-welcome').text("Welcome, " + split_name[0] + "!");

            $('#dashboard-email').text(response["email"]);
            $('#dashboard-phone-number').text(response["phone-number"]);

            // Change behavior based on Status
            if (response['status'] == 'Consultation') {
                $('.num-sessions').text("Awaiting Consultation");
                $('.dashboard-notice').text("We will contact you shortly to schedule your consultation. Please check your phone and your email frequently for \
                when we get in touch.");
            } else if (response['status'] == "Activated") {
                $('.num-sessions').text("No Payment Information");
                $('.services-link .form-link').text("Add payment info");
                $('.dashboard-notice').text("Please add your payment information in the Services section before you begin your first lesson. If you select the \
                Pay As You Go option, you won't be charged until after a lesson is completed.");
            } else if (response['status'] == "PAYG") {
                $('.num-sessions').text("Pay As You Go");
                $('.services-link .form-link').text("Switch to package");
                $('.dashboard-notice').text("You can receive 5% off all future lessons by referring another student! Just make sure that they mention your name \
                during their consultation.");
            } else if (response['status'] == "Package") {
                $('.num-sessions').text(response["sessionCount"] + " Sessions Remaining");
                $('.services-link .form-link').text("Get more sessions");
                $('.dashboard-notice').text("You can receive 5% off all future lessons by referring another student! Just make sure that they mention your name \
                during their consultation.");
            } else if (response['status'] == "Package+") {
                $('.num-sessions').text(response["sessionCount"] + " Sessions Remaining");
                $('.services-link .form-link').text("Get more sessions");
                $('.dashboard-notice').text("You can receive 5% off all future lessons by referring another student! Just make sure that they mention your name \
                during their consultation.");
            }
        },
        error: function(error) {
            console.log(error);

            $('.server-error-message').css('display', 'block');
        }
    })



    // Acquire lesson history
    $.ajax({
        url: "lessonHistory.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response);

            if (response.length == 0) {
                $('.past-lesson-subheading').text("No previous lessons. Work with your tutor to schedule a session, or send us an email.");
                return;
            }

            for (let i = 0; i <= Math.min(response.length, 3); i++) {
                if (i == 3) {
                    // Display "View more lessons"
                    $('.past-lesson-subheading').append(`
                        <div class="row mx-4 mb-3 mt-3 fst-italic">
                            <a href="../lessons/index.html" class="form-link">View more lessons</a>
                        </div>
                    `)

                    return;
                }

                // Style date
                let dateArray = response[i]["date"].split(" ")[0].split("-");
                let dateFormat = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

                let month = dateFormat.getMonth() + 1;
                let date = dateFormat.getDate();

                const dayMap = {
                    0: "Sun",
                    1: "Mon",
                    2: "Tue",
                    3: "Wed",
                    4: "Thur",
                    5: "Fri",
                    6: "Sat"
                };  
                let day = dayMap[dateFormat.getDay()];


                // Style name
                let nameArray = response[i]["tutorName"].split(" ");

                let firstName = nameArray[0];
                let lastInitial = nameArray[nameArray.length - 1].charAt(0);


                // Style HTML and place here with response data
                $('.past-lesson-subheading').append(`
                    <div class="row mt-1 mx-2 mb-2 py-2 past-lesson-element">
                        <div class="col-2">
                            ` + day + " " + month + "/" + date + `
                        </div>
                        <div class="col-auto">
                            <div>` + firstName + " " + lastInitial + "." + `</div>
                            <div class="text-muted">` + parseFloat(response[i]["length"]) + ` hour lesson</div>
                        </div>
                        <div class="col text-end text-muted fst-italic">
                            ` + response[i]["topics"] + `
                        </div>
                    </div>
                `)
            }
        },
        error: function(error) {
            console.log(error);

            $('.server-error-message').css("display", "block");
        }
    })


})