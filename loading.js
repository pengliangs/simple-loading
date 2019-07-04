/**
 * 数据加载loading
 * 2019-07-04 14:28
 * # 0.1
 * # render:{
 *     el:渲染元素块
 *     type: 0-11
 * },
 * close: 关闭指定index 不指定 index关闭所有
 * @author pengliang
 * @version 0.1
 */
layui.define(function (exports) {
    var $ = layui.$;
    var loading = {
        render: function (opt) {
            var that = this;
            var $el = opt.el ? $(opt.el) : $(document);
            var type = opt.type || 0;
            var time = opt.time;
            var index = that.randomIndex();
            $el.addClass("loading");
            $el.append(that.getLoadingHtml(type, index));

            if (time) {
                setTimeout(function () {
                    that.close(index);
                }, time);
            }
            return index;
        },
        close: function (index) {
            if (!index) {
                $(".loading-block[index]").parent().removeClass("loading");
                $(".loading-block[index]").remove();
                return;
            }
            $(".loading-block[index=" + index + "]").parent().removeClass("loading");
            $(".loading-block[index=" + index + "]").remove();
        },
        getLoadingHtml: function (type, index) {
            var that = this;
            if (type == 0) {
                return loadingModelHtml(function (templates) {
                    defaultLoading(templates);
                });
            }

            function defaultLoading(templates) {
                templates.push('<div class="loading-ball">');
                templates.push('<span></span><span></span><span></span><span></span>');
                templates.push('</div>');
            }

            function loadingModelHtml(consumer) {
                var templates = [];
                templates.push('<div class="loading-block" index="' + index + '">');
                consumer(templates);
                templates.push('</div>');
                return templates.join("");
            }

            return loadingModelHtml(function (templates) {
                var className = that.getGifClassMap()[String(type)];
                if (className) {
                    templates.push('<div class="' + className + '"></div>');
                    return;
                }
                defaultLoading(templates);
            });
        },
        getGifClassMap: function () {
            return {
                "1": "loading-rubik",
                "2": "loading-circle-1",
                "3": "loading-long-1",
                "4": "loading-diffusion",
                "5": "loading-long-2",
                "6": "loading-rubik-2",
                "7": "loading-circle-2",
                "8": "loading-circle-3",
                "9": "loading-circle-4",
                "10": "loading-circle-5",
                "11": "loading-circle-6"
            };
        },
        randomIndex: function () {
            return Math.floor(new Date().getTime() / (Math.random() * 1000));
        }
    };

    layui.link(layui.cache.base + "loading/loading.css");
    exports("loading", loading);
});