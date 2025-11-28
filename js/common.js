
document.addEventListener("DOMContentLoaded", (event) => {

    const audio = document.getElementById("bgmAudio");
    const bgmBtn = document.querySelector(".bgm_btn");

    // 첫 진입 안내
    window.addEventListener("load", () => {
        $('.toast--music')
            .fadeIn(200)
            .delay(1200)
            .fadeOut(200);
    });

    // 버튼 클릭 시 재생/정지
    bgmBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            bgmBtn.classList.remove("paused");
        } else {
            audio.pause();
            bgmBtn.classList.add("paused");
        }
    });


    // Dday 캘린더

    // 💍 날짜 설정
    const weddingDate = new Date("2026-06-06T14:00:00+09:00");
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const weddingMidnight = new Date(2026, 5, 6); // month 0-indexed

    // D-day 계산
    const diffTime = weddingMidnight - todayMidnight;
    const dday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const ddayText = document.getElementById("calendar_count");
    if (dday > 0) {
        ddayText.textContent = `${dday}at namatsutnida.`;
    } else if (dday === 0) {
        ddayText.textContent = `Today is day 💐`;
    } else {
        ddayText.textContent = `Jinat sathu day.`;
    }

    // 📅 달력 생성 (2026년 6월)
    const year = 2026;
    const month = 5; // 0 = 1월, 5 = 6월
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const calendarBody = document.getElementById("calendar_body");
    let html = "<tr>";

    for (let i = 0; i < firstDay; i++) html += "<td></td>";

    for (let day = 1; day <= lastDate; day++) {
        const isWeddingDay = day === 6;
        html += `<td><span class="${isWeddingDay ? "today" : ""}">${day}</span></td>`;
        if ((day + firstDay) % 7 === 0) html += "</tr><tr>";
    }

    html += "</tr>";
    calendarBody.innerHTML = html;

    //gallery swiper
    var gallerySwiper = new Swiper(".gallery_swiper", {
        effect: "cards",
        grabCursor: true,
    });

    //gallery_modal_swiper
    var galleryModalSwiper = new Swiper(".gallery_modal_swiper", {
        pagination: {
            el: ".section06_modal .swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".section06_modal .swiper-button-next",
            prevEl: ".section06_modal .swiper-button-prev",
        },
    });

    $('.section06_modal').hide();
    $('.gallery_item .swiper_btn').on('click', function() {
        const index = $(this).closest(".gallery_item").index();
    
        $('.section06_modal').fadeIn(200, () => {
            galleryModalSwiper.slideTo(index, 0);
        });
    });

    $('.section06_modal .modal_close_btn').on('click', function(){
        $('.section06_modal').fadeOut(200);
    });

    //present btn
    $('.present_btn--link').on('click', function() {
        const $presentBtn = $(this);
        const $presentList = $presentBtn.next('.present_list');
        const isOpen = $presentList.is(':visible');

        $('.present_btn').removeClass('on');
        $('.present_list').css("display:none");
        $('.present_list').slideUp(300);

        if (isOpen) return;

        $presentBtn.addClass('on');
        $presentList.slideDown(300);
    });

    $('.btn--copy').on('click', function () {
        const textToCopy = $(this).data('copy');

        navigator.clipboard.writeText(textToCopy).then(() => {
            $('.toast')
                .fadeIn(200)
                .delay(1200)
                .fadeOut(200);
        });
    });
});


