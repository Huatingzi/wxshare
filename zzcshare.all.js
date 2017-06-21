/**
 2017/6/16  zheng_chun_yang
 **/

(function (win) {

    //默认参数，函数
    function noop() {
    }

    //默认参数 需要注入的api
    var jsApilists = [
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'showMenuItems',
        'hideAllNonBaseMenuItem'
    ];

    //微信默认可以分享的位置按钮  全部
    var shareList = [
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
    ];
    //app 默认可分享的位置 全部
    var appShareList = [
        'wxsession',
        'wxtimeline',
        'sina',
        'qq',
        'qqzone',
        'copy'
    ];

    //微信分享 校验默认参数
    function wxDefaults(target, source) {
        for (var i in source) {
            if (target[i] == undefined) {
                target[i] = source[i];
            }
        }
        return target;
    }

    //默认参数列表
    var defaultConfig = {
        appId: '',
        timestamp: '',
        nonceStr: '',
        signature: '',
        imgUrl: '',
        title: '',
        link: '',
        desc: '',
        shareList: shareList,
        appShareList: appShareList,
        success: noop,
        cancel: noop,
    };

    //主函数
    function ZZCShare(config) {
        var config = wxDefaults(config, defaultConfig);
        if (serverData.show_zzc_app === '1') {
            this.proxy = new AppShare(config);
        }
        else if (serverData.show_wx_jsdk === '1') {
            this.proxy = new WXShare(config)
        } else {
            console.log('您当前环境不是app与微信，无法实现分享功能');
        }
    }

    //原行对象
    ZZCShare.prototype = {
        constructor: ZZCShare,
        share: function () {
            this.proxy.share();
        }
    };


    //微信分享
    function WXShare(config) {
        this.init(config);
    }

    WXShare.prototype = {
        constructor: WXShare,
        init: function (config) {
            // 配置sdk
            var self = this;
            wx.config({
                debug: false,
                appId: config.appId, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature,// 必填，签名，见附录1
                jsApiList: jsApilists
            });
            wx.ready(function () {
                wx.hideAllNonBaseMenuItem();
                wx.showMenuItems({
                    menuList: config.shareList
                });
                wx.onMenuShareTimeline({   //分享到朋友圈
                    title: config.title,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    desc: config.desc,
                    success: function () {
                        config.success();     // 确认分享
                        self.hide(self.mark);
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享微信朋友圈/success');
                    },
                    cancel: function () {
                        // 取消分享
                        config.cancel();
                        self.hide(self.mark);
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享微信朋友圈/cancel');
                    }
                });
                wx.onMenuShareAppMessage({   //分享给朋友
                    title: config.title,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    desc: config.desc,
                    success: function () {
                        config.success();
                        self.hide(self.mark);// 确认分享
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享微信朋友/success');
                    },
                    cancel: function () {
                        // 取消分享
                        config.cancel();
                        self.hide(self.mark);
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享微信朋友/cancel');

                    }
                });
                wx.onMenuShareQQ({
                    title: config.title,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    desc: config.desc,
                    success: function () {
                        config.success();
                        self.hide(self.mark);
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享QQ/success');
                    },
                    cancel: function () {
                        config.cancel();
                        self.hide(self.mark);
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享QQ/cancel');
                    }
                });
                wx.onMenuShareWeibo({
                    title: config.title,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    desc: config.desc,
                    success: function () {
                        config.success();
                        self.hide(self.mark);
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享腾讯微博/success');
                    },
                    cancel: function () {
                        config.cancel();
                        self.hide(self.mark);
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享腾讯微博/cancel');
                    }
                });
                wx.onMenuShareQZone({
                    title: config.title,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    desc: config.desc,
                    success: function () {
                        config.success();
                        self.hide(self.mark);
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享QQ空间/success');
                    },
                    cancel: function () {
                        config.cancel();
                        self.hide(self.mark);
                        window.TongJi && window.TongJi.addPv(rootTj + '/分享QQ空间/cancel');
                    }
                });
            });
        },
        mark: {},
        share: function () {
            //弹出遮罩
            console.log('弹出遮罩');
            var maskStyle = 'height: 100%;background: rgba(0,0,0,0.8);position: fixed;width: 100%;z-index: 9999;top: 0;left:0;';
            var imgStyle = 'position: absolute;right: 0.4rem;width: 5.94rem;';

            var html = '<div class="J-weixin-share" style="' + maskStyle + '">' +
                '<img src="http://imgcdn1.zuzuche.com/static/71/19/8e4030ce13db425eab9c28c1015a0b44.png" alt="微信分享提示图" ' + 'style="' + imgStyle + '">' +
                '</div>';

            var self = this;
            $('body').append(html)
                .on('click', '.J-weixin-share', function () {
                    self.hide(this);
                });
            self.mark = $('.J-weixin-share');
        },
        hide: function (target) {
            //隐藏微信的弹窗
            if (target) {
                $(target).css('display', 'none');
            }
            return false;
        }
    };

    //微信分享
    function AppShare(config) {
        this.init(config);
        this.config = config;
    }


    //租租车分享
    AppShare.prototype = {
        constructor: AppShare,
        init: function (config) {
            var defaultConfig = [
                {title: '我的订单', type: 'myOrder', url: location.origin + '/account/'},
                {title: '通知', type: 'systemMessage', url: location.origin + '/group/chat/?_page=messages'},
                {
                    title: '分享',
                    type: 'share',
                    shareIcon: config.imgUrl,
                    shareTitle: config.title,
                    shareContent: config.desc,
                    shareURL: config.link + '?_ref=zzc_share',
                    sharePlatform: config.appShareList,
                },
                {title: '首页', type: 'home'},
                {title: '联系客服', type: 'contactCS'}
            ];
            zzc.call('appCustomRightBarList', {
                customItems: config && defaultConfig,
                success: function (response) {
                    console.log(response);
                }
            });

            zzc.on('app:share', function (response) {
                if (response.state == 0) {
                    config.success();
                } else if (response.state == 1001) {
                    config.cancel();
                }
            });
        },
        share: function () {
            var config = this.config;
            zzc.call('share', {
                title: config.title,
                content: config.desc,
                photo: config.imgUrl,
                shareUrl: config.link + '?_ref=zzc_share',
                sharePlatform: config.appShareList,
                success: function (response) {
                    console.log(response);
                }
            });
        }
    };


    win.ZZCShare = ZZCShare;

})(window);



