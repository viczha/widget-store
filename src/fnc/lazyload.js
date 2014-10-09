/**
 * Created by taozhang on 2014/10/9.
 */
/*
 图片延时加载，图片进入可视区域才加载图片
 author: taozhang
 */
define(['libs'], function (libs) {
    var options = {
        img_loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACWCAIAAAD18BI2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJFRjk1MkVFRUJBRDExRTM4NThGRkY1MUIyMjBEMzg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJFRjk1MkVGRUJBRDExRTM4NThGRkY1MUIyMjBEMzg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkVGOTUyRUNFQkFEMTFFMzg1OEZGRjUxQjIyMEQzODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkVGOTUyRURFQkFEMTFFMzg1OEZGRjUxQjIyMEQzODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7xt/mrAAAHq0lEQVR42uycvVcTaRhH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',
        img_error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACWCAIAAAD18BI2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM0Q0RDOTNFRUJBRDExRTNBODMyQzRGREZGMUVEQzEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM0Q0RDOTNGRUJBRDExRTNBODMyQzRGREZGMUVEQzEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzRDREM5M0NFQkFEMTFFM0E4MzJDNEZERkYxRURDMTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzRDREM5M0RFQkFEMTFFM0E4MzJDNEZERkYxRURDMTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6sxNSPAAAJrElEQVR42uycv09U3RZA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'
    };

    var lazyload = function (opt) {
        this.onloading = [];
        this.onComplete = [];
        this.onError = [];
        this.options = $.extend({}, options, opt || {})
    };

    /*
     实现 funciton.bind
     */
    var bind = function (fn, context) {
        var slice = Array.prototype.slice,
            args = slice.call(arguments, 2);
        return function () {
            return fn.apply(context, args.concat(slice.call(arguments, 0)));
        }
    };

    lazyload.prototype = {
        /*
         控件初始化，整个过程保证只被初始化一次
         @els: zepto或jquery对象集合
         */
        init: function (els) {
            if (this.inited === true) {
                return;
            }
            this.inited = true;
            if (els) {
                this._add(els);
            }
            this._update = bind(this.update, this);
            this.bindEvent();
        },
        /*
         往懒加载图片集合里添加新图片
         */
        add: function (els) {
            if (!this.inited) {
                this.init();
            }
            this._add(els);
        },
        /*
         私有方法，添加图片集合图片懒加载图片集合中
         */
        _add: function (els) {
            if (this.imgs) {
                this.imgs = this.imgs.add(els);
            } else {
                this.imgs = els;
            }
            els.attr('src', this.options.img_loading)
        },
        update: function () {
            if (!this.imgs) {
                return;
            }
            var i = 0, len = this.imgs.length, img, $img,
                self = this;
            for (; i < len; i++) {
                img = this.imgs[i];
                $img = $(this.imgs[i]);
                if (this.elemInViewport(img) && $img.attr('data-loaded') !== 'true') {
                    var reqImg = new Image();
                    var onload = bind(function (el, $el) {
                        this.triggerComplete(el);
                        $el.attr('data-loaded', true)
                        $el.attr('src', $el.attr('data-src'));
                    }, this, img, $img);
                    var onerror = bind(function (el, $el) {
                        this.triggerError();
                        $el.attr('data-loaded', true);
                        $el.attr('src', this.options.img_error);
                    }, this, img, $img);
                    $(reqImg).bind('error', onerror).bind('load', onload);
                    reqImg.src = $img.attr('data-src');
                }
            }
        },
        /*
         检测图片是否在可视范围内
         */
        elemInViewport: function (el) {
            var coords = el.getBoundingClientRect(),
                offsetY = 0,
                offsetX = 0;
            return (coords.top + coords.height) >= offsetY && (coords.left + coords.width) >= offsetX
                && coords.top <= (window.innerHeight || document.documentElement.clientHeight);
        },

        bindEvent: function () {
            $(window).bind({
                'scroll': this._update,
                'resize': this._update
            })
        },
        unbindEvent: function () {
            $(window).unbind({
                'scroll': this._update,
                'resize': this._update
            })
        },
        listenComplete: function (fn) {
            this.onComplete.push(fn);
        },
        triggerComplete: function (el) {
            var i = 0, len = this.onComplete.length, fn;
            for (; i < len; i++) {
                fn = this.onComplete[i];
                if (typeof fn === 'function') {
                    fn.call(el)
                }
            }
        },
        lisenError: function (fn) {
            this.onError.push(fn);
        },
        triggerError: function (el) {
            var i = 0, len = this.onError.length, fn;
            for (; i < len; i++) {
                fn = this.onError[i];
                if (typeof fn === 'function') {
                    fn.call(el)
                }
            }
        },
        listenLoading: function (fn) {
            this.onloading.push(fn);
        },
        triggerLoading: function (el) {
            var i = 0, len = this.onloading.length, fn;
            for (; i < len; i++) {
                fn = this.onloading[i];
                if (typeof fn === 'function') {
                    fn.call(el)
                }
            }
        },
        /*
         销毁对象
         */
        destroy: function () {
            this.inited = false;
            this.imgs = null;
            this.unbindEvent();
        }
    }

    return lazyload;

});