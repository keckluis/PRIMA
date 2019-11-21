"use strict";
var T02_Grid;
(function (T02_Grid) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let game;
    let rotate = fudge.Vector3.ZERO();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 22));
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        game = new fudge.Node("FudgeCraft");
        // corner
        let fragment = new T02_Grid.Fragment(0);
        fragment.cmpTransform.local.translate(new fudge.Vector3(-5, 5, 0));
        game.appendChild(fragment);
        // quad
        fragment = new T02_Grid.Fragment(1);
        fragment.cmpTransform.local.translate(new fudge.Vector3(0, 5, 0));
        game.appendChild(fragment);
        // s
        fragment = new T02_Grid.Fragment(2);
        fragment.cmpTransform.local.translate(new fudge.Vector3(5, 5, 0));
        game.appendChild(fragment);
        // long
        fragment = new T02_Grid.Fragment(3);
        fragment.cmpTransform.local.translate(new fudge.Vector3(-5, 0, 0));
        game.appendChild(fragment);
        // zig zag 1
        fragment = new T02_Grid.Fragment(4);
        fragment.cmpTransform.local.translate(new fudge.Vector3(0, 0, 0));
        game.appendChild(fragment);
        // zig zag 2
        fragment = new T02_Grid.Fragment(5);
        fragment.cmpTransform.local.translate(new fudge.Vector3(5, 0, 0));
        game.appendChild(fragment);
        // L
        fragment = new T02_Grid.Fragment(6);
        fragment.cmpTransform.local.translate(new fudge.Vector3(0, -5, 0));
        game.appendChild(fragment);
        let cmpLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        fudge.Debug.log("Viewport", viewport);
        viewport.draw();
        fudge.Debug.log("Game", game);
        window.addEventListener("keydown", hndKeyDown);
    }
    function hndKeyDown(_event) {
        switch (_event.code) {
            case fudge.KEYBOARD_CODE.ARROW_UP:
                rotate.add(fudge.Vector3.X(-90));
                break;
            case fudge.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(fudge.Vector3.X(90));
                break;
            case fudge.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(fudge.Vector3.Y(-90));
                break;
            case fudge.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(fudge.Vector3.Y(90));
                break;
        }
        for (let fragment of game.getChildren()) {
            fragment.cmpTransform.local.rotation = rotate;
        }
        fudge.RenderManager.update();
        viewport.draw();
    }
})(T02_Grid || (T02_Grid = {}));
//# sourceMappingURL=Main.js.map