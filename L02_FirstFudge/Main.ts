namespace L02_FirstFudge {

    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);

    export let viewport: fudge.Viewport;

    function handleLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();

        fudge.Debug.log(canvas);
        let mainNode: fudge.Node = new fudge.Node("Main");
        let batLeft: fudge.Node = new fudge.Node("Quad1");
        let batRight: fudge.Node = new fudge.Node("Quad2");
        let ball: fudge.Node = new fudge.Node("Ball");

        let batLeftMesh: fudge.MeshQuad = new fudge.MeshQuad();
        let batLeftCmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(batLeftMesh);

        let batRightMesh: fudge.MeshQuad = new fudge.MeshQuad();
        let batRightCmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(batRightMesh);

        let ballMesh: fudge.MeshQuad = new fudge.MeshQuad();
        let ballCmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(ballMesh);

        mainNode.appendChild(batLeft);
        mainNode.appendChild(batRight);
        mainNode.appendChild(ball);

        batLeft.addComponent(batLeftCmpMesh);
        batRight.addComponent(batRightCmpMesh);
        ball.addComponent(ballCmpMesh);

        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 1, 1)));
        let batLeftMat: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        let batRightMat: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        let ballMat: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        batLeft.addComponent(batLeftMat);
        batRight.addComponent(batRightMat);
        ball.addComponent(ballMat);

        batLeftCmpMesh.pivot.scaleX(0.1);
        batLeftCmpMesh.pivot.scaleY(0.5);
        batLeftCmpMesh.pivot.translateX(-1);

        batRightCmpMesh.pivot.scaleX(0.1);
        batRightCmpMesh.pivot.scaleY(0.5);
        batRightCmpMesh.pivot.translateX(1);

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

                batLeftCmpMesh.pivot.translateY(0.01);
                viewport.draw();

            } else if (e.keyCode == 83) {

                batLeftCmpMesh.pivot.translateY(-0.01);
                viewport.draw();
            }

            if (e.keyCode == 38) {

                batRightCmpMesh.pivot.translateY(0.01);
                viewport.draw();
                
            } else if (e.keyCode == 40) {

                batRightCmpMesh.pivot.translateY(-0.01);
                viewport.draw();
            }
        };
    }
}