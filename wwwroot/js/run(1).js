$(document).ready(function(){
	var swiper2 = new Swiper( '.doi-tac', {
		slidesPerView: 4,
		spaceBetween: 10,
		pagination: '.doi-tac .swiper-pagination',
		paginationClickable: true,
		loop:true,
		autoplayDisableOnInteraction: false,
		autoplay: {delay: 2500},
		navigation: {
			nextEl: '.doi-tac .swiper-button-next',
			prevEl: '.doi-tac .swiper-button-prev',
		  },
		breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 5
            }
        }
	});
	$(document).on("click","#hWrapperAuto .button-filter",function(){
		rel = $(this).attr("rel");
		$("#hWrapperAuto .button-filter").removeClass("active");
		$(this).addClass("active");
			if(rel=='all') $("#hWrapperAuto .swiper-wrapper .swiper-slide").show();
		else {
			$("#hWrapperAuto .swiper-wrapper .swiper-slide").hide();
			$("#hWrapperAuto .swiper-wrapper #"+rel).show();
		}
		swiper2.update();
	});
		if($(window).width()<768){
		option = "";
		$(".doitac-filter span.button-filter").each(function(){
			value = $(this).attr("rel");
			text = $(this).text();
			option = option + '<option value="'+value+'">'+text+'</option>';
		});
		html = '<select class="luachon-doitac">'+option+'</select>';
		$(".doitac-filter").html(html);
	}
	$(document).on("change",".luachon-doitac",function(){
    	rel = $(this).val();
		$("#hWrapperAuto .button-filter").removeClass("active");
		$(this).addClass("active");
			if(rel=='all') $("#hWrapperAuto .swiper-wrapper .swiper-slide").show();
		else {
			$("#hWrapperAuto .swiper-wrapper .swiper-slide").hide();
			$("#hWrapperAuto .swiper-wrapper #"+rel).show();
		}
		swiper2.update();
});
});
