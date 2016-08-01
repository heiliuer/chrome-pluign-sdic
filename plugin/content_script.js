var selectText = function () {
    if (document.selection) {
        return document.selection.createRange().text;
    } else {
        return window.getSelection().toString();
    }
}
$(document).on("mouseup", function () {
    var selection = selectText();
    if (selection) {
        chrome.runtime.sendMessage({
            type: "select",
            data: selection
        });
    }
});
// 判断域名
var isDomain = (function () {
    var cDomain = document.domain;
    return function (domain) {
        return cDomain.indexOf(domain) != -1;
    }
})();

// 移除dom
var adHandler = (function () {
    var $doc = $(document);
    return {
        remove: function (selector) {
            try {
                //console.log("remove ad: ", selector, " ",
                //		$doc.find(selector).length);
                $doc.find(selector).remove();
            } catch (e) {
                console.error("error remove:", selector);
                return;
            }
        },
        removes: function (selectors) {
            var self = this;
            selectors.forEach(function (selector) {
                self.remove(selector);
            });
        }
    }
})();
var blockConfig = {
    commom: ["[ad-data]", "[class^='ad_']", "[class^='ads-']",
        "[class^='ads_']", "[class^='ad-']", "[id$='AD']",
        "[class$='-ad']", "[class$='_ad']", "[adsid]", ".ad-box",
        "[id^='fn']"/* 百度全屏流氓广告 */],// 通用
    urls: [{
        url: "qq.com",// 腾讯新闻
        selectors: ["[id^='QQcom_']", "[id^='PD_PL_F']",
            "[id^='F_Rectangle_N']", "[id^='gaoqing_F_bottom']",
            "[class^='SogouKeywords']", "[id^='gdt_']",
            "[id^='coo_qqBrowser']"]
    }, {
        url: "csdn.net",// csdn
        selectors: [".header.clearfix", "[id^='ads_']", ".sidebar .hot"]
    }, {
        url: "6vhao.com",// 6v
        selectors: ["[id^='gg']", "#header .log,#header .topad",
            "[id^='ft_couplet_']"]
    }],
    iframes: {
        srcs: ["img.88rpg", "cpc.88", "ktunions.com", "gtimg.com",
            "cb.baidu.com/ecom", "sax.sina.com.cn", "x.jd.com",
            "801.tianya"],
        attrs: ["adconfig_lview", "adconfig_charset",
            "adconfig_lview_template", "srcdoc"]
    },
    hrefs: ["ccc.x.jd.com", "tk.859377"/* 全屏流氓广告 */, "sax.sina.com.cn"],
    srcs: ["to3.ysjwj.com", "sax.sina.com.cn", "tk.859377"]
};
var clearAds = function () {
    // 通用过滤
    adHandler.removes(blockConfig.commom);

    // 过滤具有src*,attrs特征的iframe
    blockConfig.iframes.srcs.forEach(function (src) {
        adHandler.remove("iframe[src*='" + src + "']");
    });
    blockConfig.iframes.attrs.forEach(function (attr) {
        adHandler.remove("iframe[" + attr + "]");
    });

    // 针对 hrefs过滤
    blockConfig.hrefs.forEach(function (href) {
        adHandler.remove("[href*='" + href + "']");
    });
    // 针对 srcs过滤
    blockConfig.srcs.forEach(function (src) {
        adHandler.remove("[src*='" + src + "']");
    });

    // 针对域名过滤
    blockConfig.urls.forEach(function (us) {
        if (isDomain(us.url)) {
            adHandler.removes(us.selectors);
        }
    });
}
//$(window).load(clearAds);
//setInterval(clearAds, 1000);
//$(document).ready(clearAds);
$(function () {
    clearAds();
    //进入路由器
    if (isDomain("192.168.1.1")) {
        $("#rtloginform #password").val("1234");
        $("#rtloginform #btnRtSubmit").click();
    }
    ;

    //设置企业号密码
    if (isDomain("qq.com")) {
        var delay = 1200;
        var timer;
        var password = "wanghao0923";
        function autoInputPwd() {
            if(timer){
                clearTimeout(timer);
            }
            timer=setTimeout(function () {
                try {
                    var $docFrame = $(window.frames[0].document);
                    $docFrame.ready(function () {
                        var $input = $docFrame.find("[type='password']");
                        $input.val(password).trigger("change input");
                        $docFrame.find(".mod-set-pwd__submit,.js_confirm").removeClass("button-primary_disabled disabled").removeAttr("disabled");
                        if(!$input.length){
                            autoInputPwd();
                        }
                    });
                } catch (e) {
                    autoInputPwd();
                }

                var $input = $("[type='password']").val(password).trigger("change input");
                $(".mod-set-pwd__submit,.js_confirm").removeClass("button-primary_disabled disabled").removeAttr("disabled");
                if(!$input.length){
                    autoInputPwd();
                }

            }, delay);
        }
        autoInputPwd();
    }

})
