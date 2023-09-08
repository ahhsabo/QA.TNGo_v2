$(document).ready(function () {
    initFAQ();
    initTerms();

    function initFAQ() {
        const language = $('#currentLanguage').val();
        $.get(`/${language}/userManual/faq`).done(xhr => {

            let pill = "";
            let content = "";

            for (let i = 1; i <= xhr.length; i++) {
                if (i == 1) {
                    pill += `<li class="nav-item">
                                            <a class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#menu_${i}" role="tab" aria-controls="#menu_${i}" aria-selected="true">
                                        <div class="diamond-shape">
                                            <div class="item-count">${i}</div>
                                        </div>
                                        <p>${xhr[i - 1].category}</p>
                                    </a>
                                </li>`;
                    //
                    content += `<div id="menu_${i}" class="tab-pane fade show active" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                                                                        <div class="accordion" id="accordion_${i}">`;

                    for (let j = 1; j <= xhr[i - 1].faQs.length; j++) {

                        if (j == 1) {
                            content += `<div class="accordion-item">
                                                    <h2 class="accordion-header" id="headingOne">
                                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${i}__${j}" aria-expanded="true" aria-controls="collapse_${i}__${j}">
                                                            <b>${xhr[i - 1].faQs[j - 1].title}</b>
                                                        </button>
                                                    </h2>
                                                        <div id="collapse_${i}__${j}" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        <div class="accordion-body">
                                                            ${xhr[i - 1].faQs[j - 1].content ?? ""}
                                                        </div>
                                                    </div>
                                                </div>`;
                        } else {
                            content += `<div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingOne">
                                                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${i}__${j}" aria-expanded="false" aria-controls="collapse_${i}__${j}">
                                                                    <b>${xhr[i - 1].faQs[j - 1].title}</b>
                                                                </button>
                                                            </h2>
                                                                <div id="collapse_${i}__${j}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                <div class="accordion-body">
                                                                    ${xhr[i - 1].faQs[j - 1].content ?? ""}
                                                                </div>
                                                            </div>
                                                        </div>`;
                        }
                    }

                    content += `</div>
                                                </div>`;
                } else {
                    pill += `<li class="nav-item">
                                            <a class="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#menu_${i}" role="tab" aria-controls="#menu_${i}" aria-selected="true">
                                            <div class="diamond-shape">
                                                <div class="item-count">${i}</div>
                                            </div>
                                            <p>${xhr[i - 1].category}</p>
                                        </a>
                                    </li>`;
                    //
                    content += `<div id="menu_${i}" class="tab-pane fade" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                                                                        <div class="accordion" id="accordion_${i}">`;

                    for (let j = 1; j <= xhr[i - 1].faQs.length; j++) {

                        if (j == 1) {
                            content += `<div class="accordion-item">
                                                    <h2 class="accordion-header" id="headingOne">
                                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${i}__${j}" aria-expanded="true" aria-controls="collapse_${i}__${j}">
                                                            <b>${xhr[i - 1].faQs[j - 1].title}</b>
                                                        </button>
                                                    </h2>
                                                        <div id="collapse_${i}__${j}" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        <div class="accordion-body">
                                                            ${xhr[i - 1].faQs[j - 1].content ?? ""}
                                                        </div>
                                                    </div>
                                                </div>`;
                        } else {
                            content += `<div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingOne">
                                                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${i}__${j}" aria-expanded="false" aria-controls="collapse_${i}__${j}">
                                                                    <b>${xhr[i - 1].faQs[j - 1].title}</b>
                                                                </button>
                                                            </h2>
                                                                <div id="collapse_${i}__${j}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                <div class="accordion-body">
                                                                    ${xhr[i - 1].faQs[j - 1].content ?? ""}
                                                                </div>
                                                            </div>
                                                        </div>`;
                        }
                    }

                    content += `</div>
                                                </div>`;
                }
            }

            let html = `<div class="col-sm-3">
                                                            <ul class="nav nav-pills">
                                                                ${pill}
                                                            </ul>
                                                        </div>

                                                        <div class="col-sm-9">
                                                            <div class="tab-content">
                                                                ${content}
                                                            </div>
                                                        </div>`;
            //
            $("#faq").html(html);
        });
    }

    function initTerms() {
        const language = $('#currentLanguage').val();
        $.get(`/${language}/userManual/terms`).done(xhr => {

            if (xhr) {
                $('#terms-summary').html(xhr.summary.content);
                //
                let html = "";
                for (let i = 0; i < xhr.list.length; i++) {
                    html += `<div class="terms-block">
                                        <div class="manual-panel">
                                            <div class="manual-panel-title">${xhr.list[i].title}</div>
                                            <div class="manual-panel-square"></div>
                                            <div class="manual-panel-number">${i + 1}</div>
                                        </div>

                                        <div class="manual-content">
                                            ${xhr.list[i].content}
                                        </div>
                                    </div>`;
                }
                //
                $("#terms-list").html(html);
            }
        });
    }
});