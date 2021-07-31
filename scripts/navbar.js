$(document).ready(function(){
    
    // Navbar shrink function
    navbarShrink();
    function navbarShrink() {
        if (window.scrollY === 0) {
            $('.navbar').removeClass('navbar-shrink')       
        } else {
            $('.navbar').addClass('navbar-shrink')
        };
    }
    
    $(document).scroll(function() {
        navbarShrink();
    });

});