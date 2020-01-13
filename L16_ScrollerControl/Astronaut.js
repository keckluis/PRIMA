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
    class Astronaut extends fudge.Node {
        constructor(_name = "Astronaut") {
            super(_name);
            // private action: ACTION;
            // private time: fudge.Time = new fudge.Time();
            this.speed = 0;
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
            this.show(ACTION.IDLE);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Astronaut.sprites = [];
            let sprite = new L16_ScrollerControl.Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(16, 0, 16, 16), 2, fudge.Vector2.ZERO(), 16, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 16, 16), 1, fudge.Vector2.ZERO(), 16, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION.JUMP);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(48, 0, 16, 16), 1, fudge.Vector2.ZERO(), 16, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
        }
        show(_action) {
            for (let child of this.getChildren())
                child.activate(child.name == _action);
            // this.action = _action;
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
            this.show(_action);
        }
    }
    Astronaut.speedMax = 1.5; // units per second
    L16_ScrollerControl.Astronaut = Astronaut;
})(L16_ScrollerControl || (L16_ScrollerControl = {}));
//# sourceMappingURL=Astronaut.js.map