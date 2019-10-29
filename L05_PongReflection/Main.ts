namespace L05_PongReflection {

    interface KeyPressed {

        [code: string]: boolean;
    }

    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);

    let viewport: fudge.Viewport;

    let paddleLeft: fudge.Node = new fudge.Node("PaddleLeft");
    let paddleRight: fudge.Node = new fudge.Node("PaddleRight");
    let ball: fudge.Node = new fudge.Node("Ball");
    let wallLeft: fudge.Node = new fudge.Node("WallLeft");
    let wallRight: fudge.Node = new fudge.Node("WallRight");
    let wallTop: fudge.Node = new fudge.Node("WallTop");
    let wallBottom: fudge.Node = new fudge.Node("WallBottom");


    let keysPressed: KeyPressed = {};

    let ballSpeed: fudge.Vector3 = new fudge.Vector3(0.1, 0.1, 0);
    
    function handleLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();

        let pong: fudge.Node = createPong();

        let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
        cam.pivot.translateZ(40);

        paddleLeft.cmpTransform.local.translateX(-19.5);
        paddleRight.cmpTransform.local.translateX(19.5);

        wallLeft.cmpTransform.local.translateX(-21);
        wallRight.cmpTransform.local.translateX(21);
        wallTop.cmpTransform.local.translateY(14);
        wallBottom.cmpTransform.local.translateY(-14);

        (<fudge.ComponentMesh> paddleLeft.getComponent(fudge.ComponentMesh) ).pivot.scaleY(4);
        (<fudge.ComponentMesh> paddleRight.getComponent(fudge.ComponentMesh) ).pivot.scaleY(4);

        (<fudge.ComponentMesh> wallLeft.getComponent(fudge.ComponentMesh) ).pivot.scaleY(27);
        (<fudge.ComponentMesh> wallRight.getComponent(fudge.ComponentMesh) ).pivot.scaleY(27);
        (<fudge.ComponentMesh> wallTop.getComponent(fudge.ComponentMesh) ).pivot.scaleX(41);
        (<fudge.ComponentMesh> wallBottom.getComponent(fudge.ComponentMesh) ).pivot.scaleX(41);

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

        moveBall();

        if (detectHit(wallLeft)) {
            ballSpeed.x = -ballSpeed.x;

        } else if (detectHit(wallRight)) {
            ballSpeed.x = -ballSpeed.x;

        } else if (detectHit(wallTop)) {
            ballSpeed.y = -ballSpeed.y;

        } else if (detectHit(wallBottom)) {
            ballSpeed.y = -ballSpeed.y;
        }     

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
        wallLeft.addComponent(new fudge.ComponentTransform());
        wallRight.addComponent(new fudge.ComponentTransform());
        wallTop.addComponent(new fudge.ComponentTransform());
        wallBottom.addComponent(new fudge.ComponentTransform());

        let meshQuad: fudge.MeshQuad = new fudge.MeshQuad();
        paddleLeft.addComponent(new fudge.ComponentMesh(meshQuad));
        paddleRight.addComponent(new fudge.ComponentMesh(meshQuad));
        ball.addComponent(new fudge.ComponentMesh(meshQuad));
        wallLeft.addComponent(new fudge.ComponentMesh(meshQuad));
        wallRight.addComponent(new fudge.ComponentMesh(meshQuad));
        wallTop.addComponent(new fudge.ComponentMesh(meshQuad));
        wallBottom.addComponent(new fudge.ComponentMesh(meshQuad));

        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));  
        paddleLeft.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        ball.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        wallLeft.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        wallRight.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        wallTop.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));
        wallBottom.addComponent(new fudge.ComponentMaterial(mtrSolidWhite));

        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        pong.appendChild(ball);
        pong.appendChild(wallLeft);
        pong.appendChild(wallRight);
        pong.appendChild(wallTop);
        pong.appendChild(wallBottom);
        
        return pong;
    }

    function moveBall(): void {

        ball.cmpTransform.local.translate(ballSpeed);
    }

    function detectHit(n: fudge.Node): boolean {
        
        let t: fudge.ComponentTransform = n.cmpTransform;
        let m: fudge.ComponentMesh = (<fudge.ComponentMesh> n.getComponent(fudge.ComponentMesh));
        let topLeft: fudge.Vector3 = new fudge.Vector3(t.local.translation.x - m.pivot.scaling.x / 2, t.local.translation.y + m.pivot.scaling.y / 2, 0);
        let bottomRight: fudge.Vector3 = new fudge.Vector3(t.local.translation.x + m.pivot.scaling.x / 2, t.local.translation.y - m.pivot.scaling.y / 2, 0);

        let b: fudge.Vector3 = new fudge.Vector3(ball.cmpTransform.local.translation.x, ball.cmpTransform.local.translation.y, 0);
        
        if (b.x > topLeft.x) {
            if (b.x < bottomRight.x)  {
                if (b.y > bottomRight.y) {
                    if (b.y < topLeft.y) {
                        return true;
                    }
                }
            }
        } 
        return false;
    }
}