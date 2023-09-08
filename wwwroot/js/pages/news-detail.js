$(document).ready(function () {
    let newsId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    $.get(`/newsDetail/getData/${newsId}`).done(xhr => {

        $('#news-banner').html(`
                                <img src="/image/Rectangle 618.png" class="img-fluid" width="100%" />
                                <h1 class="banner-text-midle-left d-none d-sm-block">${xhr.name}</h1>
                                <h4 class="banner-text-midle-left-mobile d-block d-sm-none">${xhr.name}</h4>
                                `);

        let content = `<div class="row mb-2">
                                    <div class="col-sm-6"></div>
                                    <div class="col-sm-6 text-end">
                                        <i class="fa-regular fa-clock"></i>
                                        <p style="display: inline ;">${new Date(xhr.datePosted).toLocaleTimeString("en-GB")} ${new Date(xhr.datePosted).toLocaleDateString("en-GB")}</p>
                                    </div>
                                </div>

                                <h5 class="fw-bold">${xhr.summary}</h5>

                                <div class="news-content">${xhr.content}</div>

                                <div class="text-end fw-bold">${xhr.author}</div>

                                <div>
                                    <i class="fa-solid fa-tags"></i>
                                    <span>Từ khóa</span>
                                    <span class="badge text-bg-primary"># Xe đạp</span>
                                    <span class="badge text-bg-primary"># TNGo</span>
                                    <span class="badge text-bg-primary"># Sống khỏe</span>
                                </div>`;

        $("#news-container").html(content);
    });
    //
    $.get(`/newsDetail/related/${newsId}`).done(xhr => {
        let html = "<h4 class='fw-bold mb-4'>Bài viết liên quan</h4>";

        if (xhr && xhr.length > 0) {
            $.each(xhr, (idx, item) => {
                html += `<a href="/NewsDetail/${item.id}">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <img src="${item.banner}" width="100%" style="padding-bottom: 20px;">
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="mb-2">${item.name}</div>
                                            <i>${new Date(item.datePosted).toLocaleTimeString("en-GB")} ${new Date(item.datePosted).toLocaleDateString("en-GB")}</i>
                                        </div>
                                    </div>
                                </a>`;
            });

            $("#related-news-container").html(html);

            let next = xhr[0];

            $('#news-next').html(
                `<div class="col-sm-4">
                            <a href="tngo__news-02.html"><img src="${next.banner}" width="100%;" style="padding-bottom:10px;"></a>
                            </div>
                            <div class="col-sm-8">
                                <h5>${next.name}</h5>
                                <p>
                                    ${next.summary}
                                </p>
                            </div>`
            );
        }
    });
});