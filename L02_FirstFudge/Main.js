"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);
        let node = new fudge.Node("Quad");
        let mesh = new fudge.MeshQuad();
        let cmpMesh = new fudge.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let cmpMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let cam = new fudge.ComponentCamera();
        cam.pivot.translateZ(2);
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", node, cam, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map