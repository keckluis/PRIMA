"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L17_Gravity;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L17_Gravity) {
    L17_Gravity.fudge = FudgeCore;
    L17_Gravity.Sprite = L14_ScrollerFoundation.Sprite;
    L17_Gravity.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let astronaut;
    let txtAstronaut;
    function test() {
        let canvas = document.querySelector("canvas");
        let img = document.querySelector("img");
        txtAstronaut = new L17_Gravity.fudge.TextureImage();
        txtAstronaut.image = img;
        L17_Gravity.Astronaut.generateSprites(txtAstronaut);
        L17_Gravity.fudge.RenderManager.initialize(true, false);
        L17_Gravity.game = new L17_Gravity.fudge.Node("Game");
        astronaut = new L17_Gravity.Astronaut("Astronaut");
        L17_Gravity.level = createLevel();
        L17_Gravity.game.appendChild(L17_Gravity.level);
        L17_Gravity.game.appendChild(astronaut);
        let cmpCamera = new L17_Gravity.fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(L17_Gravity.fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = L17_Gravity.fudge.Color.CSS("black");
        let viewport = new L17_Gravity.fudge.Viewport();
        viewport.initialize("Viewport", L17_Gravity.game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L17_Gravity.fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L17_Gravity.fudge.Loop.start(L17_Gravity.fudge.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (keysPressed[L17_Gravity.fudge.KEYBOARD_CODE.A]) {
            astronaut.act(L17_Gravity.ACTION.WALK, L17_Gravity.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L17_Gravity.fudge.KEYBOARD_CODE.D]) {
            astronaut.act(L17_Gravity.ACTION.WALK, L17_Gravity.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[L17_Gravity.fudge.KEYBOARD_CODE.W]) {
            astronaut.act(L17_Gravity.ACTION.JUMP);
            return;
        }
        //ITEMS
        if (keysPressed[L17_Gravity.fudge.KEYBOARD_CODE.ONE]) {
            astronaut.item = L17_Gravity.ITEM.NONE;
            return;
        }
        if (keysPressed[L17_Gravity.fudge.KEYBOARD_CODE.TWO]) {
            astronaut.item = L17_Gravity.ITEM.GUN;
            return;
        }
        if (keysPressed[L17_Gravity.fudge.KEYBOARD_CODE.THREE]) {
            astronaut.item = L17_Gravity.ITEM.SHIELD;
            return;
        }
        if (keysPressed[L17_Gravity.fudge.KEYBOARD_CODE.FOUR]) {
            astronaut.item = L17_Gravity.ITEM.JETPACK;
            return;
        }
        astronaut.act(L17_Gravity.ACTION.IDLE);
    }
    function createLevel() {
        let level = new L17_Gravity.fudge.Node("Level");
        let floor = new L17_Gravity.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        level.appendChild(floor);
        floor = new L17_Gravity.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateY(0.2);
        floor.cmpTransform.local.translateX(1.5);
        level.appendChild(floor);
        return level;
    }
})(L17_Gravity || (L17_Gravity = {}));
//# sourceMappingURL=Main.js.map