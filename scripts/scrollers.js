$(document).ready(function(){

    // Automatic Slideshow
    var index = 0;
    carousel();

    function carousel() {
        var scrollers = document.getElementsByClassName("comment");

        // Reset scrollers
        for (let i = 0; i < scrollers.length; i++) {
            scrollers[i].style.display = "none";  
        };

        // Display next scroller
        index++;
        if (index > scrollers.length) {index = 1};  
        scrollers[index-1].style.display = "block";

        setTimeout(carousel, 7000);
    };

})