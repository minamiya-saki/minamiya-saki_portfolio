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
        $('.mv__object').addClass('is-mv-show');
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
        $('.mv__object').addClass('is-mv-show');
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
    includeHtml('#header', 'header.html', function () {
        // トップページ以外は最初から表示
        if (!$('#about').length) {
            $('#header header').addClass('is-show');
        }
    });
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
$(document).on(
    //表示しているHTMLページ全体
    "click",
    //クリックしたら
    'a:not([href^="#"]):not([data-remodal-target]):not([href*="https://www.instagram.com/373_valley_design?stkn=MXAxNTZ2bGgxdW9zdQ=="]):not([href*="https://lin.ee/58rOvTp"])',
    //でもhrefが＃で始まるもの、モーダル、InstagramとLINEのリンクは除外
    function (e) {
        //クリックに関する情報をeとして受け取る
        const link = this;
        //クリックされたaタグをlinkという名前で覚えておく
            // 同じページ内のハッシュリンクならフェードせずにスクロールだけ
        const samePage =
        //同じページがどうかの結果をsamePageという名前で保存
        link.hash &&
        // このリンクには＃がついている？かつ、
        link.pathname.replace(/index\.html$/, "") ===
        //クリックしたリンクのページ名、からindex.htmlを取り除いたもの、と「現在のページのパス」を比べる
            location.pathname.replace(/index\.html$/, "");
            //クリックしたリンクのページと、今いるページは同じか？
            if (samePage) {
            //samePage（同じページかどうか）がtrueだったら
            $(".header__nav--sp, .hamburger, .hamburger__overlay").removeClass(
            "open",
            //↑の要素からopenというクラスを削除
            );
            return; // デフォルト動作（スムーススクロール）に任せる
        }
        e.preventDefault();
        //ブラウザが本来するリンク移動を一旦止める
        const url = $(this).attr("href");
         //クリックされたリンク（aタグ）のhrefの中身を取得して、urlという名前で保存
        if (url !== "") {
        //urlが空っぽじゃなかったら、〜ではない
        $("body").addClass("fadeOut");
        //空っぽでないなら、bodyにfadeOutのクラスを追加
        setTimeout(function () {
            //少し時間を置いてから中の処理を実行
            window.location = url;
             //urlに保存しておいたページへ0.2s後に移動
            }, 200);
        }
        return false;
    },
    );


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
        $(document).on("mouseenter", "a, summary, .splide__arrow, .splide__pagination__page, .c-form__submit button", function () {
        stalker.addClass("js-hover");
    });

    $(document).on("mouseleave", "a, summary, .splide__arrow, .splide__pagination__page, .c-form__submit button", function () {
        stalker.removeClass("js-hover");
    });
}); 


// ＝＝＝＝＝サービス＝＝＝＝＝
// SP版ではタップでホバーと同じ動き
$(function () {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;
    $('.service__circle').on('click', function () {
        // 他の円は閉じる
        $('.service__circle').not(this).removeClass('is-active');
        $(this).toggleClass('is-active');
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