AOS.init({
    duration: 1000, 
    offset: 200,
    // useClassNames: true,
    // initClassName: true,
    animatedClassName: 'animated',
});

// 발급받은 JavaScript 키를 넣으세요
Kakao.init('afb8b4e66c8a97f2ae053a1f28ba5b9c'); 
console.log(Kakao.isInitialized()); // 초기화 여부 확인 (true가 나와야 함)

document.addEventListener("DOMContentLoaded", (event) => {

    document.getElementById('kakao-link-btn').onclick = function() {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '이주혁 ♥ 이예은 결혼식에 초대합니다.',
                description: '2026.06.06(토) 오후 3:00\n더파티움 안양 7F 라포레홀',
                imageUrl: 'https://yen2hxxk-wedding.site/img/opengraph.jpg', // 공유 시 보여질 메인 이미지
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            buttons: [
                {
                    title: '모바일 청첩장 보기',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
            ],
        });
    };

    //     $('body').css("overflow-y","hidden")
    //     setTimeout(function(){
    //         $('body').css("overflow-y","initial")
    //     },100)
    setTimeout(function(){
        var sakura = new Sakura('.section01');
    }, 2800);

    // 첫 진입 안내
    window.addEventListener("load", () => {
        $('.toast--music')
            .fadeIn(200)
            .delay(1200)
            .fadeOut(200);
    });
    

    const audio = document.getElementById("bgmAudio");
    const bgmBtn = document.querySelector(".bgm_btn");

    // [함수] 재생 상태에 따른 UI 업데이트
    function setAudioVisual(isPlaying) {
        if (isPlaying) {
            bgmBtn.classList.remove("paused"); // EQ 바 보임
        } else {
            bgmBtn.classList.add("paused");    // 재생 아이콘 보임
        }
    }


    // [함수] 재생 시도
    const playAudio = () => {
        audio.play().then(() => {
            setAudioVisual(true);
        }).catch(() => {
            // 브라우저가 차단한 경우 정지 UI 유지
            setAudioVisual(false);
        });
    };

    // 1. 페이지 로드 시 즉시 실행 시도 (대부분 브라우저에서 차단됨)
    playAudio();

    // 4. 버튼 클릭 시 수동 토글 (직접 클릭은 최우선 순위)
    bgmBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 첫 터치 이벤트와 겹치지 않게 방지
        if (audio.paused) {
            audio.play();
            setAudioVisual(true);
        } else {
            audio.pause();
            setAudioVisual(false);
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
        ddayText.textContent = `${dday}`;
    } else if (dday === 0) {
        ddayText.textContent = `오늘입니다. 💐`;
    } else {
        ddayText.textContent = `지났습니다.`;
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

        // 일요일 계산: (현재날짜 + 시작요일) % 7 이 1이면 일요일입니다.
        const isSunday = (day + firstDay) % 7 === 1;

        // 클래스 설정: 웨딩데이면 today, 일요일이면 red 추가
        let className = "num";
        if (isWeddingDay) className = "today";
        if (isSunday) className += " red"; // 기존 클래스가 있을 수 있으니 한 칸 띄고 추가

        html += `<td><span class="${className.trim()}">${day}</span></td>`;
        
        if ((day + firstDay) % 7 === 0) html += "</tr><tr>";
    }

    html += "</tr>";
    calendarBody.innerHTML = html;

    //gallery swiper
    var gallerySwiper = new Swiper(".gallery_swiper", {
        effect: "cards",
        cardsEffect: {
            // perSlideRotate 속성으로 각도 조절 (단위: 도)
            perSlideRotate: 2, // 기본값은 2도
            // 각 카드 간의 간격(px) 조절
            perSlideOffset: 8, 
            // 회전 효과 활성화/비활성화
            rotate: true,
            // 그림자 효과 활성화/비활성화
            slideShadows: false, 
        },
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
    
        galleryModalSwiper.slideTo(index, 0);
        $('.section06_modal').fadeIn(400);
    });

    $('.section06_modal .modal_close_btn').on('click', function(){
        const index = galleryModalSwiper.activeIndex;
        gallerySwiper.slideTo(index, 0);
        $('.section06_modal').fadeOut(400);

    });

    var infoSwiper = new Swiper(".infoSwiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        pagination: {
            el: ".infoSwiper .swiper-pagination",
            clickable: true,
        },
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
    
        // 복사 함수 실행
        copyToClipboard(textToCopy);
    });

    function copyToClipboard(val) {
        // 1. 최신 navigator.clipboard API 시도
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(val).then(() => {
                showToast();
            }).catch(err => {
                // 실패 시 구식 방식으로 재시도
                fallbackCopyTextToClipboard(val);
            });
        } else {
            // 2. 보안 환경이 아니거나 API가 없는 경우 구식 방식 실행
            fallbackCopyTextToClipboard(val);
        }
    }
    
    function fallbackCopyTextToClipboard(text) {
        // 보이지 않는 textarea를 만들어 텍스트를 복사하는 전통적인 방식
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // 모바일에서 화면이 튀지 않게 설정
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
    
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
    
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showToast();
            } else {
                alert('복사에 실패했습니다. 직접 복사해 주세요.');
            }
        } catch (err) {
            alert('이 브라우저에서는 복사 기능을 지원하지 않습니다.');
        }
    
        document.body.removeChild(textArea);
    }
    
    function showToast() {
        $('.toast--copy')
            .stop(true, true) // 연속 클릭 대응
            .fadeIn(200)
            .delay(1200)
            .fadeOut(200);
    }

    // 두 손가락으로 벌리는 제스처(Pinch Zoom) 방지
    document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
    }, { passive: false });

    // 더블 탭 확대 방지
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
    }, false);


});


