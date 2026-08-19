// no scroll
// setTimeout(function () {
//     $("body").removeClass("no-scroll");
//     $(".svg-logo").addClass("none")
// }, 2500); //跑svg動畫時間


// 鎖住 / 解鎖底層頁面的捲動（漢堡選單開啟時用）
// 直接對 body 下 overflow:hidden 會讓捲動位置跳回頂端，
// 所以改成記住位置 → position:fixed 配負 top → 關閉時還原
var scrollLockY = 0;
function lockScroll() {
    scrollLockY = $(window).scrollTop();
    $("body").addClass("no-scroll").css("top", -scrollLockY + "px");
}
function unlockScroll() {
    if (!$("body").hasClass("no-scroll")) return;
    $("body").removeClass("no-scroll").css("top", "");
    $(window).scrollTop(scrollLockY);
}

// nav
$(function () {
    $(".nav-btn").click(function () {
        $(this).toggleClass("is-active");
        // 這裡要先判斷「即將」的狀態，再決定鎖或解鎖
        var opening = !$(".nav-wrap").hasClass("is-active");
        $(".nav-wrap").toggleClass("is-active");
        if (opening) { lockScroll(); } else { unlockScroll(); }
    });
});



//服務流程
$(function () {
    $('.process-content').each(function () {
        var $tablist = $(this).find('.process-btn');
        var $tabAnchors = $tablist.find('a');
        var $tabPanels = $(this).find('.process-item');

        $tablist.on('click', 'a', function (event) {
            event.preventDefault();
            var $this = $(this);
            if ($this.hasClass('.active')) {
                return;
            }
            $tabAnchors.removeClass('active');
            $tabPanels.removeClass('active');
            $this.addClass('active');
            $($this.attr('href')).addClass('active');
        });
        $tabAnchors.eq(0).trigger('click');;
    });
});



// nav scroll
$(function () {


    //smoothscroll
    $('.nav-item a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        $('a').each(function () {
            $(this).removeClass('is-active');
        })
        $(this).addClass('is-active');

        var target = this.hash,
            menu = target;

        // 順序很重要：先關選單並解鎖，body 才會回到正常流排，
        // 之後的 offset() 才算得到正確座標，animate 也不會跟鎖定狀態打架
        $(".header-wrap, .nav-wrap, .nav-btn").removeClass("is-active");
        unlockScroll();

        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 120
        }, 500, 'swing');
    });
    // 
});


// header fixed
$(function () {
    $(window).scroll(function () {
        // 漢堡選單開啟時 body 被鎖成 position:fixed，文件高度塌陷、scrollTop 會歸零。
        // 這時若照常移除 fixHeader，.header-content 會失去 top:0 而退回「靜態位置」，
        // 也就是被推到畫面上方之外，logo 與關閉鈕就整個消失。
        // 鎖定期間不要動 fixHeader，維持開啟選單前的狀態。
        if ($("body").hasClass("no-scroll")) return;

        if ($(this).scrollTop() > 0) {
            $("#wrap").addClass("fixHeader");
        }
        else {
            $("#wrap").removeClass("fixHeader");
        }
    });
});


// gotop
// $(function () {
//     $(window).scroll(function () {
//         if ($(this).scrollTop() > 300) {
//             $(".btn-top").fadeIn();
//         } else {
//             $(".btn-top").fadeOut();
//         }
//     });
// });


