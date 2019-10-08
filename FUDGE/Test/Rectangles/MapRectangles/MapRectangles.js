var RenderManagerRendering;
(function (RenderManagerRendering) {
    var ƒ = FudgeCore;
    let map = new ƒ.FramingComplex();
    let uiResult;
    let frame = { x: 0, y: 0, width: 100, height: 100 };
    let uiMap;
    window.addEventListener("load", init);
    function init() {
        let menu = document.getElementsByTagName("div")[0];
        uiMap = new UI.FramingComplex();
        menu.appendChild(uiMap);
        uiMap.addEventListener("input", hndChange);
        uiMap.set({ Anchor: map.margin, Border: map.padding });
        let uiRectangle = new UI.Rectangle("Frame");
        uiRectangle.addEventListener("input", hndChange);
        menu.appendChild(uiRectangle);
        uiRectangle.set(frame);
        uiMap.set({ Result: map.getRect(frame) });
    }
    function hndChange(_event) {
        let target = _event.currentTarget;
        setValues(target);
    }
    function setValues(_uiSet) {
        let type = _uiSet.constructor.name;
        if (type == "Rectangle") {
            frame = _uiSet.get();
        }
        else {
            let value = _uiSet.get();
            for (let key in value) {
                switch (key) {
                    case "Anchor":
                        map.margin = value[key];
                        break;
                    case "Border":
                        map.padding = value[key];
                        break;
                    case "Result":
                        break;
                    default:
                        throw (new Error("Invalid name: " + _uiSet.name));
                }
            }
        }
        uiMap.set({ Result: map.getRect(frame) });
    }
})(RenderManagerRendering || (RenderManagerRendering = {}));
//# sourceMappingURL=MapRectangles.js.map