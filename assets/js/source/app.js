

jQuery(document).ready(function(){

    
    // gotop
    var offset = 800
        anchor = $('.anchor')
        go_top = $('.go-top');

    $(window).scroll(function() {
      ($(this).scrollTop() < offset) ? anchor.removeClass('run') : anchor.addClass('run');
    });

    go_top.click(function(){$('html,body').animate({scrollTop: 0}, 1000);});


    // anchor click
    
});

$(document).ready(function() {

        window.onresize = function (event) {
          applyOrientation();
        }
        
        function applyOrientation() {

            var wibody = window.innerWidth;
            var heibody = window.innerHeight;
            // Set Menuleft run when scroll Mouse
            var offset2  = 500,
                menuleft = $('.list_top_left'),
                heiCtn   = $('.detail_text_right').height();
                
                // var heiBodyWindow = window.innerHeight;
            $(window).scroll(function() {

                
            });
           	
        }
    applyOrientation();
    
});

