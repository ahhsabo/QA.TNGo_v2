
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
//var data = []; var map = null; var xuly = null; var markers = [];
//initMap();
//function initMap() {
//    var directionsDisplay; var origin = { lat: parseFloat("10.779374"), lng: parseFloat("106.6752016") }
//    var initScript = function () {
//        directionsDisplay = new google.maps.DirectionsRenderer;
//        var mapDiv = document.getElementById('MapViewer');
//        map = new google.maps.Map(mapDiv, { center: origin, zoom: 14, gestureHandling: 'greedy', fullscreenControl: true, mapTypeControl: true, mapTypeControlOptions: { position: google.maps.ControlPosition.RIGHT_TOP } });
//        //google.maps.event.addDomListener(window, 'load', setMarkers);
//    }
//    var keyIndex = 0;
//    if (typeof (google) === "undefined") {
//        $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBR4o4qRfqrF3BXbNS-U5CbPrY-kdGZvMI&libraries=places,geometry", function () { initScript(); });
//    }
//    else { initScript(); }
//};
//var firsLatLng = new google.maps.LatLng(10.823418, 106.628370);
// v 1.0
var defaultLatLng = { lat: 21.0277644, lng: 105.83415979999995 };
var thisController = GetControllerByUrl(window.location.pathname);
(function ($) {
    $.queryString = (function (paramsArray) {
        let params = {};
        for (let i = 0; i < paramsArray.length; ++i) {
            let param = paramsArray[i]
                .split('=', 2);
            if (param.length !== 2)
                continue;
            params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
        }
        return params;
    })(window.location.search.substr(1).split('&'));
    alertify.set('notifier', 'position', 'top-right');
    initMenuAdmin();
    initScrollBody();
})(jQuery);

function initMenuAdmin() {
    $("#menuleftadmin li").each(function (i, item) {
        if (thisController != "") {
            var thisa = $(item).find(">a");
            if (thisController == GetControllerByUrl(thisa.attr("href"))) {
                if ($(item).hasClass("cap2")) {
                    $(item).addClass("active");
                    thisa.closest("li>ul").closest("li").addClass("active");
                }
                else {
                    $(item).addClass("active");
                }
                return;
            }
        }
        else {
            $(".isDasb").addClass("active");
            return;
        }
    });
}

function GetControllerByUrl(url) {
    if (url == null) {
        return "";
    }
    var arrpa = url.split('/');
    if (arrpa.length >= 4) {
        return arrpa[3];
    }
    return "";
}



function bindLoading(tag) {
    var $loading = $(tag).waitMe({
        effect: "ios",
        text: '',
        bg: 'rgba(51, 51, 51, 0.01)',
        color: '#555'
    });
    return $loading;
}

function bindNumRow(tag, page, totalrows, limit) {
    var totalPage = (totalrows % limit) > 0 ? (Math.floor((totalrows / limit)) + 1) : Math.floor(totalrows / limit);
    $(tag).html("Bản ghi từ " + (page == 1 ? 1 : ((page - 1) * limit)) + " - " + (totalPage == page ? totalrows : (page * limit)) + " trong tổng " + totalrows + " bản ghi (trang " + page + "/" + totalPage + ")");
}

function bindPagination(tag, funtion, page, totalrows, limit) {
    var phandem = 2;
    var isBack = false, isNext = false;
    var totalPage = (totalrows % limit) > 0 ? (Math.floor((totalrows / limit)) + 1) : Math.floor(totalrows / limit);

    if (page > 1 && page <= totalPage) {
        isBack = true;
    }
    if (page > 1) {
        isBack = true;
    }
    if (page < totalPage) {
        isNext = true;
    }
    var str1 =
        `
                                     <ul class="pagination">
                                        <li class="`+ ((totalPage >= 1 && page != 1) ? "" : "disabled") + `">
                                              <a title='Trang đầu tiên' `+ ((totalPage >= 1 && page != 1) ? "onclick='" + funtion + "(1)'" : "") + ` href="javascript:void(0);">
                                                 <i class="material-icons">first_page</i>
                                              </a>
                                         </li>
                                         <li class="`+ (isBack == true ? "" : "disabled") + `">
                                              <a title='Quay lại trang' class='fixpage'`+ (isBack == false ? "" : "onclick='" + funtion + "(" + (page - 1) + ")'") + ` href="javascript:void(0);">
                                                 <i class="material-icons">chevron_left</i>
                                              </a>
                                         </li>
                                `;
    var str2 = `
                                         <li class="`+ (isNext == true ? "" : "disabled") + `">
                                              <a  title='Trang tiếp theo' class='fixpage' `+ (isNext == false ? "" : "onclick='" + funtion + "(" + (parseFloat(page) + 1) + ")'") + ` href="javascript:void(0);" class="waves-effect">
                                                 <i class="material-icons">chevron_right</i>
                                              </a>
                                         </li>
                                        <li class="`+ ((totalPage > page) ? "" : "disabled") + `">
                                              <a title='Trang cuối' `+ ((totalPage > page) ? "onclick='" + funtion + "(" + totalPage + ")'" : "") + ` href="javascript:void(0);" class="waves-effect">
                                                 <i class="material-icons">last_page</i>
                                              </a>
                                         </li>
                                     </ul>
                                `;
    var str3 = ``;
    if (totalPage >= 15) {
        for (i = 1; i <= totalPage; i++) {
            //if () {
            //    str3 += `<li class="` + (page == i ? "active" : "") + `"><a  onclick='` + funtion + `(` + i + `)' href="javascript:void(0);">` + i + `</a></li>`;
            //}
            if ((i <= phandem) || (((i - phandem)) <= page && ((i + phandem + 1)) > page) || (i >= (totalPage - phandem))) {
                str3 += `<li class="` + (page == i ? "active" : "") + `"><a  onclick='` + funtion + `(` + i + `)' href="javascript:void(0);">` + i + `</a></li>`;
            }
        }
    }
    else {
        for (i = 1; i <= totalPage; i++) {
            str3 += `<li class="` + (page == i ? "active" : "") + `"><a  onclick='` + funtion + `(` + i + `)' href="javascript:void(0);">` + i + `</a></li>`;
        }
    }
    $(tag).html(str1 + str3 + str2);
}

