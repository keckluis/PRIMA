"use strict";
var T03_Camera;
(function (T03_Camera) {
    T03_Camera.fudge = FudgeCore;
    window.addEventListener("load", hndLoad);
    T03_Camera.game = new T03_Camera.fudge.Node("FudgeCraft");
    T03_Camera.grid = new T03_Camera.Grid();
    let control = new T03_Camera.Control();
    let camera = new T03_Camera.CameraOrbit(75);
    let viewport;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        T03_Camera.fudge.RenderManager.initialize(true);
        T03_Camera.fudge.Debug.log("Canvas", canvas);
        canvas.addEventListener("click", canvas.requestPointerLock);
        T03_Camera.game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        let cmpLight = new T03_Camera.fudge.ComponentLight(new T03_Camera.fudge.LightDirectional(T03_Camera.fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new T03_Camera.fudge.Vector3(0.5, 1, 0.8));
        T03_Camera.game.addComponent(cmpLight);
        let cmpLightAmbient = new T03_Camera.fudge.ComponentLight(new T03_Camera.fudge.LightAmbient(T03_Camera.fudge.Color.DARK_GREY));
        T03_Camera.game.addComponent(cmpLightAmbient);
        viewport = new T03_Camera.fudge.Viewport();
        viewport.initialize("Viewport", T03_Camera.game, camera.cmpCamera, canvas);
        T03_Camera.fudge.Debug.log("Viewport", viewport);
        viewport.draw();
        startRandomFragment();
        T03_Camera.game.appendChild(control);
        viewport.draw();
        T03_Camera.fudge.Debug.log("Game", T03_Camera.game);
        window.addEventListener("keydown", hndKeyDown);
        window.addEventListener("mousemove", hndMouseMove);
        window.addEventListener("wheel", hndWheel);
    }
    function hndKeyDown(_event) {
        if (_event.code == T03_Camera.fudge.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = T03_Camera.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        viewport.draw();
    }
    function hndMouseMove(_event) {
        camera.rotateY(-(_event.movementX * 0.3));
        camera.rotateX(-(_event.movementY * 0.3));
        viewport.draw();
    }
    function hndWheel(_event) {
        camera.translate(-(_event.deltaY * 0.1));
        viewport.draw();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? T03_Camera.fudge.Vector3.SCALE(_transformation.rotation, fullRotation) : new T03_Camera.fudge.Vector3(),
            translation: _transformation.translation ? T03_Camera.fudge.Vector3.SCALE(_transformation.translation, fullTranslation) : new T03_Camera.fudge.Vector3()
        };
        let timers = T03_Camera.fudge.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        T03_Camera.fudge.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = T03_Camera.Fragment.getRandom();
        control.cmpTransform.local = T03_Camera.fudge.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    T03_Camera.startRandomFragment = startRandomFragment;
})(T03_Camera || (T03_Camera = {}));
//# sourceMappingURL=Main.js.map