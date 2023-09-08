$(document).ready(function(){
	 $(".icon-cs").on("click",function(e){
  	e.preventDefault();
  	$(".overlay-cs").show();
  	$(".filter-box").addClass("active");
  	});
  	$(".overlay-cs").on("click",function(e){
  	e.preventDefault();
  	$(".overlay-cs").hide();
  	$(".filter-box").removeClass("active");
  });
  if($(".icon-cs").length > 0){
    $(window).on("scroll", function(e) {   
      var height = $(".icon-cs").height() + $(".content").offset().top;
      //console.log($(window).scrollTop(),height);
      if ($(window).scrollTop() > height) {
        $(".icon-cs").addClass("filter-fixed");
      } else {
        $(".icon-cs").removeClass("filter-fixed");
      }
    });
  }
  if($(".bootstrap-select").length > 0){
    setTimeout(function(){
      $(".bootstrap-select").each(function(){
        //console.log('a');
        $(this).find(".dropdown-menu.inner").append('<span class="done-dropdown">Xong</span>');
      });
    },300);
  }
});