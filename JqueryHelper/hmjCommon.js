(function(win, $){
	/*
	 * 创建常用Html元素
	 */
    $.jqElem = {
        Div: function () { return $('<div></div>'); },
        Frame: function () { return $('<iframe></iframe>'); },
        Span: function () { return $('<span></span>'); },
        InputText: function () { return $('<input type="text" />'); },
        InputButton: function () { return $('<input type="button" />'); },
        Li: function () { return $('<li></li>'); },
        Ul: function () { return $('<ul></ul>'); },
        A: function () { return $('<a></a>'); },
        TextArea: function () { return $('<textarea></textarea>'); },
        Script: function () { return $('<script></script>'); },
        Link: function () { return $('<link></link>'); }
    };

	/*
	 * 获取客户端屏幕尺寸
	 */
    $.screen = {
        Width: function () { return $(win).width(); },
        Height: function () { return $(win).height(); }
    };

	/*
	 * 常用检测
	 */
	$.check = {
	 	isNull: function (obj) { return ( !obj || $(obj).length <= 0 ); },
	 	isMoble: function (obj) { return /^(13[0-9]|14(5|7)|15([0-3]]|[5-9])|18(2|3|[6-9]))\d{8}$/i.test(obj); }
	};

	/*
	 * 根据参数名获取Url中参数的值
	 */
    $.getUrlParam = function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = win.location.search.substr(1).match(reg);
        if (!$.check.isNull(r)) return unescape(r[2]); return null;
    };

	/*
	 * Html编码
	 */
    $.htmlEncode = function (value) {
        return $.jqElem.createDiv().text(value).html();
    };

	/*
	 * Html解码
	 */
    $.htmlDecode = function (value) {
        return $.jqElem.createDiv().html(value).text();
    };

	/*
	 * Unicode编码
	 */
	$.toUnicode = function (value) {
		return escape(value).replace(/%/g,"\\").toLowerCase();
	};

	/*
	 * Unicode解码
	 */
	$.unUnicode = function (value) {
		return unescape(value.replace(/\\/g, "%"));
	};

	/*
	 * 获取随机数
	 */
    $.getRandom = function (max) {
    	if ($.check.isNull(max)) max = 10000;
        return Math.floor(Math.random() * max);
    };

	/*
	 * jQuery扩展--向目标元素内部的指定位置追加元素
	 */
	$.fn.appendAt = function(idx, elem) {
	 	var $this = $(this);
	 	var $obj = $this.children('*').eq(idx);
	 	if($.check.isNull($obj)) $this.append(elem);
	 	else $obj.before(elem);
	};

	/*
	 * jQuery扩展--追加元素到目标元素内部的指定位置
	 */
	$.fn.appendToAt = function(idx, parent) {
	 	var $this = $(this);
	 	$(parent).appendAt(idx, $this);
	};

	/*
	 * jQuery扩展--加载文件
	 */
	$.loadFile = {
		CSS: function (href) {
			$.jqElem.Link().attr({
				'type': 'text/css',
				'rel': 'stylesheet',
				'href': href + '?' + $.getRandom()
			}).appendToAt(0, 'head');
		},
		JS: function (src) {
			$.jqElem.Script().attr({
				'type': 'text/javascript',
				'src': src + '?' + $.getRandom()
			}).appendToAt(0, 'head');
		}
	};

	/*
	 * javascript扩展--Date格式化
	 */
	Date.prototype.format = function(format) {  
	    var o = {  
	        "M+": this.getMonth() + 1, //月份           
	        "d+": this.getDate(), //日           
	        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
	        "H+": this.getHours(), //小时           
	        "m+": this.getMinutes(), //分           
	        "s+": this.getSeconds(), //秒           
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
	        "S": this.getMilliseconds() //毫秒           
	    };  
	    var week = {  
	        "0": "\u65e5",  
	        "1": "\u4e00",  
	        "2": "\u4e8c",  
	        "3": "\u4e09",  
	        "4": "\u56db",  
	        "5": "\u4e94",  
	        "6": "\u516d"  
	    };  
	    if (/(y+)/.test(format)) {  
	        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
	    }  
	    if (/(E+)/.test(format)) {  
	        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);  
	    }  
	    for (var k in o) {  
	        if (new RegExp("(" + k + ")").test(format)) {  
	            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
	        }  
	    }  
	    return format;
	};
})(window, jQuery);
