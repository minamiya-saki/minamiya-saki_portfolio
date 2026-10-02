// ＝＝＝＝＝ローディング＝＝＝＝＝
$(function () {
    var $loading = $('#loading');
    // 2回目以降はローディングしない
    if (sessionStorage.getItem('access')) {
        $loading.hide();
        return;
    }
    sessionStorage.setItem('access', 'true');
    // ローディング開始
    $loading.css('display', 'flex');
    // 2秒待つ
    var introFinished = $.Deferred();
    setTimeout(function () {
        introFinished.resolve();
    }, 2000);
    // ページの読み込み完了を待つ
    var pageLoaded = $.Deferred();
    if (document.readyState === 'complete') {
        pageLoaded.resolve();
    } else {
        $(window).one('load', function () {
            pageLoaded.resolve();
        });
    }
    // 両方終わったらローディング終了
    $.when(introFinished, pageLoaded).done(function () {
        $loading.addClass('is-loaded');
    });
});

//＝＝＝＝＝スクロールでふわっと表示__1回だけ＝＝＝＝＝
$(function(){
    $(".inview").on("inview", function (event, isInView) {
        if (isInView) {
        $(this).stop().addClass("is-show");
        }
    });
});


//＝＝＝＝＝画面遷移（フェードアウト__戻る）＝＝＝＝＝
$(window).on('load', function(){
    $('body').removeClass('fadeOut');
});
$(function() {
    // ハッシュリンク(#)と別ウィンドウページとモーダル（remodal
    // ）を開く場合はスルー
    $('a:not([href^="#"]):not([target]):not([data-remodal-target])').on('click', function(e){
        e.preventDefault();
        // ナビゲートをキャンセル
        url = $(this).attr('href');
        // 遷移先のURLを取得
        if (url !== '') {
        $('body').addClass('fadeOut');
        // bodyに class="fadeOut"を挿入
        setTimeout(function(){
            window.location = url;  // 0.3秒後に取得したURLに遷移
        }, 300);
        }
        return false;
    });
});


// ＝＝＝＝＝ヘッダーナビ＿＿MVの後に表示（トップページのみ）＝＝＝＝＝
if ($('#about').length) {
    function headerShow() {
        const aboutPos = $('#about').offset().top;
        const scrollPos = $(window).scrollTop();
        if (scrollPos >= aboutPos - 560) {
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


// ＝＝＝＝＝ハンバーガーメニュー＝＝＝＝＝
$(function () {
    $(".hamburger").on("click", function (){
        $(".header__nav--sp").toggleClass("open");
        $(".hamburger").toggleClass("open");
        $(".hamburger__overlay").toggleClass("open");
    });
});


// ＝＝＝＝＝マウスストーカー＝＝＝＝＝
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
        $(document).on("mouseenter", "a, .splide__arrow, .splide__pagination__page, .c-form__submit button", function () {
        stalker.addClass("js-hover");
    });

    $(document).on("mouseleave", "a, .splide__arrow, .splide__pagination__page, .c-form__submit button", function () {
        stalker.removeClass("js-hover");
    });
}); 

// ＝＝＝＝＝トップページ＿＿ボイス＝＝＝＝＝
if ($(".splide").length) {
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
}


// ＝＝＝＝＝コンタクトフォーム＝＝＝＝＝
let submitted = false;