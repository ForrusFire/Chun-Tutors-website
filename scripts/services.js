$(document).ready(function(){

    // If Act Now buttons are pressed, then inform the user to log in first
    $('#services .button').click(function() {
        console.log('test');
        $('.login-text').css('display', 'block');
    });

});