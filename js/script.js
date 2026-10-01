// ローディング
$(window).on('load', function () {
    //ページの全てのリソースの読み込みが完了後にスタート
    if (sessionStorage.getItem('access')) {
        // 初回アクセスか確認
        return;
    } else {
        // 初回のみローディング表示
        sessionStorage.setItem('access', 'true');
        $('#loading').css('display', 'flex');
        // 1.8秒待ってからローディング開始
        setTimeout(function () {
            $('#loading').addClass('is-loaded');
        }, 1800);
    }
});


//スクロールでふわっと表示__1回だけ
$(function(){
    $(".inview").on("inview", function (event, isInView) {
        if (isInView) {
        $(this).stop().addClass("is-show");
        }
    });
});


//画面遷移（フェードアウト__戻る）
$(window).on('load', function(){
    $('body').removeClass('fadeout');
});
$(function() {
    // ハッシュリンク(#)と別ウィンドウページとモーダル（remodal
    // ）を開く場合はスルー
    $('a:not([href^="#"]):not([target]):not([data-remodal-target]').on('click', function(e){
        e.preventDefault();
        // ナビゲートをキャンセル
        url = $(this).attr('href');
        // 遷移先のURLを取得
        if (url !== '') {
        $('body').addClass('fadeOut');
        // bodyに class="fadeout"を挿入
        setTimeout(function(){
            window.location = url;  // 0.3秒後に取得したURLに遷移
        }, 300);
        }
        return false;
    });
});


// ヘッダーナビ＿＿MVの後に表示（トップページのみ）
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

    $(document).on("mouseleave", "a, .splide__arrow, .splide__pagination__page, .c-form__submit button", function () {
        stalker.removeClass("js-hover");
    });
}); 

// トップページ＿＿ボイス
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


//コンタクトフォーム
let submitted = false;