/**
 * Created by heiliuer on 2017/3/8.
 */
+function (global) {
    global.dom_tips = `<div id="com_heiliuer_sdic_tip" style="">
    <style>
        #com_heiliuer_sdic_tip {
            min-width: 250px;
            max-width: 50%;
            text-align: left;
            position: fixed;
            left: 0px;
            top: 0px;
            opacity: 0.9;
            color: rgb(228, 27, 27);
            font-weight: bold;
            font-size: 16px;
            line-height: 1.1em;
            z-index: 100000;
            padding: 5px;
            box-shadow: rgb(204, 204, 204) 6px 6px 4px;
            /*display: none;*/
            background-color: rgb(255, 255, 255);
        }

        #com_heiliuer_sdic_tip p {
            -webkit-margin-before: 0.5em;
            -webkit-margin-after: 0.5em;
        }

        #com_heiliuer_sdic_tip p:nth-of-type(1) {
            color: #333;
        }

        #com_heiliuer_sdic_tip p:nth-of-type(2) {
        }

        #phonetic{
            color: #222;
            font-weight: normal;
            font-size: 12px;
            color: #fff;
            background: #3c3c3c;
            padding: 2px;
            border-radius: 2px;
            cursor: pointer;

        }
    </style>

    <p>电子/电工</p>
    <p>Electrical/electronic</p>

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
        let phonetic = document.querySelector("#phonetic");
        phonetic.onmouseover = com_heiliuer_sdic_speak;
        phonetic.onclick = com_heiliuer_sdic_speak;
    </script>
</div>`;

}(window)