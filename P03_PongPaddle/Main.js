"use strict";
var P03_PongPaddle;
(function (P03_PongPaddle) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    let viewport;
    let paddleLeft = new fudge.Node("PaddleLeft");
    let paddleRight = new fudge.Node("PaddleRight");
    let ball = new fudge.Node("Ball");
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        let pong = createPong();
        let cam = new fudge.ComponentCamera();
        cam.pivot.translateZ(40);
        paddleLeft.cmpTransform.local.translateX(-19.5);
        paddleRight.cmpTransform.local.translateX(19.5);
        paddleLeft.getComponent(fudge.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(fudge.ComponentMesh).pivot.scaleY(4);
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", pong, cam, canvas);
        fudge.Debug.log(viewport);
        viewport.draw();
    }
    function createPong() {
        let pong = new fudge.Node("Pong");
        paddleLeft.addComponent(new fudge.ComponentTransform());
        paddleRight.addComponent(new fudge.ComponentTransform());
        ball.addComponent(new fudge.ComponentTransform());
        let meshQuad = new fudge.MeshQuad();
        paddleLeft.addComponent(new fudge.ComponentMesh(meshQuad));
        paddleRight.addComponent(new fudge.ComponentMesh(meshQuad));
        ball.addComponent(new fudge.ComponentMesh(meshQuad));
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        paddleLeft.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        ball.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        pong.appendChild(ball);
        return pong;
    }
})(P03_PongPaddle || (P03_PongPaddle = {}));
//# sourceMappingURL=Main.js.map