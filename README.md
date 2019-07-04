# 一个简单的举报loading小工具

* 参考[Guns](https://www.stylefeng.cn/) 的 `loading style` 
*  借用 [lading](<http://www.neusofts.com/demo/loading/layui_exts/loading/demo/index.html>) 的gif

# 使用

```lua
├─layui
│─loading
  └─compression     压缩后的loading
  └─img             gif
  └─loading.css
  └─loading.js  
│─index             示例demo
└─README.md
```

* 通过 `loading.render` 显示渲染 `loading.close` 关闭

```javascript
layui.config({
    base: './',
    //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
    version: true,
    //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
    debug: true
}).extend({
    loading: "loading/loading"
}).use(['loading'], function () {
    var $ = layui.jquery;
    var loading = layui.loading;

    var oneLoadingIndex = loading.render({
        el: "#loading-0"
    });

    restLoading();

    var active = {
        close: function () {
            loading.close(oneLoadingIndex);
        }
        , closeAll: function () {
            loading.close();
        }
        , reset: function () {
            restLoading();
        }
    }

    function restLoading(){
        for (var i = 1; i < 12; i++) {
            loading.render({
                el: "#loading-" + i,
                type: i
            });
        }
    }
    $('.loading-body .layui-btn').on('click', function () {
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });

});
```

# 参数预览

| 属性名    | 可选值                | 描述                          |
| --------- | --------------------- | ----------------------------- |
| el        | 默认:绑定body标签     | 绑定元素                      |
| type      | 可选0-12 默认:0       | 类型                          |
| time      | 无                    | 销毁时间，秒                  |
| className | 默认: default-loading | 默认style 背景白色 透明度 0.8 |

