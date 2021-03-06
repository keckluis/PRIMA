"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L16_ScrollerControl;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L16_ScrollerControl) {
    var fudge = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
    })(ACTION = L16_ScrollerControl.ACTION || (L16_ScrollerControl.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = L16_ScrollerControl.DIRECTION || (L16_ScrollerControl.DIRECTION = {}));
    let ITEM;
    (function (ITEM) {
        ITEM["NONE"] = "None";
        ITEM["GUN"] = "Gun";
        ITEM["SHIELD"] = "Shield";
    })(ITEM = L16_ScrollerControl.ITEM || (L16_ScrollerControl.ITEM = {}));
    class Astronaut extends fudge.Node {
        constructor(_name = "Astronaut") {
            super(_name);
            this.speed = 0;
            this.item = ITEM.NONE;
            this.update = (_event) => {
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.cmpTransform.local.translateX(this.speed * timeFrame);
                this.broadcastEvent(new CustomEvent("showNext"));
            };
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Astronaut.sprites) {
                let nodeSprite = new L16_ScrollerControl.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(ACTION.IDLE, this.item);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Astronaut.sprites = [];
            let sprite = new L16_ScrollerControl.Sprite(ACTION.WALK + "." + ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 0, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.IDLE + "." + ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.JUMP + "." + ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.WALK + "." + ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 18, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.IDLE + "." + ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.JUMP + "." + ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.WALK + "." + ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 36, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.IDLE + "." + ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.JUMP + "." + ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
        }
        show(_action, _item) {
            for (let child of this.getChildren())
                child.activate(child.name == _action + "." + _item);
        }
        act(_action, _direction) {
            let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
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
    }
    Astronaut.speedMax = 1.5; // units per second
    L16_ScrollerControl.Astronaut = Astronaut;
})(L16_ScrollerControl || (L16_ScrollerControl = {}));
//# sourceMappingURL=Astronaut.js.map