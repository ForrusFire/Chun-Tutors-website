$(document).ready(function() {

    // Call session check
    $.ajax({
        url: "../../../login/sessionCheck.php",
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


    // Clear session variables
    $.ajax({
        url: "../../package/success/clearSession.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);

            $('.server-error-message').css("display", "block");
        }
    })


    // Log out button
    $(".navbar").on("click", ".logout-button", function(){
        $.ajax({
            url:"../../../logout.php",
            type: "GET",
            dataType: 'json',
            success: function(response){
                console.log(response);
                window.location.reload();
            },
            error: function(error){
                console.log(error);
                window.location.reload();
            }
        })
    })

})