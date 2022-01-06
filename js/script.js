$(window).on("scroll", function() {
    $("header").toggleClass("active", $(this).scrollTop() > 0);
    $(".navbar-nav").toggleClass("active-bar", $(this).scrollTop() > 0);
  });
  if($(window).width()<974){
    $(".butt").toggleClass("nav-link");
    $(".butt").removeClass("butt");
}
function toggle(x) {
    x.classList.toggle("change");
}