function jsonToQueryString(json) {
    return '?' +
        Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

function changeUrl(data) {
    window.history.pushState('page2', 'Title', jsonToQueryString(data));
}

function onCheckAll(e, tag) {
    $(tag).find("input[type='checkbox']").prop("checked", $(e).prop("checked"))
}

$('.modal').on('hidden.bs.modal', function (e) {
    $(this).removeData();
});

function imgAvatarError(image) {
    image.onerror = "";
    image.src = "/Content/Admin/images/no-avatar.jpg";
    return true;
}

function getBool(val) {
    return !!JSON.parse(String(val).toLowerCase());
}

function getQueryString(isFirst, qr, input) {
    return (isFirst && qr != null) ? qr : input
}

function logout() {
    $("#formLogout").submit();
}

function initScrollBody() {
    var viewportHeight = $(window).height();
    $('#body').slimScroll({
        height: viewportHeight + 'px',
        color: '#455A64',
        distance: '0',
        allowPageScroll: true,
        alwaysVisible: true,
        animate: true
    });
}

function checkProperty(obj, name, valDefault) {
    if (Object.prototype.hasOwnProperty.call(obj, name)) {
        obj[name] = valDefault;
    }
    else {
        obj[name] = valDefault;
    }
}
// v 3.1
$.fn.initPopup = function (setting = {}) {
    var myModal = "#myModal";
    setting.form = setting.form == undefined ? "[form-edit]" : setting.form;
    if (setting.target != undefined || setting.target != null) {
        myModal = setting.target;
    }
    $(myModal).modal({ backdrop: 'static', keyboard: false });
    $(myModal + ">div>div.modal-content").html("<div class='modalLoadding'><i class='material-icons icon-spin'>data_usage</i><span>Đang xử lý...</span></div>");
    $.get(setting.action, function (data) {
        $(myModal + ">div>div.modal-content").html(data);
        var $form = $(myModal + " " + setting.form);
        try {
            // Unbind existing validation
            $form.unbind();
            $form.data("validator", null);
            // Check document for changes
            $.validator.unobtrusive.parse(document);
            // Re add validation with changes
            $form.validate($form.data("unobtrusiveValidation").options);
            $.AdminBSB.select.activate();
            $(myModal).modal('show');
        } catch (e) {
            console.log(e);
        }
  
    });
}

$.fn.toPopup = function () {
    $(document).on("click", $(this).selector, function (e) {
        var $this = $(this);
        var form = $this.attr("data-form") == undefined ? "[form-edit]" : $this.attr("data-form");
        e.preventDefault();

        var myModal = "#myModal";
        if ($(this).attr('data-target') != undefined || $(this).attr('data-target') != null) {
            myModal = $(this).attr('data-target');
        }
        $(myModal).modal({ backdrop: 'static', keyboard: false });
        $(myModal + ">div>div.modal-content").html("<div class='modalLoadding'><i class='material-icons icon-spin'>data_usage</i><span>Đang xử lý...</span></div><div class='bind-data' style='display:none;'></div>");
        $.get($(this).attr("href"), function (data) {

            $(myModal + ">div>div.modal-content .bind-data").html(data);
            var $form = $(myModal + " " + form);
            try {
                // Unbind existing validation
                $form.unbind();
                $form.data("validator", null);
                // Check document for changes
                $.validator.unobtrusive.parse(document);
                // Re add validation with changes
                $form.validate($form.data("unobtrusiveValidation").options);

            } catch (e) {
                console.log(e);
            }
            $.AdminBSB.select.activate();
            $(myModal + ">div>div.modal-content .modalLoadding").hide();
            $(myModal + ">div>div.modal-content .bind-data").show();
        });
    });
}

$.fn.toSubmit = function (callBackSubmitEnd, callBackSubmit, callbackFirst) {
    $(document).on("click", $(this).selector, function () {
        var isValidate = true;
        var isPending = true;
        var strNotifire = "";
        var form = $(this).attr("data-form") == undefined ? "[form-edit]" : $(this).attr("data-form");
        var type = $(this).attr("data-type");
        var $this = $(this);
        if (callbackFirst != null) {
            callbackFirst(type);
        }
        $(form).each(function (i, item) {
            if (!$(item).valid()) {
                isValidate = false;
                var abv = $(item).find(".validation-summary-errors").html();
                strNotifire = strNotifire + abv;
            }
        });
        $this.find(".waves-ripple").remove();
        if (isValidate) {
            $this.button('loading');
            $.ajax({
                type: "POST",
                url: $(form).attr("action"),
                data: $(form).serialize(),
                headers:
                {
                    "RequestVerificationToken": $(form).find("input[name='__RequestVerificationToken']").val()
                },
                success: function (rs) {

                    if (callBackSubmit != null) {
                        callBackSubmit(rs, $thisButtonSubmit, type);
                    }
                    else {
                        setTimeout(function () {
                            $this.button('reset');
                            alertify.notify(rs.message, rs.type, 5);
                            if (rs.isRedirect) {
                                setTimeout(function () {
                                    window.location.href = rs.redirectUrl;
                                }, 1000);
                            }
                            else if (rs.isClosePopup) {
                                $this.parents(".modal-content").find(".close").click();
                            }
                            if (callBackSubmitEnd != null) {
                                callBackSubmitEnd(rs, $this, type);
                            }
                            else {
                                reGetDataGrid();
                            }
                        }, 200);
                    }
                },
                error: function () {
                    alert("Vui lòng F5 trình duyệt rồi thử lại!");
                },
                complete: function (jqxhr, txt_status) {
                    if (jqxhr.status == 502) {
                        alertify.notify("Phiên làm việc đã kết thúc F5 trình duyệt rồi thử lại.", "warning", 5);
                    }
                }
            });
        }
        else {
            alertify.notify($(form).find(".validation-summary-errors").html(), "warning", 5);

        }
    });
};

$.fn.toGridView = function (isFirst, page, callBackEndDefail = null, callBackGetValue = null, callBackSetValue = null, callbackSelectAction = null, callBack = null) {

    var $parent = $($(this).selector);
    var setting_url = $(this).attr("data-url") == undefined ? "/" : $(this).attr("data-url");
    var setting_checkbox = $(this).attr("data-select-all") == undefined ? false : $(this).attr("data-select-all");


    var setting_isChangeUrl = $(this).attr("data-ischangeurl") == undefined ? "true" : $(this).attr("data-ischangeurl");
    var setting_method = $(this).attr("data-method") == undefined ? "POST" : $(this).attr("data-method");
    var setting_tagData = $(this).attr("data-tag-bind") == undefined ? "[grid-data]" : $(this).attr("data-tag-bind");
    var setting_tagCheckAll = $(this).attr("data-tag-check-all") == undefined ? "[grid-check-all]" : $(this).attr("data-tag-check-all");

    var setting_tagInput = $(this).attr("data-tag-input") == undefined ? "[grid-input]" : $(this).attr("data-tag-input");

    var setting_tagLoading = $(this).attr("data-tag-loading") == undefined ? "[grid-loading]" : $(this).attr("data-tag-loading");
    var setting_customFuntionName = $(this).attr("data-funtion") == undefined ? "getDataGrid" : $(this).attr("data-funtion");
    var setting_tagPagination = $(this).attr("data-pagination") == undefined ? "[grid-pagination]" : $(this).attr("data-pagination");
    var setting_tagNumRow = $(this).attr("data-num-row") == undefined ? "[grid-num-row]" : $(this).attr("data-num-row");
    var $loading = bindLoading($parent.find(setting_tagLoading));

    $parent.find("[search-close]").click();
    ////Get inputSearch name .inputSearch
    var $data = {};
    $data.page = getQueryString(isFirst, $.queryString.page, page);
    var $inputText = $parent.find("input" + setting_tagInput + "[type=text], input" + setting_tagInput + "[type=number], input" + setting_tagInput + "[type=date], input" + setting_tagInput + "[type=datetime], input" + setting_tagInput + "[type=hidden]");
    $inputText.each(function (i, item) {
        var thisitem = $(item);
        var nameItem = thisitem.attr("name");
        if (nameItem != undefined && nameItem != null && nameItem != '') {
            $data[nameItem] = getQueryString(isFirst, $.queryString[nameItem], thisitem.val());
        }
    });

    // CheckBoxInput
    var $inputCheckBox = $parent.find("input" + setting_tagInput + "[type='checkbox']");
    $inputCheckBox.each(function (i, item) {
        var thisitem = $(item);
        var nameItem = thisitem.attr("name");
        if (nameItem != undefined && nameItem != null && nameItem != '') {
            $data[nameItem] = getQueryString(isFirst, $.queryString[nameItem], thisitem.is(":checked"));
        }
    });

    // CheckBoxInput
    var $inputRadio = $parent.find("input" + setting_tagInput + "[type='radio']:checked");
    $inputRadio.each(function (i, item) {
        var thisitem = $(item);
        var nameItem = thisitem.attr("name");
        if (nameItem != undefined && nameItem != null && nameItem != '') {
            $data[nameItem] = getQueryString(isFirst, $.queryString[nameItem], thisitem.val());
        }
    });

    // Select
    var $selectInput = $parent.find("select" + setting_tagInput);
    $selectInput.each(function (i, item) {
        var thisitem = $(item);
        var nameItem = thisitem.attr("name");
        if (nameItem != undefined && nameItem != null && nameItem != '') {
            $data[nameItem] = getQueryString(isFirst, $.queryString[nameItem], thisitem.val());
        }
    });

    if (callBackGetValue != null) {
        $data = callBackGetValue($data);
    }

    if (!isFirst && setting_isChangeUrl == "true") {
        changeUrl($data);
    }
    else {
        // Text
        var $inputText = $parent.find("input" + setting_tagInput + "[type=text], input" + setting_tagInput + "[type=number], input" + setting_tagInput + "[type=date], input" + setting_tagInput + "[type=datetime]");
        $inputText.each(function (i, item) {
            $(item).val($data[$(item).attr("name")]);
        });
        // CheckBoxInput
        var $inputCheckBox = $parent.find("input" + setting_tagInput + "[type='checkbox']");
        $inputCheckBox.each(function (i, item) {
            $(item).prop('checked', getBool($data[$(item).attr("name")]));
        });
        // Select
        var $selectInput = $parent.find("select" + setting_tagInput);
        $selectInput.each(function (i, item) {
            $(item).val($data[$(item).attr("name")]).selectpicker('refresh');
        });
        if (callBackSetValue != null) {
            callBackSetValue($data);
        }
    }
    $($parent.find(setting_tagCheckAll)).prop("checked", false);

    if (setting_checkbox) {
        $parent.append("<input type='hidden' grid-list-item value=''/>")
        $parent.find("[grid-check-all]").on("click", function () {

            $parent.find("[grid-item-check]").prop("checked", $(this).prop("checked"));
            var listValue = "0";
            $parent.find("[grid-item-check]").each(function (i, item) {
                if ($(item).prop("checked")) {
                    listValue = listValue + "," + $(item).attr("data-id")
                }
            });
            $parent.find("[grid-list-item]").val(listValue);
        });
        if (callbackSelectAction != null) {
            $parent.find("[grid-select-action]").find("a").on("click", function () {
                callbackSelectAction($(this).attr("data-type"), $parent.find("[grid-list-item]").val());
            });
        }
    }
    $.ajax({
        method: setting_method,
        url: setting_url,
        data: $data
    }).done(function (rp, statusText, xhdr) {
        if (callBack == null) {
            $parent.find(setting_tagData).hide().html(rp);
            // CheckAll
            if (setting_checkbox) {
                $parent.find("[grid-item-check]").on("change", function (e) {
                    if ($(this).prop("checked") == false) {
                        $parent.find("[grid-check-all]").prop("checked", false);
                    }
                    else {
                        var allCheck = true
                        $parent.find("[grid-item-check]").each(function (i, item) {
                            if ($(item).prop("checked") == false) {
                                allCheck = false;
                            }
                        });
                        $parent.find("[grid-check-all]").prop("checked", allCheck);
                    }
                    var listValue = "0";
                    $parent.find("[grid-item-check]").each(function (i, item) {
                        if ($(item).prop("checked")) {
                            listValue = listValue + "," + $(item).attr("data-id")
                        }
                    });
                    $parent.find("[grid-list-item]").val(listValue);
                });
            }
            var _page = $parent.find("input[grid-data-page]").val();
            var _totalrows = $parent.find("input[grid-data-totalrows]").val();
            var _limit = $parent.find("input[grid-data-limit]").val();
            bindPagination($parent.find(setting_tagPagination), setting_customFuntionName, _page, _totalrows, _limit);
            bindNumRow($parent.find(setting_tagNumRow), _page, _totalrows, _limit);
            if (callBackEndDefail != null) {
                callBackEndDefail($data);
            }
            $parent.find(setting_tagData).show();
        }
        else {
            callBack(isFirst, page, $data);
        }
        $loading.waitMe('hide');
    }).fail(function (xhdr, statusText, errorText) {

    });
}

$.fn.toDelete = function (callBackEnd = null, callBack = null) {
    $(document).on("click", $(this).selector, function () {
        var $this = $(this);
        var form = $this.attr("data-form") == undefined ? "[form-edit]" : $this.attr("data-form");
        var type = $this.attr("data-form-type") == undefined ? "popup" : $this.attr("data-form-type");
        var title = $this.attr("data-title") == undefined ? "Bạn có muốn thực hiện chức năng này?" : $this.attr("data-title");
        var text = $this.attr("data-text") == undefined ? "Nếu bạn thực hiện, dữ liệu này sẽ bị xóa vĩnh viên, bạn có muốn tiếp tục?" : $this.attr("data-text");
        var buttonText = $this.attr("data-button-text") == undefined ? "Đồng ý, xóa bản ghi này!" : $this.attr("data-button-text");
        var buttonType = $(this).attr("data-type");

        swal({
            title: title,
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: buttonText,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            $this.button('loading');
            $.ajax({
                type: "POST",
                url: $this.attr("data-action"),
                data: [],
                headers:
                {
                    "RequestVerificationToken": $(form).find("input[name='__RequestVerificationToken']").val()
                },
                success: function (rs) {
                    if (callBack != null) {
                        callBack(rs, $this);
                    }
                    else {
                        var returnurl = $this.attr("data-return-url");
                        setTimeout(function () {
                            if (rs.isUse) {
                                swal({
                                    title: "Xóa dữ liệu thất bại!",
                                    text: rs.message,
                                    type: "warning",
                                    confirmButtonText: "Đóng!"
                                });
                            }
                            else {
                                if (rs.output == 1) {

                                    if (type == "popup") {
                                        swal({
                                            title: "Thành công!",
                                            text: rs.message,
                                            type: rs.type,
                                            confirmButtonText: "Đóng!"
                                        },
                                            function () {
                                                if (rs.isClosePopup) {
                                                    $(form + " .close").click();
                                                }
                                                if (callBackEnd == null) {
                                                    reGetDataGrid();
                                                }
                                                else {
                                                    callBackEnd(rs, $this, returnurl, buttonType);
                                                }
                                            });
                                    }
                                    else {
                                        if (callBackEnd == null) {
                                            swal({
                                                title: "Thành công!",
                                                text: rs.message,
                                                type: "success",
                                                confirmButtonText: "Quay lại ngay!"
                                            },
                                                function () {
                                                    window.location.href = rs.redirectUrl;
                                                });
                                        }
                                        else {
                                            callBackEnd(rs, $this, returnurl, buttonType);
                                        }
                                    }
                                }
                                else {
                                    swal({
                                        title: "Thông báo!",
                                        text: rs.message,
                                        type: rs.type,
                                        confirmButtonText: "Đóng!"
                                    });
                                }
                            }
                            $this.button('reset');
                        }, 300);
                    }
                },
                error: function () {
                    alert("Vui lòng F5 trình duyệt rồi thử lại!");
                },
                complete: function (jqxhr, txt_status) {
                    if (jqxhr.status == 502) {
                        alertify.notify("Phiên làm việc đã kết thúc F5 trình duyệt rồi thử lại.", "warning", 5);
                    }
                }
            });
        });
    });
}

$.fn.toSearch = function () {
    var $this = $(this);
    var $thisParent = $($this.selector);
    $thisParent.find("[search-menu]").on("click", function () {
        if ($thisParent.find("[search-form]").hasClass("open")) {
            $thisParent.find("[search-form]").removeClass("open");
            $thisParent.find("[search-form]").fadeOut(300);
            $(this).html("<i class='material-icons'>keyboard_arrow_down</i>");
        }
        else {
            $thisParent.find("[search-form]").addClass("open");
            $thisParent.find("[search-form]").fadeIn(300);
            $(this).html("<i class='material-icons'>keyboard_arrow_up</i>");
        }
    });
    $thisParent.find("[search-close]").on("click", function () {
        if ($thisParent.find("[search-form]").hasClass("open")) {
            $thisParent.find("[search-form]").fadeOut(300);
            $thisParent.find("[search-form]").removeClass("open");
            $thisParent.find("[search-menu]").html("<i class='material-icons'>keyboard_arrow_down</i>");
        }
    });

}

function removeFileUpload(e) {
    var $this = $(e);
    var parentInput = $this.parents("[file-parent]");
    var url = parentInput.find("[data-input-form]").val();
    $this.find(".waves-ripple").remove();
    parentInput.find("[file-input]").val(null);
    url = $this.attr("data-action") + "?pathFile=" + encodeURIComponent(url);
    $this.button('loading');
    $.ajax({
        type: "POST",
        url: url,
        success: function (rs) {
            alertify.notify(rs.message, rs.type, 5);
            parentInput.find("[file-button-remove]").addClass("hide");
            parentInput.find("[file-button-download]").addClass("hide");
            parentInput.find("[file-image]").attr("src", "/Content/Admin/images/noImage.jpg");
            parentInput.find("[data-input-form]").val("");
            parentInput.find("[file-name]").html("<strong>Đường dẫn file:</strong> Chưa có file nào");
            $this.button('reset');
        },
        error: function () {
            $this.button('reset');
            alert("Vui lòng F5 trình duyệt rồi thử lại!");
        },
        complete: function (jqxhr, txt_status) {
            if (jqxhr.status == 502) {
                $this.button('reset');
                alertify.notify("Phiên làm việc đã kết thúc F5 trình duyệt rồi thử lại.", "warning", 5);
            }
        }
    });
}

$.fn.toUploadFile = function (callBack = null) {

    $(document).on("change", "[file-input]", function () {

        var thisInput = $(this);
        var fileUpload = $(this)[0];
        var parentInput = $(this).parents("[file-parent]");
        var form = $(thisInput.attr("data-form"));
        var type = thisInput.attr("data-type") == undefined ? "image" : thisInput.attr("data-type");
        var fileExtention = thisInput.attr("data-extention").split(",");
        var fileMaxSize = thisInput.attr("data-max-size");

        var $loading = bindLoading(parentInput.find("[file-loadding]"));
        var thisbutton = thisInput.parents("[file-parent]").find("[file-button]");

        thisbutton.button('loading');
        thisbutton.prop("disable", true);

        if (thisInput.attr("multiple") != undefined) {

        }
        else {
            // Check type
            var fileType = "." + fileUpload.files[0].name.split(".")[1];
            var fileSize = fileUpload.files[0].size;

            if (fileSize > fileMaxSize) {
                alertify.notify("File tải lên vượt qua độ lớn cho phép, file lớn nhất có thể tải lên là " + (fileMaxSize / 1024 / 1024) + " MB", "warning", 5);
                $loading.waitMe('hide');
                thisbutton.button('reset');
                thisbutton.prop("disable", false);
                return;
            }

            if (fileExtention.indexOf(fileType) == -1) {
                alertify.notify("Chỉ hỗ trợ tải lên định dạng file " + thisInput.attr("data-extention"), "warning", 5);
                $loading.waitMe('hide');
                thisbutton.button('reset');
                thisbutton.prop("disable", false);
                return;
            }
        }
        parentInput.find("[file-button-cancel]").removeClass("hide");

        for (var i = 0; i < fileUpload.files.length; i++) {
            uploadFile($(this).attr("data-url"), fileUpload.files[i], i, parentInput.find("[progress-group]")[0], (thisInput.attr("multiple") == undefined ? false : true), function (rs) {
                if (callBack == null) {
                    if (rs != null) {
                        setTimeout(function () {
                            if (rs.output == 1) {
                                if (type == "image") {
                                    var newSrc = rs.data + "?v=" + Math.random();
                                    parentInput.find("[file-image]").attr("src", newSrc);
                                    parentInput.find("[data-input-form]").val(rs.data);
                                }
                                else {
                                    parentInput.find("[data-input-form]").val(rs.data);
                                }
                                parentInput.find("[file-name]").html("<strong>Đường dẫn file:</strong> <a target='_blank' href='" + rs.data + "'>" + rs.data + "</a>");
                                //  parentInput.find("[file-name]").html(rs.data.split(/(\\|\/)/g).pop());
                                parentInput.find("[file-button-remove]").removeClass("hide");
                                parentInput.find("[file-button-download]").removeClass("hide");
                            }
                            parentInput.find("[file-button-download]").attr("href", "/Admin/Base/Functions/Download?filePath=" + encodeURIComponent(rs.data));
                            $loading.waitMe('hide');
                            thisbutton.button('reset');
                            thisbutton.prop("disable", false);
                            parentInput.find("[file-button-cancel]").addClass("hide");
                        }, 300);
                    }
                    else {
                        $loading.waitMe('hide');
                        thisbutton.button('reset');
                        thisbutton.prop("disable", false);
                        parentInput.find("[file-button-cancel]").addClass("hide");
                    }
                }
                else {
                    callBack(rs, thisInput, $loading, parentInput);
                }
            });
        }
    });

    $(document).on("click", "[file-button]", function () {
        var $this = $(this);
        $this.parents("[file-parent]").find("[file-input]")[0].click();
    });
}

$.fn.toStaticForm = function (callback) {
    var btnName = $(this).selector;
    $(document).on("click", btnName, function (e) {
        e.preventDefault();
        var $this = $(this);
        var parent = $this.attr("data-parent") == undefined ? "[form-static]" : $this.attr("data-parent");
        var form = $this.attr("data-form") == undefined ? "form" : $this.attr("data-form");
        var loading = $this.attr("data-loading") == undefined ? "[form-loading]" : $this.attr("data-loading");
        var tagShow = $this.attr("data-show") == undefined ? "[form-show]" : $this.attr("data-show");

        var $loading = bindLoading($(parent).find(loading));
        $.get($(this).attr("href"), function (data) {
            $(parent).find(tagShow).html(data);
            var $form = $(parent).find(form);
            try {
                // Unbind existing validation
                $form.unbind();
                $form.data("validator", null);
                // Check document for changes
                $.validator.unobtrusive.parse(document);
                // Re add validation with changes
                $form.validate($form.data("unobtrusiveValidation").options);
                $.AdminBSB.select.activate();
                $loading.waitMe('hide');
                if (callback != null) {
                    callback($this);
                }
            } catch (e) {
                console.log(e);
                $loading.waitMe('hide');
            }
        });
    });
}

$.fn.toPost = function (callBack = null, callBackData = null) {
    $(document).on("click", $(this).selector, function () {
        var $this = $(this);
        var title = $this.attr("data-title") == undefined ? "Thông báo" : $this.attr("data-title");
        var type = $this.attr("data-type") == undefined ? "warning" : $this.attr("data-type");
        var text = $this.attr("data-text") == undefined ? "Bạn có muốn thực hiện chức năng này?" : $this.attr("data-text");
        var buttonText = $this.attr("data-button-text") == undefined ? "Đồng ý!" : $this.attr("data-button-text");
        var datax = {};
        if (callBackData != null) {
            datax = callBackData({});
        }
        swal({
            title: title,
            text: text,
            type: type,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: buttonText,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            $this.button('loading');

            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                url: $this.attr("data-action"),
                data: JSON.stringify(datax),
                processData: false,
                success: function (rs) {
                    if (callBack != null) {
                        callBack(rs, $this);
                    }
                    else {
                        swal({
                            title: "Thông báo!",
                            text: rs.message,
                            type: rs.type,
                            confirmButtonText: "Đóng!"
                        });
                        setTimeout(function () {
                            $this.button('reset');
                        }, 300);
                    }
                },
                error: function (e) {
                    console.log(e);
                    alert("Vui lòng F5 trình duyệt rồi thử lại!");
                },
                complete: function (jqxhr, txt_status) {
                    if (jqxhr.status == 502) {
                        alertify.notify("Phiên làm việc đã kết thúc F5 trình duyệt rồi thử lại.", "warning", 5);
                    }
                }
            });
        });
    });
}

