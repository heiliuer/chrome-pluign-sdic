/**
 * Created by heiliuer on 2017/3/8.
 */
+function (global) {
    global.dom_tips =
        `<div id="com_heiliuer_sdic_tip" style="">
        <style>
            #com_heiliuer_sdic_tip {
                min-width: 250px;
                max-width: 50%;
                text-align: left;
                position: fixed;
                left: 0px;
                top: 0px;
                opacity: 0.9;
                color: rgb(228, 27, 27) !important;
                font-weight: bold;
                font-size: 16px;
                line-height: 1.1em;
                z-index: 2147483647;
            / / 最大值 padding: 5 px;
                box-shadow: rgb(204, 204, 204) 6px 6px 4px;
                /*display: none;*/
                background-color: rgb(255, 255, 255) !important;
                padding: 7px;
            }
    
            #com_heiliuer_sdic_tip p {
                -webkit-margin-before: 0.5em;
                -webkit-margin-after: 0.5em;
            }
    
            #com_heiliuer_sdic_tip p:nth-of-type(1) {
                color: #333 !important;
            }
    
            #com_heiliuer_sdic_tip p:nth-of-type(2) {
            }
    
            #com_heiliuer_sdic_tip .close {
                position: absolute;
                right: 3px;
                top: 7px;
                border-radius: 50%;
                width: 1em;
                height: 1em;
                display: inline-block;
                text-align: center;
                line-height: 1em;
                color: #6f6f6f;
                font-weight: normal;
                cursor: pointer;
            }
    
            #phonetic {
                font-weight: normal;
                font-size: 12px;
                color: #fff !important;
                background: #3c3c3c;
                padding: 2px;
                border-radius: 2px;
                cursor: pointer;
    
            }
        </style>
    
    <span class="close">X</span>

    <p>电子/电工</p>
    <p>Electrical/electronic</p>
    <p></p>

    <div>
        <audio style="display: none" id="com_heiliuer_sdic_audio" data-audio="search" data-url-basic="http://dict.youdao.com/dictvoice?audio="></audio>
        <span id="phonetic" title="点击发音">发音</span>
    </div>

    <script>
        var audio = document.querySelector("#com_heiliuer_sdic_audio");
        function com_heiliuer_sdic_speak(){
            var dataset = audio.dataset;
//            console.log("audio",dataset)
            var audioKey = dataset["audio"];
            audio.src = dataset["urlBasic"] + audioKey;
            audio.play();
        }
        var phonetic = document.querySelector("#phonetic");
        phonetic.onmouseover = com_heiliuer_sdic_speak;
        phonetic.onclick = com_heiliuer_sdic_speak;
    </script>
</div>`;
}(window);
