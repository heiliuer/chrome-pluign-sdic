+function (global) {

    var getSelectText = function () {
        if (document.selection) {
            return document.selection.createRange().text;
        } else {
            return window.getSelection().toString();
        }
    }

    var currentMouse$dom;

    $(document).on("mouseover", function (event) {
        currentMouse$dom = $(event.target)
    })


    var ctrlKey = 17, escKey = 27, cmdKey = 91;


    function getTip$dom() {
        var $dom = $("#com_heiliuer_sdic_tip");
        if (!$dom.length) {
            $dom = $(global.dom_tips).prependTo($("body"));
        }
        return $dom.hide();
    }

    var timeoutHideTip, timeoutHandlerCtrl, timeoutObj;

    function handlerCtrl() {
        var key = getSelectText() || (currentMouse$dom && currentMouse$dom.text() || currentMouse$dom.attr("title")) || "";
        if (key == "") {
        }
        chrome.runtime.sendMessage({
            type: "search_and_add_dom",
            data: key
        }, function (response) {
            // console.log("response:", response)
            var translation = response.translation;
            var $dom = getTip$dom();
            $dom.find("p:eq(0)").text(key)
            $dom.find("p:eq(1)").text(translation)
            $dom.find("p:eq(2)").text(((response.data || {}).basic || {}).phonetic)
            $dom.fadeIn();

            var isKeyEnglish = (key.match(/^[a-zA-Z0-9\s?><;,{}[\]\-_+=!@#$%\^&*|']*$/) || []).length > 0;
            $("#com_heiliuer_sdic_audio").attr("data-audio", isKeyEnglish ? key : translation);
            if (timeoutHideTip) {
                clearTimeout(timeoutHideTip);
            }
            var prevTime = 150 * Math.max(translation.length, key.length);
            timeoutObj = {
                callback: function () {
                    getTip$dom().fadeOut();
                    timeoutHideTip = null;
                },
                delay: Math.min(30 * 1000, Math.max(2 * 1000, prevTime))
            }
            timeoutHideTip = setTimeout(timeoutObj.callback, timeoutObj.delay);
        });
    }

    $(function () {
        var hoverInTime = 0;
        getTip$dom().hover(function () {
            // console.log('hoverIn')
            hoverInTime = Date.now();
            clearTimeout(timeoutHideTip);
        }, function () {
            // console.log('hoverOut')
            if (timeoutObj) {
                timeoutHideTip = setTimeout(timeoutObj.callback, Math.max(2000, (Date.now() - hoverInTime - timeoutObj.delay)));
            }
        });
    })

    $("<div id=\"plugin-heiliuer-sdic\">").appendTo(document.body);


    $(document).keydown(function (e) {
        if (e.keyCode == escKey) {
            getTip$dom().fadeOut();
        }
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) {
            // console.log("ctrl ")
            if (timeoutHandlerCtrl) {
                clearTimeout(timeoutHandlerCtrl);
            }
            timeoutHandlerCtrl = setTimeout(handlerCtrl, 300);
        } else {
            // console.log("other ", e.keyCode)
            if (timeoutHandlerCtrl) {
                clearTimeout(timeoutHandlerCtrl);
            }
        }
    });

    $(document).on("click", "#com_heiliuer_sdic_tip .close", function () {
        getTip$dom().fadeOut()
    });

    $(document).on("mouseup", function () {
        var selection = getSelectText();
        if (selection) {
            chrome.runtime.sendMessage({
                type: "select",
                data: selection
            });
        }
    });

}(window)