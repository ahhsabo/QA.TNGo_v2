$(document).ready(function () {
    getData(1);
    //
    $(document).on("click", "#page-container a", function (e) {
        e.preventDefault();
        getData($(this).data("page"));
    });

    function getData(pageIndex) {
        $.get(`/news/list?pageIndex=${pageIndex}`).done(xhr => {
            let listNews = "";
            if (xhr.data.length > 0) {
                $.each(xhr.data, (index, item) => {
                    listNews += `<div class="col-12 col-sm-4 col-md-4 mb-3">
                                            <a href="/news/${item?.link?.slug}.html">
                                                <div class="img-wrap">
                                                    <img src="${item.banner}" class="img-fluid" width="100%" />
                                                </div>
                                                <div class="py-2"></div>
                                                <div class="fw-semibold text-break">${item.name}</div>
                                                <div><i>${new Date(item.datePosted).toLocaleDateString("en-GB")}</i></div>
                                            </a>
                                </div>`;
                });
            } else {
                listNews = `<h5 class="text-danger text-center"><b>KHÔNG TÌM THẤY BÀI VIẾT NÀO!</b></h5>`;
            }


            $("#news-grid").html(listNews);
            //

            let prev = pageIndex > 1 ? pageIndex - 1 : 1;
            let next = pageIndex < xhr.totalPage ? pageIndex + 1 : pageIndex;



            let pagination = `<a class="mb-2 btn btn-outline-primary d-inline-block border-0" data-page="${prev}">
                                        <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
                                    </a>

                                    <input class="form-control form-control-lg d-inline-block" type="text" style="width:80px !important" value="${pageIndex}" />

                                    <a class="mb-2 btn btn-outline-primary d-inline-block border-0" data-page=${next}>
                                        <i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                                    </a>`;
            //
            $("#page-container").html(pagination);
        });
    }
});