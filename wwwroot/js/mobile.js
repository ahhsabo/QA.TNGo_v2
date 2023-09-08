var mobile = 0;
$(function () {
	if ($(window).width() <= 768) {
			$('nav#menu').mmenu({
offCanvas: {
       position  : "right"
    }
	}); 
	$('div.mm-panel').removeClass("categories");
		} });
$(document).ready(function(){
		
	$("body").append('<span class="backToTop">&nbsp</span>');
	var h = $(".menu-fixed .logo img").height();
	if($(window).width()<=768) mobile = 1;
     if($(window).scroll(function() {
		
		if($(this).scrollTop()>300) { $(".backToTop").fadeIn();
		if(mobile==1){
			$(".menu-fixed .logo img").height(0);
			$(".menu-fixed .logo").css("padding",0);
		}
		} else { $(".backToTop").fadeOut();
		if(mobile==1){ 
			 $(".menu-fixed .logo img").height(h);
			 $(".menu-fixed .logo").css("padding","10px 0");
		 }
		}
    }

    ), $(".backToTop").click(function() {
        return $("html, body").animate( {
            scrollTop: 0
        }

        , 1200),  !1
    }), $(window).width()<=768) {
       $(".slider-trangchu").css("margin-top",$(".menu-top").height());
		//sl ider
		sizeH2 = 62*($(window).width()/1366);
		sizeP = 42*($(window).width()/1366);
		$(".swiper-slide .content-slider").css("width","40%");
		$(".swiper-slide .content-slider h2").css("font-size",sizeH2+"px").css("padding","2px 0");
		$(".swiper-slide .content-slider h3").css("font-size",sizeH2+"px").css("padding","2px 0");
		$(".swiper-slide .content-slider p").css("font-size",sizeP+"px").css("line-height",sizeP+1+"px");
		$(".swiper-slide .content-slider p span").css("font-size",sizeP+"px");
		var clickMenu = 1;
		height = $(".logo").height();
		
		$(document).on("touchstart",".icon-menu",function(){
			$(".menu-fixed  ul.nav").css("top",height);
			if(clickMenu==1) {
				$(".menu-fixed ul.nav").show();
				clickMenu = 0;
			}	
				else {
					$(".menu-fixed ul.nav").hide();
					clickMenu = 1;	
				}
		});
	}
	 $(".search-form button").on("click",function(e) {
        $($(".search-form .batbuoc").get().reverse()).each(function() {
            if (!$(this).val()) {
                $(this).focus();
                e.preventDefault();
            }
        });
    });
	var mo=0;
	$(document).on("click",".icon-search",function(){
		if(mo==0) {
			$(".search-hidden").show();
			mo=1;
		} else {
			$(".search-hidden").hide();
			mo=0;
		}
	});
});