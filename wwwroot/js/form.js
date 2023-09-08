$(document).on("click",".form .send",function(){
	var load = true;
	$($(".load").get().reverse()).each(function(event){
		if(!$(this).val()){
			$(this).focus();
			load= false;
		}
	});
	name = $(".name").val();
	email = $(".email").val();
	mobile = $(".mobile").val();
	diachi = $(".diachi").val();
	noidung = $(".noidung").val();
	isurl = "module/form_lienhe/xuly.php";
	data = {"name":name,"email":email,"mobile":mobile,"diachi":diachi,"noidung":noidung};
	if(load==true){
		$.ajax({
			type: "POST",
			url:  isurl,
			data: data,
			cache: false,
			onloading: "",
			beforeSend: function(){
				$(".form .send").text("Đang gửi...");
			},
			success: function(data)
			{
				$(".form").html("<p>Đã gửi thông tin liên hệ thành công!</p>");
			},
			error: function(){
				console.log("Lỗi");
			}
		});
	}
});