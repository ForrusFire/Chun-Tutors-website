$(document).ready(function(){

    // Mobile Stack Button
    $('#mobileStackButton').click(function(){
        var mobileStackView = $('.sc-mobile-stack-button');
        if (mobileStackView.css('opacity') == '0'){
            mobileStackView.css('zIndex', '1');
            mobileStackView.css('opacity', '1');
            mobileStackView.css('transition', 'opacity 200ms 0ms, z-index 0ms 0ms');
        } else {
            mobileStackView.css('opacity', '0');
            mobileStackView.css('zIndex', '-1');
            mobileStackView.css('transition', 'opacity 200ms 0ms, z-index 0ms 200ms');
        };
    });


    // If logo is clicked, close out of mobile stack
    $('#mainLogo').click(function(){
        var mobileStackView = $('.sc-mobile-stack-button');
        if (mobileStackView.css('opacity') == '1'){
            mobileStackView.css('opacity', '0');
            mobileStackView.css('zIndex', '-1');
            mobileStackView.css('transition', 'opacity 200ms 0ms, z-index 0ms 200ms');
        };
    });
    
});