$.fn.toSelectAutocomplete = function (data, callBackData) {
    var setting_top = $(this).attr("data-top") == 10 ? "[list-loading]" : $(this).attr("data-top");
    var setting_label = $(this).attr("data-label") == 10 ? "[Chọn và bắt đầu]" : $(this).attr("data-label");

    data = {
        q: '{{{q}}}',
        top: setting_top
    };
    if (callBackData != null) {
        data = callBackData(data);
    }
    var options = {
        ajax: {
            url: $(this).attr("data-action"),
            type: 'POST',
            dataType: 'json',
            data: callBackData != null ? callBackData(data) : data
        },
        locale: {
            emptyTitle: setting_label
        },
        log: 0,
        cache: false,
        preprocessData: function (data) {
            var i, l = data.length, array = [];
            if (l) {
                for (i = 0; i < l; i++) {
                    array.push($.extend(true, data[i], {
                        text: data[i].businessName,
                        value: data[i].id,
                        data: {
                            subtext: data[i].businessName
                        }
                    }));
                }
            }
            return array;
        }
    };
    $(this).selectpicker().filter('.with-ajax').ajaxSelectPicker(options);
}

$.fn.toTab = function () {
    var select = $(this).selector;
    $(document).on("click", "[tab-link]", function (e) {
        e.preventDefault();
        var $this = $(this);
        var isNotAction = $this.attr("data-not-active") == undefined ? false : $this.attr("data-not-active");

        if (isNotAction == false) {
            $(select).find("ul.nav>li").removeClass("active");
            $this.parents("li").addClass("active");
        }

        var url = $this.attr("data-url");
        var form = $this.attr("data-form") == undefined ? "[form-edit]" : $this.attr("data-form");
        window.history.pushState('page2', 'Title', $(this).attr("data-tag"));
        var $loading = bindLoading($(select).find("[tab-loading]"));
        $.get(url, function (data) {
            $(select).find("[tab-data]").html(data);
            var $form = $(form);
            try {
                // Unbind existing validation 
                $form.unbind();
                $form.data("validator", null);
                // Check document for changes
                $.validator.unobtrusive.parse(document);
                // Re add validation with changes
                $form.validate($form.data("unobtrusiveValidation").options);

            } catch (e) {
                console.log(e);
            }
            $.AdminBSB.select.activate();
            $loading.waitMe('hide');
        });
    });
    var hashName = "";
    if (location.hash != "") {
        hashName = "#" + decodeURIComponent(location.hash.substr(1));
    }
    else {
        hashName = $($($(this).selector).find("[tab-link]")[0]).attr("data-tag");
    }
    $($(this).selector).find("[tab-link][data-tag='" + hashName + "']").click();

}

