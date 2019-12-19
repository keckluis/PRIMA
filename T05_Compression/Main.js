"use strict";
var T05_Compression;
(function (T05_Compression) {
    T05_Compression.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    T05_Compression.game = new T05_Compression.ƒ.Node("FudgeCraft");
    T05_Compression.grid = new T05_Compression.Grid();
    let control = new T05_Compression.Control();
    let viewport;
    let camera;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        T05_Compression.ƒ.RenderManager.initialize(true);
        T05_Compression.ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new T05_Compression.ƒ.ComponentLight(new T05_Compression.ƒ.LightDirectional(T05_Compression.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new T05_Compression.ƒ.Vector3(0.5, 1, 0.8));
        // game.addComponent(cmpLight);
        let cmpLightAmbient = new T05_Compression.ƒ.ComponentLight(new T05_Compression.ƒ.LightAmbient(T05_Compression.ƒ.Color.DARK_GREY));
        T05_Compression.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        camera = new T05_Compression.CameraOrbit(75);
        T05_Compression.game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        camera.cmpCamera.getContainer().addComponent(cmpLight);
        // setup viewport
        viewport = new T05_Compression.ƒ.Viewport();
        viewport.initialize("Viewport", T05_Compression.game, camera.cmpCamera, canvas);
        T05_Compression.ƒ.Debug.log("Viewport", viewport);
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        T05_Compression.game.appendChild(control);
        startGame();
        //startTests();
        updateDisplay();
        T05_Compression.ƒ.Debug.log("Game", T05_Compression.game);
    }
    function startGame() {
        T05_Compression.grid.push(T05_Compression.ƒ.Vector3.ZERO(), new T05_Compression.GridElement(new T05_Compression.Cube(T05_Compression.CUBE_TYPE.BLACK, T05_Compression.ƒ.Vector3.ZERO())));
        startRandomFragment();
    }
    function updateDisplay() {
        viewport.draw();
    }
    T05_Compression.updateDisplay = updateDisplay;
    function hndPointerMove(_event) {
        // ƒ.Debug.log(_event.movementX, _event.movementY);
        camera.rotateY(_event.movementX * speedCameraRotation);
        camera.rotateX(_event.movementY * speedCameraRotation);
        updateDisplay();
    }
    function hndWheelMove(_event) {
        camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (_event.code == T05_Compression.ƒ.KEYBOARD_CODE.SPACE) {
            let frozen = control.freeze();
            let combos = new T05_Compression.Combos(frozen);
            handleCombos(combos);
            startRandomFragment();
        }
        let transformation = T05_Compression.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        updateDisplay();
    }
    function handleCombos(_combos) {
        for (let combo of _combos.found)
            if (combo.length > 2)
                for (let element of combo) {
                    let mtxLocal = element.cube.cmpTransform.local;
                    T05_Compression.ƒ.Debug.log(element.cube.name, mtxLocal.translation.getMutator());
                    // mtxLocal.rotateX(45);
                    // mtxLocal.rotateY(45);
                    // mtxLocal.rotateY(45, true);
                    mtxLocal.scale(T05_Compression.ƒ.Vector3.ONE(0.5));
                }
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? T05_Compression.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new T05_Compression.ƒ.Vector3(),
            translation: _transformation.translation ? T05_Compression.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new T05_Compression.ƒ.Vector3()
        };
        let timers = T05_Compression.ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        if (control.checkCollisions(move).length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        T05_Compression.ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            updateDisplay();
        });
    }
    function startRandomFragment() {
        let fragment = T05_Compression.Fragment.getRandom();
        control.cmpTransform.local = T05_Compression.ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    T05_Compression.startRandomFragment = startRandomFragment;
})(T05_Compression || (T05_Compression = {}));
//# sourceMappingURL=Main.js.map