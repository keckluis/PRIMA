var TimeLoop;
(function (TimeLoop) {
    var ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start");
        document.forms[0].addEventListener("change", handleChangeLoop);
        document.forms[1].addEventListener("change", handleChangeTime);
        document.querySelector("[name=start]").addEventListener("click", handleButtonClick);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, handleFrame);
        loop();
    }
    function handleChangeLoop(_event) {
        let formData = new FormData(document.forms[0]);
        let mode = String(formData.get("mode"));
        let fps = Number(formData.get("fps"));
        ƒ.Loop.start(ƒ.LOOP_MODE[mode], fps, true);
    }
    function handleChangeTime(_event) {
        let formData = new FormData(_event.currentTarget);
        let scale = Number(formData.get("scale"));
        ƒ.Time.game.setScale(scale);
        console.log("Scale set to: " + scale);
    }
    function handleButtonClick(_event) {
        let timeout = Number(document.querySelector("input[name=timeout]").value);
        console.log("Timeout set to: " + timeout);
        ƒ.Time.game.setTimeout(handleTimeout, timeout);
    }
    function handleTimeout() {
        let meter = document.querySelector("[name=event]");
        meter.value = 1 + meter.value % 10;
    }
    function handleFrame(_event) {
        let meter = document.querySelector("[name=frame]");
        meter.value = 1 + meter.value % 10;
        let avg = document.querySelector("[name=avg]");
        avg.value = ƒ.Loop.getFpsRealAverage().toFixed(1);
    }
    function loop() {
        let time = document.querySelector("[name=time]");
        let date = new Date(ƒ.Time.game.get());
        // time.value = ƒ.Time.game.get().toPrecision();
        time.value =
            String(date.getMinutes()).padStart(2, "0") + ":" +
                String(date.getSeconds()).padStart(2, "0") + ":" +
                String(date.getMilliseconds()).padStart(3, "0");
        window.requestAnimationFrame(loop);
    }
})(TimeLoop || (TimeLoop = {}));
//# sourceMappingURL=TimeLoop.js.map