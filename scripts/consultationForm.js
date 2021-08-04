$(document).ready(function(){

    // Custom Name validity
    $('[id="name"]').on('input', function() {
        // Test name for valid format
        let name_regex = /^[a-zA-Z-'\s]*$/;
        if (!name_regex.test(this.value)) {
            this.setCustomValidity('Only letters and whitespace allowed.');
            $(this).siblings('.invalid-feedback').text('Only letters and whitespace allowed.');
            return;
        }

        this.setCustomValidity('');
        $(this).siblings('.invalid-feedback').text('Please enter a name.');
    });


    // Custom Phone Number validity
    $('[id="phone-number"]').on('input', function() {
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


    // Password Eye toggle
    $(".password-eye").on("click", function(event){
        event.preventDefault();
        
        if ($('#password').attr('type') == "text") {
            $('#password').attr('type', 'password');
            $('#eye-icon').addClass("fa-eye-slash").removeClass("fa-eye");
        } else {
            $('#password').attr('type', 'text');
            $('#eye-icon').removeClass("fa-eye-slash").addClass("fa-eye");
        };
    })


    // Custom Password validity
    $('[id="password"]').on('input', function() {
        // Test password for valid length
        if (this.value.length < 8 || this.value.length > 20) {
            this.setCustomValidity('Please enter a password that is 8 to 20 characters long.');
            return;
        }

        this.setCustomValidity('');
    });


    // Activate Student Name if Parent is selected
    $('[name="student-parent"]').on('change', function(){
        if ($('#parent').is(":checked")) {
            $('#student-name-form-elem').css('display', "block");
            $('#student-name').prop('required', true);
            $('.form-label[for="subjects"]').text('What does your child want to learn?');
            $('.form-label[for="level"]').text("Select your child's level");
        } else {
            $('#student-name-form-elem').css("display", "none");
            $('#student-name').prop('required', false);
            $('.form-label[for="subjects"]').text('What do you want to learn?');
            $('.form-label[for="level"]').text("Select your level");
        };
    });


    // Custom Student Name validity
    $('[id="student-name"]').on('input', function() {
        // Test name for valid format
        let name_regex = /^[a-zA-Z-'\s]*$/;
        if (!name_regex.test(this.value)) {
            this.setCustomValidity('Only letters and whitespace allowed.');
            $(this).siblings('.invalid-feedback').text('Only letters and whitespace allowed.');
            return;
        }

        this.setCustomValidity('');
        $(this).siblings('.invalid-feedback').text('Please enter a name.');
    });


    // Consultation Form Submission
    $('#consultation-form').submit(async function(event) {
        event.preventDefault();
        event.stopPropagation();

        // Check if email is already in database
        await $.ajax({
            url: "checkEmail.php",
            type: "GET",
            dataType: 'json',
            data: {emailaddress: $('#email-address').val()},
            success: function(response){
                if (!response['response']) {
                    document.getElementById('email-address').setCustomValidity('An account with this email already exists.');
                    $('#email-address').siblings('.invalid-feedback').text('An account with this email already exists.');
                } else {
                    document.getElementById('email-address').setCustomValidity('');
                    $('#email-address').siblings('.invalid-feedback').text('Please enter a valid email address.');
                }
                console.log(response);
            },
            error: function(error){
                $('.server-error-message').css('display', "block");
                $('html').animate({scrollTop: $('#consultation').offset().top}, 'fast');
                console.log(error);

                document.getElementById('email-address').setCustomValidity('Internal Server Error. Please refresh the page and fill out the form again.');
                $('#email-address').siblings('.invalid-feedback').text('Internal Server Error. Please refresh the page and fill out the form again.');
            }
        })


        if (this.checkValidity() === true) {
            $.ajax({
                url: "consultationForm.php",
                type: "POST",
                dataType: 'json',
                data: $('#consultation-form').serialize(),
                success: function(response){
                    $('#consultation .section-subheading').first().text("Your consultation form has been submitted. We will contact you as soon as possible!");
                    $('#consultation .section-subheading').last().text("");
                    $('#consultation .section-subheading').last().append("You can also now <a class='form-link' href='../../login/index.html'>log in</a> using your email and the password that you just created.");
        
                    $('#form').css("display", "none");
                    $('#consultation').css("padding-bottom", "1rem");
                    $('#checkmark').css('display', "block");
                    console.log(response);
                },
                error: function(error){
                    $('.server-error-message').css('display', "block");
                    $('html').animate({scrollTop: $('#consultation').offset().top}, 'fast');
                    console.log(error);
                }
            });

            // document.getElementById('completed-modal').style.display='block';
            // document.getElementById('uncompleted-modal').style.display='none';
        } else {
            // Scroll to first invalid field
            $('html').animate({scrollTop: $('#consultation-form .form-control:invalid, #consultation-form .form-check-input:invalid').first().offset().top - 150}, 'fast');
        }

        $('#consultation-form').addClass('was-validated');
        $('.password-info').css('display', 'none'); // Turn password info text off
    });


})