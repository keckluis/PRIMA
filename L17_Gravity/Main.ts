/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L17_Gravity {
    export import fudge = FudgeCore;
    export import Sprite = L14_ScrollerFoundation.Sprite;
    export import NodeSprite = L14_ScrollerFoundation.NodeSprite;
  
    window.addEventListener("load", test);
  
    interface KeyPressed {
      [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};
  
    export let game: fudge.Node;
    export let level: fudge.Node;
    let astronaut: Astronaut;
    let txtAstronaut: fudge.TextureImage;  
  
    function test(): void {
      let canvas: HTMLCanvasElement = document.querySelector("canvas");
      let img: HTMLImageElement = document.querySelector("img");
      txtAstronaut = new fudge.TextureImage();
      txtAstronaut.image = img;
      Astronaut.generateSprites(txtAstronaut);
  
      fudge.RenderManager.initialize(true, false);
      game = new fudge.Node("Game");
      astronaut = new Astronaut("Astronaut");
      level = createLevel();
      game.appendChild(level);
      game.appendChild(astronaut);
  
      let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
      cmpCamera.pivot.translateZ(5);
      cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
      cmpCamera.backgroundColor = fudge.Color.CSS("black");
  
      let viewport: fudge.Viewport = new fudge.Viewport();
      viewport.initialize("Viewport", game, cmpCamera, canvas);
      viewport.draw();
  
      document.addEventListener("keydown", handleKeyboard);
      document.addEventListener("keyup", handleKeyboard);
  
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
      fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 10);
  
      function update(_event: fudge.Eventƒ): void {
        processInput();
  
        viewport.draw();
      }
    }
  
    function handleKeyboard(_event: KeyboardEvent): void {
      keysPressed[_event.code] = (_event.type == "keydown");
    }
  
    function processInput(): void {
      if (keysPressed[fudge.KEYBOARD_CODE.A]) {
        astronaut.act(ACTION.WALK, DIRECTION.LEFT);
        return;
      }

      if (keysPressed[fudge.KEYBOARD_CODE.D]) {
        astronaut.act(ACTION.WALK, DIRECTION.RIGHT);
        return;
      }
      
      if (keysPressed[fudge.KEYBOARD_CODE.W]) {
        astronaut.act(ACTION.JUMP);
        return;
      }
      
      //ITEMS
      if (keysPressed[fudge.KEYBOARD_CODE.ONE]) {
        astronaut.item = ITEM.NONE;
        return;
      }
      if (keysPressed[fudge.KEYBOARD_CODE.TWO]) {
        astronaut.item = ITEM.GUN;
        return;
      }
      if (keysPressed[fudge.KEYBOARD_CODE.THREE]) {
        astronaut.item = ITEM.SHIELD;
        return;
      }
      if (keysPressed[fudge.KEYBOARD_CODE.FOUR]) {
        astronaut.item = ITEM.JETPACK;
        return;
      }
  
      astronaut.act(ACTION.IDLE);
    }

    function createLevel(): fudge.Node {
      let level: fudge.Node = new fudge.Node("Level");
      let floor: Floor = new Floor();
      floor.cmpTransform.local.scaleY(0.2);
      level.appendChild(floor);
  
      floor = new Floor();
      floor.cmpTransform.local.scaleY(0.2);
      floor.cmpTransform.local.scaleX(2);
      floor.cmpTransform.local.translateY(0.2);
      floor.cmpTransform.local.translateX(1.5);
      level.appendChild(floor);
  
      return level;
    }
  }