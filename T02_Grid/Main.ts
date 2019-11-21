namespace T02_Grid {

    import fudge = FudgeCore;

    window.addEventListener("load", hndLoad);

    let viewport: fudge.Viewport;
    let game: fudge.Node;
    let rotate: fudge.Vector3 = fudge.Vector3.ZERO();

    function hndLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);

        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 22));
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());

        game = new fudge.Node("FudgeCraft");

        // corner
        let fragment: Fragment = new Fragment(0);
        fragment.cmpTransform.local.translate(new fudge.Vector3(-5, 5, 0));
        game.appendChild(fragment);

        // quad
        fragment = new Fragment(1);
        fragment.cmpTransform.local.translate(new fudge.Vector3(0, 5, 0));
        game.appendChild(fragment);

        // s
        fragment = new Fragment(2);
        fragment.cmpTransform.local.translate(new fudge.Vector3(5, 5, 0));
        game.appendChild(fragment);

        // long
        fragment = new Fragment(3);
        fragment.cmpTransform.local.translate(new fudge.Vector3(-5, 0, 0));
        game.appendChild(fragment);

        // zig zag 1
        fragment = new Fragment(4);
        fragment.cmpTransform.local.translate(new fudge.Vector3(0, 0, 0));
        game.appendChild(fragment);

        // zig zag 2
        fragment = new Fragment(5);
        fragment.cmpTransform.local.translate(new fudge.Vector3(5, 0, 0));
        game.appendChild(fragment);

        // L
        fragment = new Fragment(6);
        fragment.cmpTransform.local.translate(new fudge.Vector3(0, -5, 0));
        game.appendChild(fragment);

        let cmpLight: fudge.ComponentLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);

        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        fudge.Debug.log("Viewport", viewport);

        viewport.draw();

        fudge.Debug.log("Game", game);

        window.addEventListener("keydown", hndKeyDown);
    }
    
    function hndKeyDown(_event: KeyboardEvent): void {

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
}