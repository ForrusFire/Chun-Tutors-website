$(document).ready(function(){

    // Automatic Slideshow
    var index = 0;
    carousel();

    function carousel() {
        var i;
        var scrollers = document.getElementsByClassName("sc-scroller");

        // Reset scrollers
        for (i = 0; i < scrollers.length; i++) {
            scrollers[i].style.display = "none";  
        };

        // Display next scroller
        index++;
        if (index > scrollers.length) {index = 1};  
        scrollers[index-1].style.display = "block";

        setTimeout(carousel, 6500);
    };


    // Modal Outside Click Reset
    var modal = document.getElementsByClassName('sc-modal')[0];
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };


    // Mobile Price Radio Options
    priceRadio();

    $('#priceRadioElement').change(function(){
        priceRadio();
    });

    function priceRadio() {
        var radioButton = $("#price-radio-button");
        if ($("#price-radio-individual").is(':checked')){
            radioButton.html(
                "<button class='sc-button-act' onclick=document.getElementsByClassName('sc-modal')[0].style.display='block'>CONTINUE TO AVAILABILITY</button>");
        } else if ($("#price-radio-package1").is(':checked')){
            radioButton.html(
                "<a href='package-s/index.php' class='sc-button-act sc-href-no-underline'>CONTINUE TO AVAILABILITY</a>");
        } else if ($("#price-radio-package2").is(':checked')){
            radioButton.html(
                "<a href='package/index.php' class='sc-button-act sc-href-no-underline'>CONTINUE TO AVAILABILITY</a>");
        };
    };


    // Small Phone Program Features Droplist
    $('#sphoneVector').click(function(){
        sphoneProgramFeatures();
    });

    $('#sphoneFeatures').click(function(){
        sphoneProgramFeatures();
    });

    function sphoneProgramFeatures() {
        var sphoneDroplist = $('#sphone-droplist');
        if (sphoneDroplist.css('opacity') == '0'){
            document.getElementsByClassName('sc-sphone-program-features-button')[0].innerHTML = "View Less";
            sphoneDroplist.css('maxHeight', '167px');
            sphoneDroplist.css('opacity', '1');
            sphoneDroplist.css('transition', 'max-height 400ms 0ms, opacity 500ms 0ms');
        } else{
            document.getElementsByClassName('sc-sphone-program-features-button')[0].innerHTML = "View Program Features";
            sphoneDroplist.css('maxHeight', '0');
            sphoneDroplist.css('opacity', '0');
            sphoneDroplist.css('transition', 'max-height 400ms 0ms, opacity 400ms 0ms');
        };
    };

});