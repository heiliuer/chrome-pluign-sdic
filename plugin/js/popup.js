function nano(template, data) {
	var type = typeof data;
	if ("string number boolean".indexOf(type) != -1) {
		var attr = template.data("nano-key-attr");
		if (attr) {
			template.attr(attr, data);
		} else {
			template.append(data);
		}
		console.log("set value :" + data + " with selector:"
				+ template.selector);
	} else if (type == "object") {
		if (data instanceof Array) {
			var forItem = template.find("[data-nano-key-item]").remove();
			if (forItem.length != 0) {
				for (var index in data) {
					var newForItem = forItem.clone();
					template.append(newForItem);
					nano(newForItem, data[index]);
				}
			}
		} else {
			for (var name in data) {
				nano(template.find("[data-nano-" + name + "]"), data[name]);
			}
		}
	}
	return template;
}
var timerToSearch;
document.addEventListener('DOMContentLoaded', function() {
	var backPage = chrome.extension.getBackgroundPage();
	var selectData = backPage.selectData;
	var prevKey;
	if (selectData&&selectData == $.trim($("#key").val())) {
		return;
	}
	var $status = $("#status");
	var $key = $("#key").focus().on("input change", function() {
		var key = $(this).val().trim();
		if (key && prevKey == key) {
			return;
		}
		$("#holder").empty();
		$status.empty();
		if (timerToSearch) {
			clearTimeout(timerToSearch);
		}

		$("#phonetic").data("audio", key);
		key.search(/[u4e00-u9fa5]/) == -1
				? $("#phonetic").hide()
				: $("#phonetic").show();
		backPage.selectData = key;
		prevKey = key;
		if (key) {
			$status.text("正在查询");
			$("[data-key-action]").each(function(){
				$(this).attr("href",($(this).data("key-action")+"").replace(/%s/g,key));
			});
			$("[data-hover-show-action]").each(function(){
				var $self=$(this);
				var $target=$($self.data("hover-show-action"));
				var imgURI=encodeURI("http://qr.liantu.com/api.php?text="+key)
				$.get(imgURI,function () {
					$target.attr("src",imgURI)
				})

				$(this).click(function () {
					$target.toggle()
				})
			});
			timerToSearch = setTimeout(function() {
				$.ajax({
				url : "http://fanyi.youdao.com/openapi.do?keyfrom=mypydict&doctype=json&q="
				+ key + "&version=1.2&key=27855339&type=data",
				type : "get",
				dataType : "json",
				success : function(data) {
						$status.text("查询成功");
						var $content = nano($("#template").clone(), data);

						$content.find("p,li").each(function() {
									var $this = $(this);
									$.trim($this.html()) ? $this.show() : $this
											.hide();
								});
						$("#holder").empty().append($content.html());
					},
					error : function() {
						$status.text("查询失败");
					}
				});
			}, 200);
		}
	});
	if (selectData == 0 || selectData) {
		$key.val(selectData).trigger("input");
	}
	$(document).on("mouseover click", "[data-audio]", function() {
				var $audio = $("#audio");
				var audioKey = $(this).data("audio");
				if ($audio.length != 0) {
					$audio[0].src = $audio.data("url-basic") + audioKey;
					$audio[0].play();
				}
			})
});
