/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L16_ScrollerControl {
    import fudge = FudgeCore;
  
    export enum ACTION {
      IDLE = "Idle",
      WALK = "Walk",
      JUMP = "Jump"
    }
    export enum DIRECTION {
      LEFT, RIGHT
    }
    export enum ITEM {
      NONE = "None", 
      GUN = "Gun", 
      SHIELD = "Shield"
    }
  
    export class Astronaut extends fudge.Node {
      private static sprites: Sprite[];
      private static speedMax: number = 1.5; // units per second
      public speed: number = 0;
      public item: ITEM = ITEM.NONE;
  
      constructor(_name: string = "Astronaut") {
        super(_name);
        this.addComponent(new fudge.ComponentTransform());
  
        for (let sprite of Astronaut.sprites) {
          let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
          nodeSprite.activate(false);
  
          nodeSprite.addEventListener(
            "showNext",
            (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
            true
          );
  
          this.appendChild(nodeSprite);
        }
  
        this.show(ACTION.IDLE, this.item);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
      }
  
      public static generateSprites(_txtImage: fudge.TextureImage): void {
        Astronaut.sprites = [];
        let sprite: Sprite = new Sprite(ACTION.WALK + "." + ITEM.NONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 0, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
  
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.NONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        sprite = new Sprite(ACTION.JUMP + "." + ITEM.NONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        sprite = new Sprite(ACTION.WALK + "." + ITEM.GUN);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 18, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
  
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.GUN);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        sprite = new Sprite(ACTION.JUMP + "." + ITEM.GUN);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        sprite = new Sprite(ACTION.WALK + "." + ITEM.SHIELD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 36, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
  
        sprite = new Sprite(ACTION.IDLE + "." + ITEM.SHIELD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);

        sprite = new Sprite(ACTION.JUMP + "." + ITEM.SHIELD);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
        Astronaut.sprites.push(sprite);
      }
  
      public show(_action: ACTION, _item: ITEM): void {
        for (let child of this.getChildren())
          child.activate(child.name == _action + "." + _item);
      }
  
      public act(_action: ACTION, _direction?: DIRECTION): void {
        let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
        switch (_action) {
          case ACTION.IDLE:
            this.speed = 0;
            break;
          case ACTION.WALK:
            this.speed = Astronaut.speedMax * direction;
            this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
            break;
          case ACTION.JUMP:
              
              break;
        }
        this.show(_action, this.item);
      }
  
      private update = (_event: fudge.Eventƒ): void => {

        let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
        this.cmpTransform.local.translateX(this.speed * timeFrame);
        this.broadcastEvent(new CustomEvent("showNext"));
      }
    }
  }