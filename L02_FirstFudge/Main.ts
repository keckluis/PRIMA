namespace L02_FirstFudge {

    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);

    export let viewport: fudge.Viewport;

    function handleLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();

        fudge.Debug.log(canvas);
        
        let node: fudge.Node = new fudge.Node("Quad");
        let mesh: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        node.addComponent(cmpMesh);

        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let cmpMaterial: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
        cam.pivot.translateZ(2);
        let viewport: fudge.Viewport = new fudge.Viewport();
        viewport.initialize("Viewport", node, cam, canvas);
        fudge.Debug.log(viewport);

        viewport.draw();
    }
}