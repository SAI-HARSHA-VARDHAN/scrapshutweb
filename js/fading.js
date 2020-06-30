var c = 0;
              $(document).ready(function() {
                $('.hideme').children('.imgg').animate(
                            { deg: 10 },
                            {
                              duration: 0,
                              step: function(now) {
                                $(this).css({ transform: 'rotate(' + now + 'deg)' });
                              }
                            }
                );
                $(window).scroll( function(){
                    $('.hideme').each( function(i){     
                        var bottom_of_object = $(this).offset().top + $(this).outerHeight()/3;
                        var bottom_of_window = $(window).scrollTop() + $(window).height();
                        if( bottom_of_window > bottom_of_object ){
                          c=0;
                            $(this).animate({opacity:'1'},1000);
                            if(c==0){
                          $(this).children('.imgg').animate(
                            { deg: 0 },
                            {
                              duration: 1200,
                              step: function(now) {
                                $(this).css({ transform: 'rotate(' + now + 'deg)' });
                              }
                            }
                          );
                          c=1;
                         }
                        }
                    }); 
                });
              });
              function hello(){
                alert('hello');
              }