window.onload = function () {

    /*
    * 滑动选择
    * */

    //设置年龄选择的高和行高
    function setSelectHeight(dom1,dom2) {
        var height = $(dom1).height();
        $(dom2).height(height).css("line-height",height+"px");
    }
    setSelectHeight(".ageBtn","#ageSelected");
    setSelectHeight(".roomBtn",".roomSelect");
    setSelectHeight(".livingBtn",".livingSelect");
    //触发滚动
    function RollingSel(id,data) {
        new MobileSelect({
            trigger: id,
            wheels: [
                {data: data}
            ],
            position:[0],
            callback:function(indexArr, data){
                console.log(data);
            }
        });
    }

    //滑动选择值
    var ageArr = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999];
    var roomArr = [1,2,3,4,5];
    var nowLiveArr = ["市内六区","环城四区"];
    var willLiveArr = ["市区小房子","环外大房子"];
    //年龄选择
    RollingSel('#ageSelected',ageArr);

    //几室几厅选择
    RollingSel('#roomSelected1',roomArr);
    RollingSel('#roomSelected2',roomArr);

    //居住选择
    RollingSel('#livingNow',nowLiveArr);
    RollingSel('#livingWill',willLiveArr);

    function playBackgroundMusic() {
        if (!$('#btn-music').hasClass('play')) {
            $('#btn-music').addClass('play');
        }
        document.getElementById('music-bg').play();
    }

    function pauseBackgroundMusic() {
        $('#btn-music').removeClass('play');
        document.getElementById('music-bg').pause();
    }

    $('#btn-music').click(function () {
        var bgm = document.getElementById('music-bg');
        if (bgm.paused) {
            playBackgroundMusic();
        } else {
            pauseBackgroundMusic();
        }
    });

    $("#loading").css("display", "none");

    function clickAudioPlay() {
        document.getElementById('music-click').play();
    }

    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        onlyExternal: true,
        initialSlide: 0,
        onInit: function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper);
        },
        onTransitionEnd: function (swiper) {
            swiperAnimate(swiper);
        }
    });

    $(".page_next1").click(function () {
        clickAudioPlay();
        var age = $('#ageSelected').html();
        if (age == '199X') {
            $("#alertBox").css("display", "block");
            return;
        }
        mySwiper.slideNext();
    });

    $(".page_next2").click(function () {
        clickAudioPlay();
        var selectRoom = $('#roomSelected1').text();
        if (selectRoom == '') {
            $("#alertBox").css("display", "block");
            return;
        }

        var parlour = $('#roomSelected2').text();
        if (parlour == '') {
            $("#alertBox").css("display", "block");
            return;
        }
        mySwiper.slideNext();
    });

    $(".page_next8").click(function () {
        clickAudioPlay();
        mySwiper.slideNext();
    });

    //关闭提示框
    $(".close").click(function () {
        clickAudioPlay();
        $("#alertBox").css("display", "none");
    });

    //分享提示框
    $(".sharePage").click(function () {
        clickAudioPlay();
        $(".resultShare").css("display", "block");
    });

    $(".resultShare").click(function () {
        clickAudioPlay();
        $(".resultShare").css("display", "none");
    });

    //判断是否选择--单选
    function ifSelected(className, name) {
        $(className).click(function () {
            clickAudioPlay();
            var val = $('input:radio[name=' + name + ']:checked').val();
            if (val == null) {
                $("#alertBox").css("display", "block");
                return false;
            } else {
                mySwiper.slideNext();
            }
        })
    }

    //判断是否选择--多选
    function ifchecked(className, name) {
        $(className).click(function () {
            clickAudioPlay();
            if ($("input[name=" + name + "]").is(':checked')) {
                mySwiper.slideNext();
            } else {
                $("#alertBox").css("display", "block");
            }
        })
    }

    //单选点击效果
    function clickMove(className) {
        //点击效果
        $(className).click(function () {
            clickAudioPlay();
            $(className).removeClass("trs");
            $(this).addClass("trs");

            var srcV = $(this).parent().parent().siblings('p').find('img');
            $(srcV).each(function (i,o) {
                if($(o).attr('src').indexOf("-g")!=-1){
                    $(o).attr('src',$(o).attr('src').replace("-g",""));
                }
            });
            if($(this).attr("src").indexOf("-g")!=-1){

            }else{
                var srcValue = $(this).attr('src').split(".");
                var newSrcValue = srcValue[0]+"-g."+srcValue[1];
                $(this).attr("src",newSrcValue);
            }

        })
    }

    //多选点击效果
    function clickMoveTwo(className) {
        //点击效果
        $(className).click(function () {
            clickAudioPlay();
            if ($(this).hasClass("trs")) {
                $(this).removeClass("trs");
            } else {
                $(this).addClass("trs");
            }
            var srcV = $(this).attr('src');
            if(srcV.indexOf("-g")!=-1){
                srcV = srcV.replace('-g','');
                $(this).attr("src",srcV);
            }else {
                var srcValue = $(this).attr('src').split(".");
                var newSrcValue = srcValue[0]+"-g."+srcValue[1];
                $(this).attr("src",newSrcValue);
            }

        });
    }

    ifSelected(".selectedPage2", "page2");
    ifSelected(".selectedPage3", "page3");
    ifSelected(".selectedPage4", "page4");
    ifchecked(".selectedCheckbox1", "page6");
    ifchecked(".selectedCheckbox2", "page7");
    ifSelected(".selectedCheckbox3", "page8");

    //点击
    clickMove(".moveImg1");
    clickMove(".moveImg2");
    clickMove(".moveImg3");
    clickMoveTwo(".moveImgs1");
    clickMoveTwo(".moveImgs2");
    clickMove(".moveImgs3");

    ///最后一页
    $(".lastPage").click(function () {
        var ln = $('#livingNow').text();
        if (ln == '') {
            $("#alertBox").css("display", "block");
            return;
        }

        var lw = $('#livingWill').text();
        if (lw == '') {
            $("#alertBox").css("display", "block");
            return;
        }

        $(".waitingPage").css("display", "block");
        setTimeout(function () {
            var i = Math.floor(Math.random() * 9 + 1);

            $(".waitingPage").css("display", "none");
            $("#result" + i).css("display", "block");
        }, 3000);
    });

    //排序
    var byId = function (id) {
        return document.getElementById(id);
    };

    // Sortable.create(byId('sort'), {
    //     animation: 150,
    //     draggable: '.tile',
    //     handle: '.tile__name'
    // });
    //
    // [].forEach.call(byId('sort').getElementsByClassName('tile__list'), function (el) {
    //     Sortable.create(el, {
    //         group: 'photo',
    //         animation: 150
    //     });
    // });
    Sortable.create(byId('sort'), {
        group: "words",
        animation: 150,
        store: {
            get: function (sortable) {
                var order = localStorage.getItem(sortable.options.group);
                return order ? order.split('|') : [];
            },
            set: function (sortable) {
                var order = sortable.toArray();
                localStorage.setItem(sortable.options.group, order.join('|'));
            }
        },
        onAdd: function (evt){ console.log('onAdd.foo:', [evt.item, evt.from]); },
        onUpdate: function (evt){ console.log('onUpdate.foo:', [evt.item, evt.from]); },
        onRemove: function (evt){ console.log('onRemove.foo:', [evt.item, evt.from]); },
        onStart:function(evt){ console.log('onStart.foo:', [evt.item, evt.from]);},
        onSort:function(evt){ console.log('onStart.foo:', [evt.item, evt.from]);},
        onEnd: function(evt){ console.log('onEnd.foo:', [evt.item, evt.from]);}
    });

    function musicPlay(isPlay) {
        var media = document.getElementById('music-bg');
        if (isPlay && media.paused) {
            media.play();
        }
        if (!isPlay && !media.paused) {
            media.pause();
        }
    }

    function autoPlayMusic() {
        // 自动播放音乐效果，解决浏览器或者APP自动播放问题
        function musicInBrowserHandler() {
            musicPlay(true);
            document.body.removeEventListener('touchstart', musicInBrowserHandler);
        }

        document.body.addEventListener('touchstart', musicInBrowserHandler);

        // 自动播放音乐效果，解决微信自动播放问题
        function musicInWeixinHandler() {
            musicPlay(true);
            document.addEventListener("WeixinJSBridgeReady", function () {
                musicPlay(true);
            }, false);
            document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
        }

        if (!!wx) {
            wx.ready(function () {
                musicPlay(true);
            });
        }

        document.addEventListener('DOMContentLoaded', musicInWeixinHandler);

        document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                playBackgroundMusic();
            });
        }, false);
    }

    autoPlayMusic();

    // 解决横竖屏来回颠倒问题
    var oww = $(window).width();
    var owh = $(window).height();
    $(window).resize(function () {
        var nww = $(window).width();
        var nwh = $(window).height();

        if (oww < owh && nwh < nww) {
            window.location.reload();
        } else if (owh < oww && nww < nwh) {
            window.location.reload();
        } else {
            oww = nww;
            owh = nwh;
        }
    });
};