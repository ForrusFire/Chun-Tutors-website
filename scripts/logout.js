$(document).ready(function() {
    
    // Log out button
    $(".navbar").on("click", ".logout-button", function(){
        $.ajax({
            url:"../logout.php",
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