$.fn.scrollView = function () {
    var $this = $(this);
    var moveTo = ($this.offset().top - $('section.content').offset().top)
    var curent = $this.offset().top - 53;
    if (curent <= 0) {
        return this.each(function () {
            $('#body').slimScroll({
                scrollTo: moveTo + "px"
            });
        });
    }
}

$.fn.toPopupData = function (callback) {
    $(document).on("click", $(this).selector, function (e) {
        var $this = $(this);
        e.preventDefault();
        var myModal = "#myModal";
        if ($(this).attr('data-target') != undefined || $(this).attr('data-target') != null) {
            myModal = $(this).attr('data-target');
        }
        $(myModal).modal({ backdrop: 'static', keyboard: false });
        $(myModal).modal('show');
        if (callback != null) {
            callback($this);
        }
    });
}
//Biến toàn cục
var http_arr = new Array();
function uploadFile(apiUrl, file, index, divprocess, isMuti, callBack) {

    var http = new XMLHttpRequest();
    http_arr.push(http);
    /** Khởi tạo vùng tiến trình **/
    //Div.Progress-group
    var ProgressGroup = $(divprocess)[0];
    //Div.Progress
    var Progress = document.createElement('div');
    Progress.className = 'progress';
    //Div.Progress-bar
    var ProgressBar = document.createElement('div');
    ProgressBar.className = 'progress-bar';
    //Div.Progress-text
    var ProgressText = document.createElement('div');
    ProgressText.className = 'progress-text';
    //Thêm Div.Progress-bar và Div.Progress-text vào Div.Progress
    Progress.appendChild(ProgressBar);
    Progress.appendChild(ProgressText);
    //Thêm Div.Progress và Div.Progress-bar vào Div.Progress-group  
    if (!isMuti) {
        $(ProgressGroup).html("");
    }
    ProgressGroup.appendChild(Progress);

    //Biến hỗ trợ tính toán tốc độ
    var oldLoaded = 0;
    var oldTime = 0;
    //Sự kiện bắt tiến trình
    http.upload.addEventListener('progress', function (event) {
        if (oldTime == 0) { //Set thời gian trước đó nếu như bằng không.
            oldTime = event.timeStamp;
        }
        //Khởi tạo các biến cần thiết
        var fileName = file.name; //Tên file
        var fileLoaded = event.loaded; //Đã load được bao nhiêu
        var fileTotal = event.total; //Tổng cộng dung lượng cần load
        var fileProgress = parseInt((fileLoaded / fileTotal) * 100) || 0; //Tiến trình xử lý
        var speed = speedRate(oldTime, event.timeStamp, oldLoaded, event.loaded);
        //Sử dụng biến
        ProgressBar.innerHTML = fileName + ' đang được upload...';
        ProgressBar.style.width = fileProgress + '%';
        ProgressText.innerHTML = fileProgress + '% Tốc độ tải lên: ' + speed + 'KB/s';
        //Chờ dữ liệu trả về
        if (fileProgress == 100) {
            //ProgressBar.style.background = 'url("images/progressbar.gif")';
        }
        oldTime = event.timeStamp; //Set thời gian sau khi thực hiện xử lý
        oldLoaded = event.loaded; //Set dữ liệu đã nhận được
    }, false);

    //Bắt đầu Upload
    var data = new FormData();
    data.append('filename', file.name);
    data.append('myfile', file);
    http.open('POST', apiUrl, true);
    http.send(data);
    //Nhận dữ liệu trả về
    http.onreadystatechange = function (event) {
        if (http.readyState == 4 && http.status == 404) {
            ProgressBar.className += ' progress-bar-danger'; //Thêm class Danger
            ProgressBar.innerHTML = 'Có lỗi xảy ra'; //Thông báo
        }
        //Kiểm tra điều kiện
        if (http.readyState == 4 && http.status == 200) {
            ProgressBar.style.background = ''; //Bỏ hình ảnh xử lý
            try { //Bẫy lỗi JSON
                var server = JSON.parse(http.responseText);
                if (server.status) {
                    ProgressBar.className += ' progress-bar-' + server.type; //Thêm class Success
                    ProgressBar.innerHTML = server.message; //Thông báo    
                } else {
                    ProgressBar.className += ' progress-bar-' + server.type; //Thêm class Danger
                    ProgressBar.innerHTML = server.message; //Thông báo
                }

            } catch (e) {
                ProgressBar.className += ' progress-bar-danger'; //Thêm class Danger
                ProgressBar.innerHTML = 'Có lỗi xảy ra'; //Thông báo
            }
        }
        if (callBack != null) {
            callBack(server);
        }
        http.removeEventListener('progress', function () {

        }); //Bỏ bắt sự kiện
    }
}

