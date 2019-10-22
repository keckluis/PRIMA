namespace L02_FirstFudge {

    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);

    export let viewport: fudge.Viewport;

    function handleLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();

        fudge.Debug.log(canvas);
        let mainNode: fudge.Node = new fudge.Node("Main");
        let player1: fudge.Node = new fudge.Node("Quad1");
        let player2: fudge.Node = new fudge.Node("Quad2");
        let ball: fudge.Node = new fudge.Node("Ball");

        let mesh: fudge.MeshQuad = new fudge.MeshQuad();

        let player1CmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        let player2CmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        let ballCmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);

        mainNode.appendChild(player1);
        mainNode.appendChild(player2);
        mainNode.appendChild(ball);

        player1.addComponent(player1CmpMesh);
        player2.addComponent(player2CmpMesh);
        ball.addComponent(ballCmpMesh);

        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 1, 1)));
        let player1Mat: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        let player2Mat: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        let ballMat: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        player1.addComponent(player1Mat);
        player2.addComponent(player2Mat);
        ball.addComponent(ballMat);

        player1CmpMesh.pivot.scaleX(0.1);
        player1CmpMesh.pivot.scaleY(0.5);
        player1CmpMesh.pivot.translateX(-1);

        player2CmpMesh.pivot.scaleX(0.1);
        player2CmpMesh.pivot.scaleY(0.5);
        player2CmpMesh.pivot.translateX(1);

        ballCmpMesh.pivot.scaleX(0.075);
        ballCmpMesh.pivot.scaleY(0.075);

        let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
        cam.pivot.translateZ(2);

        let viewport: fudge.Viewport = new fudge.Viewport();
        viewport.initialize("Viewport", mainNode, cam, canvas);
        fudge.Debug.log(viewport);

        viewport.draw();

        document.body.onkeydown = function (e) {

            if (e.keyCode == 87) {

                player1CmpMesh.pivot.translateY(0.02);
                viewport.draw();

            } else if (e.keyCode == 83) {

                player1CmpMesh.pivot.translateY(-0.02);
                viewport.draw();
            }

            if (e.keyCode == 38) {

                player2CmpMesh.pivot.translateY(0.02);
                viewport.draw();
                
            } else if (e.keyCode == 40) {

                player2CmpMesh.pivot.translateY(-0.02);
                viewport.draw();
            }
        };
    }
}