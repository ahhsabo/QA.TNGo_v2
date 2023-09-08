
function initDatePicker(e, elmentControl) {
    if ($(e).length > 0) {
     
        $(e).datepicker({
            gotoCurrent: true,
            dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
            dateFormat: "d/m/yy",
        });
        $(e).val($.datepicker.formatDate('d/m/yy', new Date()));
        $("." + elmentControl + " .show-date .choose-date").text($.datepicker.formatDate('d/m/yy', new Date()));

        $("body").on("click", "." + elmentControl + " .show-date .next", function () {
            var currentDate = $(e).datepicker("getDate");
            currentDate.setDate(currentDate.getDate() + 1);
            $(e).datepicker("setDate", currentDate);
            $("." + elmentControl + " .show-date .choose-date").text($.datepicker.formatDate('d/m/yy', currentDate));
            var coSoYTeId = $("." + elmentControl + " [name='coSoYTeId']").val();
            var bacSiId = $("." + elmentControl + " [name='bacSiId']").val();
            var date = $.datepicker.formatDate('d/m/yy', currentDate);

            $.post("/CoSoYTeHome/SelectKhungGio", { coSoYTeId, bacSiId, date }, function (data) {
                $("." + elmentControl + " #bindCalenda").html(data)
            });
            
        });
        $("body").on("click", "." + elmentControl+ " .show-date .prev", function () {
            var currentDate = $(e).datepicker("getDate");
            currentDate.setDate(currentDate.getDate() - 1);
            $(e).datepicker("setDate", currentDate);
            $("." + elmentControl + " .show-date .choose-date").text($.datepicker.formatDate('d/m/yy', currentDate));

            var coSoYTeId = $("." + elmentControl + " [name='coSoYTeId']").val();
            var bacSiId = $("." + elmentControl + " [name='bacSiId']").val();
            var date = $.datepicker.formatDate('d/m/yy', currentDate);

            $.post("/CoSoYTeHome/SelectKhungGio", { coSoYTeId, bacSiId, date }, function (data) {
                $("." + elmentControl + " #bindCalenda").html(data)
            });
        })
    }
    $("." + elmentControl + " .time-wrap .item").on("click", function () {
        $(this).parent(".col-md-3").siblings(".col-md-3").find(".item").removeClass("active");
        $(this).toggleClass("active");
    })
}