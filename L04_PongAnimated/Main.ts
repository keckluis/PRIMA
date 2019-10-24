namespace L04_PongAnimated {

    interface KeyPressed {

        [code: string]: boolean;
    }

    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);

    let viewport: fudge.Viewport;

    let paddleLeft: fudge.Node = new fudge.Node("PaddleLeft");
    let paddleRight: fudge.Node = new fudge.Node("PaddleRight");
    let ball: fudge.Node = new fudge.Node("Ball");

    let keysPressed: KeyPressed = {};

    function handleLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();

        let pong: fudge.Node = createPong();

        let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
        cam.pivot.translateZ(40);

        paddleLeft.cmpTransform.local.translateX(-19.5);
        paddleRight.cmpTransform.local.translateX(19.5);

        (<fudge.ComponentMesh> paddleLeft.getComponent(fudge.ComponentMesh) ).pivot.scaleY(4);
        (<fudge.ComponentMesh> paddleRight.getComponent(fudge.ComponentMesh) ).pivot.scaleY(4);

        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", pong, cam, canvas);
        fudge.Debug.log(viewport);

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("keyup", handleKeyup);

        viewport.draw();  

        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        fudge.Loop.start();
    }

    function update(_event: Event): void {

        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_UP])
            paddleRight.cmpTransform.local.translateY(0.3);
        
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_DOWN])
            paddleRight.cmpTransform.local.translateY(-0.3);

        if (keysPressed[fudge.KEYBOARD_CODE.W])
            paddleLeft.cmpTransform.local.translateY(0.3);

        if (keysPressed[fudge.KEYBOARD_CODE.S])
            paddleLeft.cmpTransform.local.translateY(-0.3);

        fudge.RenderManager.update();
        viewport.draw();
    }

    function handleKeydown(_event: KeyboardEvent): void {

        keysPressed[_event.code] = true;
    }

    function handleKeyup(_event: KeyboardEvent): void {

        keysPressed[_event.code] = false;
    }

    function createPong(): fudge.Node {

        let pong: fudge.Node = new fudge.Node("Pong");

        paddleLeft.addComponent(new fudge.ComponentTransform());
        paddleRight.addComponent(new fudge.ComponentTransform());
        ball.addComponent(new fudge.ComponentTransform());

        let meshQuad: fudge.MeshQuad = new fudge.MeshQuad();
        paddleLeft.addComponent(new fudge.ComponentMesh(meshQuad));
        paddleRight.addComponent(new fudge.ComponentMesh(meshQuad));
        ball.addComponent(new fudge.ComponentMesh(meshQuad));

        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));   
        paddleLeft.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        ball.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));

        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        pong.appendChild(ball);
        
        return pong;
    }
}