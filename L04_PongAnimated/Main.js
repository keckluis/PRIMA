"use strict";
var L04_PongAnimated;
(function (L04_PongAnimated) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    let viewport;
    let paddleLeft = new fudge.Node("PaddleLeft");
    let paddleRight = new fudge.Node("PaddleRight");
    let ball = new fudge.Node("Ball");
    let keysPressed = {};
    let ballSpeed = new fudge.Vector3(0.1, 0.1, 0);
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
        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("keyup", handleKeyup);
        viewport.draw();
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start();
    }
    function update(_event) {
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_UP])
            paddleRight.cmpTransform.local.translateY(0.3);
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_DOWN])
            paddleRight.cmpTransform.local.translateY(-0.3);
        if (keysPressed[fudge.KEYBOARD_CODE.W])
            paddleLeft.cmpTransform.local.translateY(0.3);
        if (keysPressed[fudge.KEYBOARD_CODE.S])
            paddleLeft.cmpTransform.local.translateY(-0.3);
        moveBall();
        fudge.RenderManager.update();
        viewport.draw();
    }
    function handleKeydown(_event) {
        keysPressed[_event.code] = true;
    }
    function handleKeyup(_event) {
        keysPressed[_event.code] = false;
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
    function moveBall() {
        ball.cmpTransform.local.translate(ballSpeed);
    }
})(L04_PongAnimated || (L04_PongAnimated = {}));
//# sourceMappingURL=Main.js.map