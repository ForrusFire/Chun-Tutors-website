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


    // Activate Student Name if Parent is selected
    $('[name="student-parent"]').on('change', function(){
        if ($('#parent').is(":checked")) {
            $('#student-name-form-elem').css('display', "block");
            $('#student-name').prop('required', true);
        } else {
            $('#student-name-form-elem').css("display", "none");
            $('#student-name').prop('required', false);
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
    $('#consultation-form').submit(function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.checkValidity() === true) {
            $.ajax({
                url: "form.php",
                type: "POST",
                dataType: 'json',
                data: $('#consultation-form').serialize(),
                success: function(response){
                    console.log(response);
                },
                error: function(error){
                    console.log(error);
                }
            });

            // document.getElementById('completed-modal').style.display='block';
            // document.getElementById('uncompleted-modal').style.display='none';
            $('#consultation .section-subheading').first().text("Your consultation form has been submitted. We will contact you as soon as possible!");
            $('#consultation .section-subheading').last().text("");
            $('#form').css("display", "none");
            $('#consultation').css("padding-bottom", "1rem");
            $('#checkmark').css('display', "block");
        } else {
            // Scroll to first invalid field
            $('html').animate({scrollTop: $('#consultation-form .form-control:invalid, #consultation-form .form-check-input:invalid').first().offset().top - 150}, 'fast');
        }

        $('#consultation-form').addClass('was-validated');
    });


})