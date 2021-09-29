$(document).ready(function() {

    // Log out of session if on the Login page
    $.ajax({
        url:"../logout.php",
        type:"GET",
        dataType: 'json',
        success: function(response){
            console.log(response);
        },
        error: function(error){
            $('.server-error-message').css('display', "block");
            console.log(error);
        }
    })

    // Login Form Submission
    $('#login-form').submit(function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.checkValidity() === true) {
            $.ajax({
                url: "loginForm.php",
                type: "POST",
                dataType: 'json',
                data: $('#login-form').serialize(),
                success: function(response){
                    console.log(response);
                    
                    if (response['response']) {
                        $('.login-error-message').css('display', "none");
                        
                        // Redirect
                        window.location.href = "https://chuntutors.com/dashboard/index.html";
                    } else {
                        $('.login-error-message').css('display', "block");
                    }
                },
                error: function(error){
                    $('.login-error-message').css('display', "none");
                    $('.server-error-message').css('display', "block");
                    console.log(error);
                }
            });
        }

        if ($('#email-address').val() === "") {
            $('#email-address').addClass('is-invalid');
        } else {
            $('#email-address').removeClass('is-invalid');
        }

        if ($('#password').val() === "") {
            $('#password').addClass('is-invalid');
        } else {
            $('#password').removeClass('is-invalid');
        }

    });
    

})