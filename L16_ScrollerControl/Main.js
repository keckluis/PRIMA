"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L16_ScrollerControl;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L16_ScrollerControl) {
    L16_ScrollerControl.fudge = FudgeCore;
    L16_ScrollerControl.Sprite = L14_ScrollerFoundation.Sprite;
    L16_ScrollerControl.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let game;
    let astronaut;
    let txtAstronaut;
    function test() {
        let canvas = document.querySelector("canvas");
        let img = document.querySelector("img");
        txtAstronaut = new L16_ScrollerControl.fudge.TextureImage();
        txtAstronaut.image = img;
        L16_ScrollerControl.Astronaut.generateSprites(txtAstronaut);
        L16_ScrollerControl.fudge.RenderManager.initialize(true, false);
        game = new L16_ScrollerControl.fudge.Node("Game");
        astronaut = new L16_ScrollerControl.Astronaut("Astronaut");
        game.appendChild(astronaut);
        let cmpCamera = new L16_ScrollerControl.fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(L16_ScrollerControl.fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = L16_ScrollerControl.fudge.Color.CSS("black");
        let viewport = new L16_ScrollerControl.fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L16_ScrollerControl.fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L16_ScrollerControl.fudge.Loop.start(L16_ScrollerControl.fudge.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (keysPressed[L16_ScrollerControl.fudge.KEYBOARD_CODE.A]) {
            astronaut.act(L16_ScrollerControl.ACTION.WALK, L16_ScrollerControl.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L16_ScrollerControl.fudge.KEYBOARD_CODE.D]) {
            astronaut.act(L16_ScrollerControl.ACTION.WALK, L16_ScrollerControl.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[L16_ScrollerControl.fudge.KEYBOARD_CODE.W]) {
            astronaut.act(L16_ScrollerControl.ACTION.JUMP);
            return;
        }
        if (keysPressed[L16_ScrollerControl.fudge.KEYBOARD_CODE.ONE]) {
            astronaut.item = L16_ScrollerControl.ITEM.NONE;
            return;
        }
        if (keysPressed[L16_ScrollerControl.fudge.KEYBOARD_CODE.TWO]) {
            astronaut.item = L16_ScrollerControl.ITEM.GUN;
            return;
        }
        if (keysPressed[L16_ScrollerControl.fudge.KEYBOARD_CODE.THREE]) {
            astronaut.item = L16_ScrollerControl.ITEM.SHIELD;
            return;
        }
        astronaut.act(L16_ScrollerControl.ACTION.IDLE);
    }
})(L16_ScrollerControl || (L16_ScrollerControl = {}));
//# sourceMappingURL=Main.js.map