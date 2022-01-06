$(window).on("load",function(){
    $("#title").addClass("animated tdStampIn");
    setTimeout(function(){
        
        $("#description").addClass("animated tdStampIn");
      }, 750);
    setTimeout(function(){
        $("#order-btn").addClass("visible");
      }, 1500);
})
var scrollFeatures = $("#features-block").offset().top - $(window).height();
var scrollIntro = $("#intro2").offset().top - $(window).height()+300;
$(window).scroll(function(){
    var winScrollTop = $(this).scrollTop();
    if(winScrollTop > $("#features-block").offset().top - $(window).height()-100){
        setTimeout(function(){$("#features-title").addClass("animated tdHingeFlipIn");}, 100);
    }
    if(winScrollTop > $("#features-block").offset().top - $(window).height()+100){
        setTimeout(function(){$("#features-block").addClass("animated tdExpandIn");}, 100);
    }
    if(winScrollTop > $("#intro2").offset().top - $(window).height()+300){
        setTimeout(function(){$("#intro2-title").addClass("animated tdStampIn");}, 100);  
    }
    if(winScrollTop > $("#intro2").offset().top - $(window).height()+400){
        setTimeout(function(){$("#intro2-text1").addClass("animated tdShrinkIn");}, 100);
        setTimeout(function(){$("#intro2-text2").addClass("animated tdShrinkIn");}, 400);
    }
    if(winScrollTop > $("#plans-block").offset().top - $(window).height()-50){
        setTimeout(function(){$("#plans-title").addClass("animated tdHingeFlipIn");}, 100);
    }
    if(winScrollTop > $("#plans-block").offset().top - $(window).height()+100){
        setTimeout(function(){$("#plans-block").addClass("animated tdExpandIn");}, 100);
    }
    if(winScrollTop > $("#airport").offset().top - $(window).height()+100){
        setTimeout(function(){$("#airport-title").addClass("animated tdShrinkIn");}, 100);
    }
    if(winScrollTop > $("#airport").offset().top - $(window).height()+250){
        setTimeout(function(){$("#airport-text").addClass("animated tdShrinkIn");}, 200);
        setTimeout(function(){$("#airport-btn").addClass("visible");}, 500);
    }
    if(winScrollTop > $("#contacts-block").offset().top - $(window).height()){
        $("#order-btn").addClass("visible");
        setTimeout(function(){$("#contacts-title").addClass("animated tdHingeFlipIn");}, 100);
    }
    if(winScrollTop > $("#contacts-block").offset().top - $(window).height()+100){
        setTimeout(function(){$("#contacts-map").addClass("animated tdExpandIn");}, 100);
        setTimeout(function(){$("#contacts-phone").addClass("animated tdExpandIn");}, 500);
    }
});