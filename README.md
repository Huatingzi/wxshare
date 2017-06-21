# 此项目集合了公司pp分享 和 微信分享的功能

# 项目依赖
```html
 <script src="//m.zuzuche.com/js/zepto-all.min.js"></script>
      <!-- IF show_wx_jsdk -->
      <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
      <!-- ENDIF -->
      <!-- IF show_zzc_app -->
      <script src="//m.zuzuche.com/static/bundles/zzcjssdk/zzc-1.1.0.js"></script>
      <!-- ENDIF -->
      <script src="//m.zuzuche.com/w/tidl/static/build/js/rem.min.js"></script>
```

# 使用参数配置
```html
   var myshare = new ZZCShare({
              appId: '{jssdk_sign.appId}',
              timestamp: '{jssdk_sign.timestamp}',
              nonceStr: '{jssdk_sign.nonceStr}',
              signature: '{jssdk_sign.signature}',
              imgUrl: 'http://pic24.nipic.com/20120831/10132780_100453579000_2.jpg',
              title: '租租车-精彩不断！',
              desc: '这是发送给朋友的描述信息',
              link: 'http://m.zuzuche.com',
              shareList:[
                  "menuItem:share:appMessage",
                  "menuItem:share:timeline",
                  "menuItem:share:qq"
              ],
              appShareList:[
                  'wxsession',
                  'wxtimeline',
              ],
              success: function(){
                  console.log('success');
              }
          });
      ```
    # 必须有的 全局变量
    ```html
     window.serverData={
            'show_zzc_app':'{show_zzc_app}',//zzc app
            'show_wx_jsdk':'{show_wx_jsdk}',//是否是微
        };
    ```

  # 按钮点击调取分享例子
  ```html
  $('.J-click-share').on('click',function () {
              myshare.share();
          })
  ```