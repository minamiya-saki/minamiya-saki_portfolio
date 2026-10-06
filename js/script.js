// ＝＝＝＝＝ローディング＝＝＝＝＝
$(function () {
    const $loading = $('#loading');
    // 2回目以降はローディングしない
    let visited = false;
    try {
        visited = sessionStorage.getItem('access');
    } catch (e) {}
    if (visited) {
        $loading.hide();
        return;
    }
    try {
        sessionStorage.setItem('access', 'true');
    } catch (e) {}
    // ローディング開始
    // $loading.css('display', 'flex');
    // 2秒待つ
    const introFinished = new Promise(function (resolve) {
        setTimeout(resolve, 2000);
    });
    // ページの読み込み完了を待つ
    const pageLoaded = new Promise(function (resolve) {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            $(window).one('load', resolve);
        }
    });
    // 両方終わったらローディング終了
    Promise.all([introFinished, pageLoaded]).then(function () {
        $loading.addClass('is-loaded');
    });
});


// ＝＝＝＝＝共通パーツ＿＿ヘッダー・フッター＝＝＝＝＝
// 共通ヘッダーの呼び出し
function includeHtml(selector, file, callback) {
    const $target = $(selector);
    if (!$target.length) return;
    const root = $target.data('root') || './';
    $.get(root + 'include/' + file, function (data) {
        // {root} を実際のパスに置き換えて挿入
        $target.html(data.replace(/\{root\}/g, root));
        if (callback) callback();
    }, 'html');
}
$(function () {
    includeHtml('#header', 'header.html');
    includeHtml('#footer', 'footer.html');
});


//＝＝＝＝＝スクロールでふわっと表示__1回だけ＝＝＝＝＝
$(function () {
    $(".inview").on("inview", function (event, isInView) {
        if (isInView) {
            $(this).stop().addClass("is-show");
        }
    });
});


//＝＝＝＝＝画面遷移（フェードアウト__戻る）＝＝＝＝＝
$(function () {
    // ハッシュリンク(#)・別ウィンドウ・モーダル（remodal）を開く場合はスルー
    $(document).on('click', 'a:not([href^="#"]):not([target]):not([data-remodal-target])', function (e) {
        e.preventDefault();
        const url = $(this).attr('href');
        if (url !== '') {
             // bodyにfadeOutを挿入
            $('body').addClass('fadeOut');
            // 0.2秒後に取得したURLに遷移
            setTimeout(function () {
                window.location = url;
            }, 200);
        }
        return false;
    });
});


//＝＝＝＝＝強制リロード＝＝＝＝＝
//ブラウザバック対策＿＿オープンメニューそのままや画面遷移の青い画面が出っぱなしになるなど
window.onpageshow = function(event) {
	if (event.persisted) {
		window.location.reload();
	}
};


// ＝＝＝＝＝ヘッダーナビ＿＿MVの後に表示（トップページのみ）＝＝＝＝＝
$(function () {
    if ($('#about').length) {
        const headerShow = function () {
            const aboutPos = $('#about').offset().top;
            const scrollPos = $(window).scrollTop();
            if (scrollPos >= aboutPos - 560) {
                $('header').addClass('is-show');
            } else {
                $('header').removeClass('is-show');
            }
        };
        $(window).on('scroll', headerShow);
        headerShow();
    } else {
        // トップページ以外は常に表示する
        $('header').addClass('is-show');
    }
});

// ＝＝＝＝＝ハンバーガーメニュー＝＝＝＝＝
$(function () {
    $(document).on("click", ".hamburger", function () {
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
        interval: 7000,
        speed: 700,
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