function cancleUpload(e) {
    var $this = $(e);
    var parentInput = $this.parents("[file-parent]");
    parentInput.find("[file-input]").val(null);
    var thisInput = parentInput.find("[file-input]");
    $this.addClass("hide");

    for (i = 0; i < http_arr.length; i++) {
        http_arr[i].removeEventListener('progress', function () { });
        http_arr[i].abort();
    }
    var ProgressBar = document.getElementsByClassName('progress-bar');
    if (thisInput.attr("multiple") != undefined) {
        for (i = 0; i < ProgressBar.length; i++) {
            ProgressBar[i].className = 'progress-bar progress-bar-danger';
            ProgressBar.innerHTML = 'Đã hủy tải lên';
        }
    }
    else {
        for (i = 0; i < ProgressBar.length; i++) {
            if (i == ProgressBar.length - 1) {
                ProgressBar[i].className = 'progress-bar progress-bar-danger';
                ProgressBar.innerHTML = 'Đã hủy tải lên';
            }
        }
    }
}

function speedRate(oldTime, newTime, oldLoaded, newLoaded) {
    var timeProcess = newTime - oldTime; //Độ trễ giữa 2 lần gọi sự kiện
    if (timeProcess != 0) {
        var currentLoadedPerMilisecond = (newLoaded - oldLoaded) / timeProcess; // Số byte chuyển được 1 Mili giây
        return parseInt((currentLoadedPerMilisecond * 1000) / 1024); //Trả về giá trị tốc độ KB/s
    } else {
        return parseInt(newLoaded / 1024); //Trả về giá trị tốc độ KB/s
    }
}

