// $(function () {
//     $(".hamburger").on("click", function (){
//         $(".header__nav--sp").fadeToggle();
//         $(".hamburger").toggleClass("open");
//     });
// });


$(function () {
    $(".hamburger").on("click", function (){
        $(".header__nav--sp").toggleClass("open");
        $(".hamburger").toggleClass("open");
    });
});