"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L16_ScrollerControl;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L16_ScrollerControl) {
    var fudge = FudgeCore;
    let ACTION_ALIEN;
    (function (ACTION_ALIEN) {
        ACTION_ALIEN["IDLE"] = "Idle";
        ACTION_ALIEN["WALK"] = "Walk";
        ACTION_ALIEN["DEAD"] = "Dead";
    })(ACTION_ALIEN = L16_ScrollerControl.ACTION_ALIEN || (L16_ScrollerControl.ACTION_ALIEN = {}));
    let DIRECTION_ALIEN;
    (function (DIRECTION_ALIEN) {
        DIRECTION_ALIEN[DIRECTION_ALIEN["LEFT"] = 0] = "LEFT";
        DIRECTION_ALIEN[DIRECTION_ALIEN["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION_ALIEN = L16_ScrollerControl.DIRECTION_ALIEN || (L16_ScrollerControl.DIRECTION_ALIEN = {}));
    class Alien extends fudge.Node {
        constructor(_name = "Alien") {
            super(_name);
            // private action: ACTION_ALIEN;
            // private time: fudge.Time = new fudge.Time();
            this.speed = 0;
            this.update = (_event) => {
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.cmpTransform.local.translateX(this.speed * timeFrame);
                this.broadcastEvent(new CustomEvent("showNext"));
            };
            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateX(5);
            for (let sprite of Alien.sprites) {
                let nodeSprite = new L16_ScrollerControl.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(ACTION_ALIEN.IDLE);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Alien.sprites = [];
            let sprite = new L16_ScrollerControl.Sprite(ACTION_ALIEN.WALK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 8, 10), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Alien.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION_ALIEN.IDLE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(16, 0, 8, 10), 3, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Alien.sprites.push(sprite);
            sprite = new L16_ScrollerControl.Sprite(ACTION_ALIEN.DEAD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(40, 0, 8, 10), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Alien.sprites.push(sprite);
        }
        show(_action) {
            for (let child of this.getChildren())
                child.activate(child.name == _action);
            // this.action = _action;
        }
        act(_action, _direction) {
            let direction = (_direction == DIRECTION_ALIEN.RIGHT ? 1 : -1);
            switch (_action) {
                case ACTION_ALIEN.IDLE:
                    this.speed = 0;
                    break;
                case ACTION_ALIEN.WALK:
                    this.speed = Alien.speedMax * direction;
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                    break;
                case ACTION_ALIEN.DEAD:
                    break;
            }
            this.show(_action);
        }
    }
    Alien.speedMax = 1.5; // units per second
    L16_ScrollerControl.Alien = Alien;
})(L16_ScrollerControl || (L16_ScrollerControl = {}));
//# sourceMappingURL=Alien.js.map