"use strict";
var T02_Grid;
(function (T02_Grid) {
    T02_Grid.fudge = FudgeCore;
    window.addEventListener("load", hndLoad);
    T02_Grid.game = new T02_Grid.fudge.Node("FudgeCraft");
    T02_Grid.grid = new T02_Grid.Grid();
    let control = new T02_Grid.Control();
    let viewport;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        T02_Grid.fudge.RenderManager.initialize(true);
        T02_Grid.fudge.Debug.log("Canvas", canvas);
        let cmpCamera = new T02_Grid.fudge.ComponentCamera();
        cmpCamera.pivot.translate(new T02_Grid.fudge.Vector3(4, 6, 20));
        cmpCamera.pivot.lookAt(T02_Grid.fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = T02_Grid.fudge.Color.WHITE;
        let cmpLight = new T02_Grid.fudge.ComponentLight(new T02_Grid.fudge.LightDirectional(T02_Grid.fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new T02_Grid.fudge.Vector3(0.5, 1, 0.8));
        T02_Grid.game.addComponent(cmpLight);
        let cmpLightAmbient = new T02_Grid.fudge.ComponentLight(new T02_Grid.fudge.LightAmbient(T02_Grid.fudge.Color.DARK_GREY));
        T02_Grid.game.addComponent(cmpLightAmbient);
        viewport = new T02_Grid.fudge.Viewport();
        viewport.initialize("Viewport", T02_Grid.game, cmpCamera, canvas);
        T02_Grid.fudge.Debug.log("Viewport", viewport);
        viewport.draw();
        startRandomFragment();
        T02_Grid.game.appendChild(control);
        viewport.draw();
        T02_Grid.fudge.Debug.log("Game", T02_Grid.game);
        window.addEventListener("keydown", hndKeyDown);
        //test();
    }
    function hndKeyDown(_event) {
        if (_event.code == T02_Grid.fudge.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = T02_Grid.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        // fudge.RenderManager.update();
        viewport.draw();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? T02_Grid.fudge.Vector3.SCALE(_transformation.rotation, fullRotation) : new T02_Grid.fudge.Vector3(),
            translation: _transformation.translation ? T02_Grid.fudge.Vector3.SCALE(_transformation.translation, fullTranslation) : new T02_Grid.fudge.Vector3()
        };
        let timers = T02_Grid.fudge.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        T02_Grid.fudge.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            // fudge.RenderManager.update();
            viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = T02_Grid.Fragment.getRandom();
        control.cmpTransform.local = T02_Grid.fudge.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    T02_Grid.startRandomFragment = startRandomFragment;
})(T02_Grid || (T02_Grid = {}));
//# sourceMappingURL=Main.js.map