$.fn.toRickText = function (setting, callback) {
    var strName = $(this).selector;
    //CKEDITOR.inline(strName).on('change', function () {
    //    CKEDITOR.instances[strName].updateElement();
    //    if (callback != null) {
    //        callback(strName, CKEDITOR.instances[strName].getData());
    //    }
    //});

    CKEDITOR.replace(strName, setting).on('change', function () {
        CKEDITOR.instances[strName].updateElement();
        if (callback != null) {
            callback(strName, CKEDITOR.instances[strName].getData());
        }
        CKEDITOR.on(strName, function (ev) {
            // Sets indentation of source code
            ev.editor.dataProcessor.writer.setRules('div', {
                indent: true,
                breakBeforeOpen: true,
                breakAfterOpen: true,
                breakBeforeClose: true,
                breakAfterClose: true
            });
        });
        CKEDITOR.instances[strName].on('change', function () {
            $("[seo-page-content]").trigger("change");
        });
    });
}

$.fn.toListItem = function (callback, callbackEnd) {
    var $parent = $($(this).selector);
    var setting_tagLoading = $(this).attr("data-tag-loading") == undefined ? "[list-loading]" : $(this).attr("data-tag-loading");
    var setting_method = $(this).attr("data-method") == undefined ? "POST" : $(this).attr("data-method");
    var setting_tagData = $(this).attr("data-tag-bind") == undefined ? "[list-data]" : $(this).attr("data-tag-bind");
    var setting_url = $(this).attr("data-url") == undefined ? "/" : $(this).attr("data-url");
    var $loading = bindLoading($parent.find(setting_tagLoading));
    $.ajax({
        method: setting_method,
        url: setting_url
    }).done(function (rp, statusText, xhdr) {
        $parent.find(setting_tagData).html(callback(rp));
        if (callbackEnd != null) {
            callbackEnd(rp);
        }
        $loading.waitMe('hide');
    }).fail(function (xhdr, statusText, errorText) {
        $loading.waitMe('hide');
    });
}

