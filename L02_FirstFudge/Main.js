"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);
        let mainNode = new fudge.Node("Main");
        let batLeft = new fudge.Node("Quad1");
        let batRight = new fudge.Node("Quad2");
        let ball = new fudge.Node("Ball");
        let batLeftMesh = new fudge.MeshQuad();
        let batLeftCmpMesh = new fudge.ComponentMesh(batLeftMesh);
        let batRightMesh = new fudge.MeshQuad();
        let batRightCmpMesh = new fudge.ComponentMesh(batRightMesh);
        let ballMesh = new fudge.MeshQuad();
        let ballCmpMesh = new fudge.ComponentMesh(ballMesh);
        mainNode.appendChild(batLeft);
        mainNode.appendChild(batRight);
        mainNode.appendChild(ball);
        batLeft.addComponent(batLeftCmpMesh);
        batRight.addComponent(batRightCmpMesh);
        ball.addComponent(ballCmpMesh);
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 1, 1)));
        let batLeftMat = new fudge.ComponentMaterial(mtrSolidWhite);
        let batRightMat = new fudge.ComponentMaterial(mtrSolidWhite);
        let ballMat = new fudge.ComponentMaterial(mtrSolidWhite);
        batLeft.addComponent(batLeftMat);
        batRight.addComponent(batRightMat);
        ball.addComponent(ballMat);
        batLeftCmpMesh.pivot.scaleX(0.1);
        batLeftCmpMesh.pivot.scaleY(0.5);
        batLeftCmpMesh.pivot.translateX(-1);
        batRightCmpMesh.pivot.scaleX(0.1);
        batRightCmpMesh.pivot.scaleY(0.5);
        batRightCmpMesh.pivot.translateX(1);
        ballCmpMesh.pivot.scaleX(0.075);
        ballCmpMesh.pivot.scaleY(0.075);
        let cam = new fudge.ComponentCamera();
        cam.pivot.translateZ(2);
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", mainNode, cam, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
        document.body.onkeydown = function (e) {
            if (e.keyCode == 87) {
                batLeftCmpMesh.pivot.translateY(0.01);
                viewport.draw();
            }
            else if (e.keyCode == 83) {
                batLeftCmpMesh.pivot.translateY(-0.01);
                viewport.draw();
            }
            if (e.keyCode == 38) {
                batRightCmpMesh.pivot.translateY(0.01);
                viewport.draw();
            }
            else if (e.keyCode == 40) {
                batRightCmpMesh.pivot.translateY(-0.01);
                viewport.draw();
            }
        };
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map