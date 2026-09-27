// ローディング
$(window).on('load', function () {
    if (sessionStorage.getItem('access')) {
        // 2回目以降ローディング非表示
        $('#loading').hide();
    } else {
        // 初回のみローディング表示
        sessionStorage.setItem('access', 'true');
        // 0.8s待ってからローディング開始
        setTimeout(function () {
            $('#loading').addClass('is-loaded');
        }, 800);
    }
});



// ヘッダーナビ＿＿MVの後にスライドイン（トップページのみ）
if ($('#about').length) {
    function headerShow() {
        const aboutPos = $('#about').offset().top;
        const scrollPos = $(window).scrollTop();
        if (scrollPos >= aboutPos - 400) {
            $('header').addClass('is-show');
        } else {
            $('header').removeClass('is-show');
        }
    }
    $(window).on('scroll', headerShow);
    headerShow();
    } else {
    // トップページ以外は常に表示する
    $('header').addClass('is-show');
}


// ハンバーガーメニュー
$(function () {
    $(".hamburger").on("click", function (){
        $(".header__nav--sp").toggleClass("open");
        $(".hamburger").toggleClass("open");
        $(".hamburger__overlay").toggleClass("open");
    });
});


// マウスストーカー
$(function () {
    const stalker = $("#js-stalker");
    $(document).on("mousemove", function (e) {
        const x = e.clientX;
        const y = e.clientY;
        stalker.css({
        opacity: 1,
        transform: "translate(" + x + "px, " + y + "px)",
        });
    });
        $(document).on("mouseenter", "a, .splide__arrow, .splide__pagination__page", function () {
        stalker.addClass("js-hover");
    });

    $(document).on("mouseleave", "a, .splide__arrow, .splide__pagination__page", function () {
        stalker.removeClass("js-hover");
    });
}); 

// トップページ＿＿ボイス
new Splide(".splide", {
    autoplay: true,
    type: "loop",
    pauseOnHover: false, 
    rewind: true,
    interval: 8000,
    speed: 800,
    padding: "20%",
    gap: 100,
    fixedWidth: "600px",
    focus: "center",
    breakpoints: {
        768: {
            padding: "18.5%",
            gap: 20,
            fixedWidth: "300px",
        },
    },
}).mount();