$.fn.toEditGrid = function (callback) {
    $(document).on("click", $(this).selector, function (e) {
        e.preventDefault();
        var $this = $(this);
        var parent = $this.attr("data-parent") == undefined ? "[grid-index]" : $this.attr("data-parent");
        var form = $this.attr("data-form") == undefined ? "form" : $this.attr("data-form");
        var loading = $this.attr("data-loading") == undefined ? "[grid-loading]" : $this.attr("data-loading");
        var dataType = $this.attr("data-acction-type") == undefined ? "create" : $this.attr("data-acction-type");

        var $loading = bindLoading($(parent).find(loading));
        $(parent).find("[tr-grid-create]").each(function (i, item) {
            $(item).remove();
        });

        $.get($(this).attr("data-action"), function (data) {
            if (dataType == "create") {
                $(parent).find("tbody").append("<tr tr-grid-create>" + data + "</tr>");
            }
            else {
                $(parent).find("tr[tr-grid-edit]").each(function (i, item) {
                    $(item).html($(item).attr("tr-grid-edit-backup"));
                    $(item).removeAttr("tr-grid-edit").removeAttr("tr-grid-edit-backup");
                });
                var strXXX = $($this.parents("tr"));
                var strBackUp = $(strXXX).html();
                $(strXXX).attr("tr-grid-edit", "");
                $(strXXX).attr("tr-grid-edit-backup", strBackUp);
                $(strXXX).html(data);
            }
            var $form = $(parent).find(form);
            try {
                $form.unbind();
                $form.data("validator", null);
                $.validator.unobtrusive.parse(document);
                $form.validate($form.data("unobtrusiveValidation").options);
                $.AdminBSB.select.activate();
                $loading.waitMe('hide');
                if (callback != null) {
                    callback($this);
                }
            } catch (e) {
                console.log(e);
                $loading.waitMe('hide');
            }
        });
    });
}

$.fn.toCancelEditGrid = function (callback) {
    $(document).on("click", $(this).selector, function (e) {
        var $this = $(this);
        
        var thistrCreate = $this.parents("tr[tr-grid-create]");
        if (thistrCreate.attr("tr-grid-create") != undefined) {
            $(thistrCreate).remove();
        }
        else {
            var thisTr = $this.parents("tr[tr-grid-edit]");
            var strBackUp = $(thisTr).attr("tr-grid-edit-backup");
            $(thisTr).html(strBackUp);
            $(thisTr).removeAttr("tr-grid-edit-backup").removeAttr("tr-grid-edit");
        }
        if (callback != null) {
            callback($this);
        }
    });
};

$.fn.openPopup = function (setting) {
    var thisSelect = this.selector;
    if (setting.url != undefined && setting.url != null) {
        $(thisSelect).modal({ backdrop: 'static', keyboard: false });
        $(thisSelect + ">div>div.modal-content").html("<div class='modalLoadding'><i class='material-icons icon-spin'>data_usage</i><span>Đang xử lý...</span></div>");
        $.get(setting.url, function (data) {
            setTimeout(function () {
                $(thisSelect + ">div>div.modal-content").html(data);
                var $form = $(thisSelect + " form");
                try {
                    // Unbind existing validation
                    $form.unbind();
                    $form.data("validator", null);
                    // Check document for changes
                    $.validator.unobtrusive.parse(document);
                    // Re add validation with changes
                    $form.validate($form.data("unobtrusiveValidation").options);
                } catch (e) {
                    console.log(e);
                }
                $.AdminBSB.select.activate();
            }, 300);
        });
    }
}

$.fn.toClientConfig = function (callBack = null) {
    $(document).on("click", $(this).selector, function () {
        var $this = $(this);
        var title = $this.attr("data-title") == undefined ? "Thông báo" : $this.attr("data-title");
        var type = $this.attr("data-type") == undefined ? "warning" : $this.attr("data-type");
        var text = $this.attr("data-text") == undefined ? "Bạn có muốn thực hiện chức năng này?" : $this.attr("data-text");
        var buttonText = $this.attr("data-button-text") == undefined ? "Đồng ý!" : $this.attr("data-button-text");
        var isProcess = $this.attr("data-is-process") == undefined ? false : $this.attr("data-is-process");
        if (isProcess == "true") {
            swal({
                title: title,
                text: text,
                type: type,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: buttonText,
                closeOnConfirm: false,
                showLoaderOnConfirm: false
            }, function () {
                $this.button('loading');
                if (callBack != null) {
                    callBack($this);
                }
            });
        }
        else {
            $this.button('loading');
            if (callBack != null) {
                callBack($this);
            }
        }
    });
}

function validateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    }
    return false;
}

function datetimeToString(date, format) {
    var d = new Date(date);
    return moment(d).format(format);
}

function ToSlug(strVN) {
    var title, slug, str;
    str = strVN.toLowerCase();
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
    return str;
}
function GenSlug(e) {
    if (e == null) {
        $("#Slug").val(ToSlug($("#Name").val()));
    }
    else {
        $("#Slug").val(ToSlug($(e).val()));
    }
}
function TextCount(id, name, type) {
    var maxLength = 0;
    var textStr = "";
    if (type == 1) {
        maxLength = 70;
        textStr = "tiêu đề";
    }
    if (type == 2) {
        maxLength = 141;
        textStr = "mô tả";
    }
    if ($(id).length > 0) {
        var $this = $(id);
        var doituongint = name;
        if ($(id).val().length > 0) {
            $("." + doituongint).html('Công cụ tìm kiếm hiển thị ' + textStr + ' được giới hạn <span class="text-success">' + maxLength + '</span> ký tự, còn lại <span class="text-danger">' + (maxLength - $(id).val().length) + '</span> ký tự');
        }
        else {
            $("." + doituongint).html('Công cụ tìm kiếm hiển thị ' + textStr + ' được giới hạn <span class="text-success">' + maxLength + '</span> ký tự, còn lại <span class="text-danger">' + (maxLength - $(id).val().length) + '</span> ký tự');
        }
    }
}

$.fn.toButtonOpenFile = function () {
    var thisSelector = this.selector;
    $(document).on("click", thisSelector, function (e) {
        e.preventDefault();
        window.open('/Admin/Base/FileManager/Manager?path=&field_input=' + $(this).attr("data-target") + '&field_img=' + $(this).attr("data-img") + '&langCode=vn', "", "width=1200,height=500");
    });
};



function onCopyClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            alertify.notify("Copy thành công bấm tổ hợp phím Ctrl + v để ghi dữ liệu.", "success", 5);
            return true;
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }

}
function onEnableSlug(a) {
    var thisVal = $(a).prop("checked");
    $("#Slug").prop("readonly", !thisVal);
}
function onOpenImg(a) {
    window.open($(a).attr("src"));
    return false;
}
function onChangeImg(a) {
    var $this = $(a);
    $($this.attr("data-taget")).attr("src", $this.val());
}


$.fn.toDateTimePicker = function () {
    jQuery.datetimepicker.setLocale('vi');
    jQuery(this.selector).datetimepicker({
        i18n: {
            vi: {
                months: [
                    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
                    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
                    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
                ],
                dayOfWeek: [
                    "CN", "T.2", "T.3", "T.4",
                    "T.5", "T.6", "T.7"
                ]
            }
        },
        timepicker: true,
        format: 'd/m/Y H:i'
    });
};
$.fn.toDatePicker = function () {
    jQuery.datetimepicker.setLocale('vi');
    jQuery(this.selector).datetimepicker({
        i18n: {
            vi: {
                months: [
                    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
                    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
                    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
                ],
                dayOfWeek: [
                    "CN", "T.2", "T.3", "T.4",
                    "T.5", "T.6", "T.7"
                ]
            }
        },
        timepicker: false,
        format: 'd/m/Y'
    });
};
$.fn.toTimePicker = function () {
    jQuery.datetimepicker.setLocale('vi');
    jQuery(this.selector).datetimepicker({
        timepicker: true,
        datepicker: false,
        format: 'H:i'
    });
};

$.fn.toRangeDatePicker = function () {
    jQuery.datetimepicker.setLocale('vi');
    var arrayselector = this.selector.split(',');
    jQuery(arrayselector[0]).datetimepicker({
        format: 'd/m/Y',
        i18n: {
            vi: {
                months: [
                    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
                    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
                    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
                ],
                dayOfWeek: [
                    "CN", "T.2", "T.3", "T.4",
                    "T.5", "T.6", "T.7"
                ]
            }
        },
        onShow: function (ct) {
            this.setOptions({
                maxDate: jQuery(arrayselector[1]).val() ? jQuery(arrayselector[1]).val() : false
            })
        },
        timepicker: false
    });
    jQuery(arrayselector[1]).datetimepicker({
        format: 'd/m/Y',
        onShow: function (ct) {
            this.setOptions({
                minDate: jQuery(arrayselector[0]).val() ? jQuery(arrayselector[0]).val() : false
            })
        },
        i18n: {
            vi: {
                months: [
                    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
                    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
                    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
                ],
                dayOfWeek: [
                    "CN", "T.2", "T.3", "T.4",
                    "T.5", "T.6", "T.7"
                ]
            }
        },
        timepicker: false
    });
};

$.fn.toTagsInput = function (callBackData) {
    var data = {};
    if (callBackData != null) {
        data = callBackData(data);
    }
    var select = $(this).selector;
    var urlList = $(select).attr("data-action");
    var urlAdd = $(select).attr("data-action-add");

    $(select).select2({
        tags: true,
        createTag: function (tag) {
            return {
                id: tag.term,
                text: tag.term,
                isNew: true
            };
        }
    }).on("select2:select", function (e) {
        if (e.params.data.isNew) {

            var thisInput = $(this).find('[value="' + e.params.data.id + '"]');
            var thisSelect = $(this);
           // thisInput.replaceWith('<option selected value="' + e.params.data.id + '">' + e.params.data.text + '(Đang xử lý...)</option>');
           // thisInput.replaceWith('<option selected value="' + e.params.data.id + '">' + e.params.data.text + '(Đang xử lý 1...)</option>');

            data.name = e.params.data.text;
            var dataQuery = urlAdd + jsonToQueryString(data);
            
            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                url: dataQuery,
                processData: false,
                success: function (rs) {
                    if (rs != null) {
                        thisInput.replaceWith('<option selected value="' + rs.id + '">' + rs.name + '</option>');
                        console.log(thisSelect.val());
                    }
                },
                error: function (e) {
                    alert("Vui lòng F5 trình duyệt rồi thử lại!");
                },
                complete: function (jqxhr, txt_status) {
                }
            });
        }
    });
}