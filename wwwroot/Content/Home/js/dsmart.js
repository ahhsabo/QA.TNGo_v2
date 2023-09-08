$(document).ready(function(){
    $('.hospital').readmore({speed: 500});
    $("#doctor-01 .loadMore").on("click", function(){
        $(this).siblings('.list-hidden').slideDown();
        $(this).remove();
    });
    $("#doctor-02 .list-slide").owlCarousel({
        items:1,
        loop:true,
        margin: 0,
        autoplay: true,
        nav:false,
        dots: true,
        autoplayTimeout:4500,
        autoplayHoverPause:true,
    });
    $('.service-mng .scrollbar-inner').slimScroll({
          allowPageScroll: true,
      });
    $(".examination-schedule .detail").on("click", function(){
        $(this).parents('.examination-schedule').siblings('.examinations').slideDown();
        $(this).hide();
    });
    $(".examinations .close-bg").on("click", function(){
        $(this).parent('.examinations').slideUp();
        $('.examination-schedule .detail').show();
    });
    
});



function openPage(pageName,elmnt,color,callBack) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;

    if (callBack != null) {
        callBack()
    }
}
//if($('#defaultOpen').length > 0) {
//  document.getElementById("defaultOpen").click();
//}


function onYeuThich(objectId, type,e) {
    $.post('/AccountHome/AddYeuThich', { objectId, type }, function (data) {
        if (data) {
            $(e).html('<img src="/Content/Home/assets/images/icon/vima-13.png">').removeAttr("onclick").attr("onclick", "onRemoveYeuThich(" + objectId + "," + type +",this)");
        }
    });
}
function onRemoveYeuThich(objectId, type,e) {
    $.post('/AccountHome/RemoveYeuThich', { objectId, type }, function (data) {
        if (data) {
            $(e).html('<img src="/Content/Home/assets/images/icon/vima-01.png">').removeAttr("onclick").attr("onclick", "onYeuThich(" + objectId + "," + type + ",this)");
        }
    });
}

