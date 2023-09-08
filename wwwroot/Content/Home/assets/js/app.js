function resizePromote(){
	var height = $('.box-reason').outerHeight();
	var width_doc = $(document).width();
	if(width_doc>991){
		$('.why-choose-me .promote img').css('height',height);
	}
  else{
    $('.why-choose-me .promote img').css('height','unset');
  }
}
function resizeButtonHospital(){
	var height = $('.box-template.highlight-hospital .swiper-hospital .swiper-slide>img').height();
		$('.swiper-hospital .swiper-button-next').css('top',height/2);
		$('.swiper-hospital .swiper-button-prev').css('top',height/2);
}
function resizeButtonDiseases(){
  var height = $('.swiper-common-diseases .swiper-slide>img').height();
    $('.swiper-common-diseases .swiper-button-next').css('top',height/2);
    $('.swiper-common-diseases .swiper-button-prev').css('top',height/2);
}
function resizeAlbum(){
    var width_doc = $(document).width();
    var numberImg = $('.content .box-template.album-img .list-img a').length;
    for(var i=1; i<=numberImg;i++){
        $('.content .box-template.album-img .list-img a:nth-child('+i+')').addClass('read-more-target');
        $('.content .box-template.album-img .list-img a:nth-child('+i+')').removeClass('active');
        $('.content .box-template.album-img .list-img a:nth-child('+i+')').removeAttr("style");
    }
    $('.content .box-template.album-img button').removeClass('active');
    $('.content .box-template.album-img button').html('Xem thêm');


    if(width_doc>1199 && numberImg>10){
      for(var i=1; i<=10;i++){
        $('.content .box-template.album-img .list-img a:nth-child('+i+')').removeClass('read-more-target');
        $('.content .box-template.album-img button').show();
      }
    }
    if(width_doc>1199 && numberImg<=10){
      for(var i=1; i<=10;i++){
        $('.content .box-template.album-img .list-img a:nth-child('+i+')').removeClass('read-more-target');
      }
      $('.content .box-template.album-img button').hide();
    }

    if(width_doc<=1199 && width_doc>991 && numberImg>6){
      for(var i=1; i<=6;i++){
        $('.content .box-template.album-img .list-img a:nth-child('+i+')').removeClass('read-more-target');
        $('.content .box-template.album-img button').show();
      }
    }
    if(width_doc<=1199 && width_doc>991 && numberImg<=6){
      for(var i=1; i<=6;i++){
        $('.content .box-template.album-img .list-img a:nth-child('+i+')').removeClass('read-more-target');
      }
      $('.content .box-template.album-img button').hide();
    }

    if(width_doc<=991 && numberImg>4){
      for(var i=1; i<=4;i++){
        $('.content .box-template.album-img .list-img a:nth-child('+i+')').removeClass('read-more-target');
        $('.content .box-template.album-img button').show();
      }
    }
    if(width_doc<=991 && numberImg<=4){
      for(var i=1; i<=4;i++){
        $('.content .box-template.album-img .list-img a:nth-child('+i+')').removeClass('read-more-target');
      }
      $('.content .box-template.album-img button').hide();
    }
}

