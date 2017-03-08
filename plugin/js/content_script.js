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
        return $dom;
    }

    var timeout;
    $(document).keydown(function (e) {
        if (e.keyCode == escKey) {
            getTip$dom().fadeOut();
        }
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) {
            var key = getSelectText() || (currentMouse$dom && currentMouse$dom.text() || currentMouse$dom.attr("title")) || "";
            if (key == "") {
                return;
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
                $dom.fadeIn();
                $("#com_heiliuer_sdic_audio").attr("data-audio", translation);
                if (timeout) {
                    clearTimeout(timeout);
                }
                var prevTime = 100 * translation.length;
                timeout = setTimeout(function () {
                    $dom.fadeOut();
                }, Math.min(30 * 1000, Math.max(2 * 1000, prevTime)));
            });

        }
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