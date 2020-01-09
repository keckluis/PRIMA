/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L15_SpriteAnimation {
  import ƒ = FudgeCore;
  import Sprite = L14_ScrollerFoundation.Sprite;
  import NodeSprite = L14_ScrollerFoundation.NodeSprite;

  window.addEventListener("load", test);
  let sprite: Sprite;
  let root: ƒ.Node;

  function test(): void {
    let img: HTMLImageElement = document.querySelector("img");
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let txtImage: ƒ.TextureImage = new ƒ.TextureImage();
    txtImage.image = img;

    sprite = new Sprite("Astronaut");
    sprite.generateByGrid(txtImage, ƒ.Rectangle.GET(17, 0, 17, 17), 2, ƒ.Vector2.ZERO(), 17, ƒ.ORIGIN2D.BOTTOMCENTER);

    ƒ.RenderManager.initialize(true, false);
    root = new ƒ.Node("Root");
    let mtxAstronaut: ƒ.Matrix4x4;
    let astronaut: NodeSprite;

    astronaut = new NodeSprite("Astronaut0", sprite);
    astronaut.setFrameDirection(-1);
    root.appendChild(astronaut);

    astronaut = new NodeSprite("Astronaut1", sprite);
    mtxAstronaut = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(1));
    mtxAstronaut.scaleX(-1);
    astronaut.addComponent(new ƒ.ComponentTransform(mtxAstronaut));
    root.appendChild(astronaut);

    astronaut = new NodeSprite("Astronaut2", sprite);
    mtxAstronaut = ƒ.Matrix4x4.IDENTITY;
    astronaut.addComponent(new ƒ.ComponentTransform(mtxAstronaut));
    root.appendChild(astronaut);

    astronaut = new NodeSprite("Astronaut3", sprite);
    mtxAstronaut = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(-1));
    astronaut.addComponent(new ƒ.ComponentTransform(mtxAstronaut));
    root.appendChild(astronaut);

    for (let child of root.getChildren())
      child.addEventListener(
        "showNext",
        (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
        true
      );

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 5);

    function update(_event: ƒ.Eventƒ): void {
      // ƒ.Debug.log(frame);
      // root.showFrameNext();
      root.broadcastEvent(new CustomEvent("showNext"));
      root.getChildren()[3].cmpTransform.local.rotateY(5);
      mtxAstronaut = root.getChildren()[2].cmpTransform.local;
      mtxAstronaut.translateX(0.1);
      // ƒ.Debug.log(mtxAstronaut.translation.toString());
      if (mtxAstronaut.translation.x > 2)
        mtxAstronaut.translation = ƒ.Vector3.X(-2);


      viewport.draw();

      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }
}