$(document).ready(function(){

	resizePromote();

	$('.bar').click(function(){
		$('.nav-side').toggleClass('active');
    $('body').addClass('open-navigation');
	});

  $('.overlay').click(function() {
      $('body').removeClass('open-navigation');
  });

  $('.close-nav').click(function() {
      $('body').removeClass('open-navigation');
  });
	

  $(document).mouseup(function (e){

    var container = $(".nav-side ul");

    if (!container.is(e.target) && container.has(e.target).length === 0 && $('.nav-side').hasClass('active')){

      $('.nav-side').toggleClass('active');
      
    }
  });
  
  $('.nav-info-img-cmt li').click(function(){
    var dataSection = $(this).attr('data-section');
    $('.nav-info-img-cmt li.active').toggleClass('active');
    $('.info-wall-field .book-calendar-call a:nth-child(1).active').toggleClass('active');
    $(this).toggleClass('active');
    $('.content-hospital-doctor.active').toggleClass('active');
    $('.content-hospital-doctor[data-section="'+dataSection+'"]').toggleClass('active');
  }); 

  $('.info-wall-field .book-calendar-call a:nth-child(1)').click(function(){
    var dataSection = $(this).attr('data-section');
    $('.nav-info-img-cmt li.active').toggleClass('active');
    $('.info-wall-field .book-calendar-call a:nth-child(1).active').toggleClass('active');
    $(this).toggleClass('active');
    $('.content-hospital-doctor.active').toggleClass('active');
    $('.content-hospital-doctor[data-section="'+dataSection+'"]').toggleClass('active');
  })

  $('.register-account .box-type-account').click(function(){
    var dataTypeRes = $(this).attr('data-type-res');
    $('.register-account .box-type-account.active').toggleClass('active');
    $(this).toggleClass('active');
    $('.form-register.active').toggleClass('active');
    $('.form-register[data-type-res="'+dataTypeRes+'"]').toggleClass('active');
  });

	$('button.read-more-trigger').click(function(){
		$(this).parent().find('.read-more-target').toggleClass('active');
		$(this).toggleClass('active');
		if($(this).parent().find('.read-more-target').hasClass('active')){
			$(this).parent().find('.read-more-target').show();
            $(this).html('Thu gọn');
		}else{
			$(this).parent().find('.read-more-target').hide();
			$(this).html('Xem thêm');
		}
	});

	$('label.star').click(function(){
		$(this).prev().prop("checked", true);
	})

	$('input[type=file]').change(function(){
		if($(this).val()){
			var file_name = $(this).val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
			$(this).parent().find('div').html(file_name);
		}
	})

  $('#datetimepicker3').datetimepicker({
    pickDate: false
  });  

  $('#datetimepicker2').datetimepicker({
    pickDate: false
  });

	$('#datetimepicker4').datetimepicker({
    pickTime: false
	});

  $('.checkbox-custom label').click(function(){
    var checkBoxes = $(this).parent().find('input');
    checkBoxes.prop("checked", !checkBoxes.prop("checked"));
  });
  if($(window).width() > 1024){
	var swiper = new Swiper('.swiper-common-diseases', {
      	slidesPerView: 5,
      	spaceBetween: 30,
      	navigation: {
        	nextEl: '.swiper-button-next',
        	prevEl: '.swiper-button-prev',
      	},
        breakpoints:{
          1199:{
            slidesPerView: 3
          },
          991:{
            slidesPerView: 3
          },
          767:{
            slidesPerView: 2
          },
          529:{
            slidesPerView: 1
          }
        }
    });
}
	var swiper = new Swiper('.swiper-promote', {
      	slidesPerView: 1,
      	spaceBetween: 30,
      	navigation: {
        	nextEl: '.swiper-button-next',
        	prevEl: '.swiper-button-prev',
      	},
    });
	var swiper = new Swiper('.swiper-hospital', {
      	slidesPerView: 4,
      	spaceBetween: 30,
      	navigation: {
        	nextEl: '.swiper-button-next',
        	prevEl: '.swiper-button-prev',
      	},
        pagination: {
          el: '.swiper-pagination',
        },
      	breakpoints:{
      		1199:{
      			slidesPerView: 3
      		},
      		768:{
      			slidesPerView: 2
      		},
      		450:{
      			slidesPerView: 1
      		}
      	}
    });
    var swiper = new Swiper('.swiper-prestigious-pharmacy', {
      	slidesPerView: 4,
      	slidesPerColumn: 2,
      	spaceBetween: 30,
      	navigation: {
        	nextEl: '.swiper-button-next',
        	prevEl: '.swiper-button-prev',
      	},
        breakpoints:{
          991:{
            slidesPerView: 3
          },
          767:{
            slidesPerView: 2
          }
        }
    });

    $(window).resize(function(){
    	resizePromote();
    	resizeButtonHospital();
      resizeButtonDiseases();
      resizeAlbum();
    });

    resizeButtonHospital();
    resizeButtonDiseases();
    resizeAlbum();

  $('[data-fancybox="images"]').fancybox({
    buttons : [ 
      'slideShow',
      'share',
      'zoom',
      'fullScreen',
      'close'
    ],
    thumbs : {
      autoStart : true
    }
  });
});