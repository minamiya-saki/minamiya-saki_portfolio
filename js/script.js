// ハンバーガーメニュー
$(function () {
    $(".hamburger").on("click", function (){
        $(".header__nav--sp").toggleClass("open");
        $(".hamburger").toggleClass("open");
        $(".hamburger__overlay").toggleClass("open");
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