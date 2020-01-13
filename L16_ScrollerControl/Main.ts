/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L16_ScrollerControl {
    export import fudge = FudgeCore;
    export import Sprite = L14_ScrollerFoundation.Sprite;
    export import NodeSprite = L14_ScrollerFoundation.NodeSprite;
  
    window.addEventListener("load", test);
  
    interface KeyPressed {
      [code: string]: boolean;
    }
    let keysPressed: KeyPressed = {};
  
    let game: fudge.Node;
    let astronaut: Astronaut;
  
  
    function test(): void {
      let canvas: HTMLCanvasElement = document.querySelector("canvas");
      let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
      let img: HTMLImageElement = document.querySelector("img");
      let txtAstronaut: fudge.TextureImage = new fudge.TextureImage();
      txtAstronaut.image = img;
      Astronaut.generateSprites(txtAstronaut);
  
      fudge.RenderManager.initialize(true, false);
      game = new fudge.Node("Game");
      astronaut = new Astronaut("Astronaut");
      game.appendChild(astronaut);
  
      let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
      cmpCamera.pivot.translateZ(5);
      cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
      cmpCamera.backgroundColor = fudge.Color.CSS("darkblue");
  
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
  
        crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
        crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
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
  
      astronaut.act(ACTION.IDLE);
    }
  }