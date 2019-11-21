namespace L06_Fragments {

    /*interface KeyPressed {

        [code: string]: boolean;
    }*/

    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);

    let viewport: fudge.Viewport;

    let game: fudge.Node = new fudge.Node("Game");

    //let keysPressed: KeyPressed = {};

    function handleLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();

        let game: fudge.Node = createFragments();

        let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
        cam.pivot.translateZ(20);

        //document.addEventListener("keydown", handleKeydown);
        //document.addEventListener("keyup", handleKeyup);

        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cam, canvas);
        fudge.Debug.log(viewport);

        viewport.draw();

        //fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        //fudge.Loop.start();
    }

    function createFragments(): fudge.Node {
        
        let A: fudge.Node = createFragmentStructure("A");
        let aChildren: fudge.Node[] = A.getChildren();
        aChildren[0].cmpTransform.local.translateX(1);
        aChildren[1].cmpTransform.local.translateX(2);
        aChildren[2].cmpTransform.local.translateX(3);

        let B: fudge.Node = createFragmentStructure("B");
        let bChildren: fudge.Node[] = B.getChildren();
        bChildren[0].cmpTransform.local.translateX(1);
        bChildren[1].cmpTransform.local.translateX(2);
        bChildren[2].cmpTransform.local.translate(new fudge.Vector3(1, 1, 0));

        let C: fudge.Node = createFragmentStructure("C");
        let cChildren: fudge.Node[] = C.getChildren();
        cChildren[0].cmpTransform.local.translateX(1);
        cChildren[1].cmpTransform.local.translate(new fudge.Vector3(1, 1, 0));
        cChildren[2].cmpTransform.local.translate(new fudge.Vector3(2, 1, 0));

        let D: fudge.Node = createFragmentStructure("D");
        let dChildren: fudge.Node[] = D.getChildren();
        dChildren[0].cmpTransform.local.translateX(1);
        dChildren[1].cmpTransform.local.translateX(2);
        dChildren[2].cmpTransform.local.translate(new fudge.Vector3(2, 1, 0));

        let E: fudge.Node = createFragmentStructure("E");
        let eChildren: fudge.Node[] = E.getChildren();
        eChildren[0].cmpTransform.local.translateX(1);
        eChildren[1].cmpTransform.local.translate(new fudge.Vector3(0, 1, 0));
        eChildren[2].cmpTransform.local.translate(new fudge.Vector3(1, 1, 0));

        let F: fudge.Node = createFragmentStructure("F");
        let fChildren: fudge.Node[] = F.getChildren();
        fChildren[0].cmpTransform.local.translateX(1);
        fChildren[1].cmpTransform.local.translate(new fudge.Vector3(1, 0, 1));
        fChildren[2].cmpTransform.local.translate(new fudge.Vector3(1, 1, 0));

        let G: fudge.Node = createFragmentStructure("G");
        let gChildren: fudge.Node[] = G.getChildren();
        gChildren[0].cmpTransform.local.translateX(1);
        gChildren[1].cmpTransform.local.translate(new fudge.Vector3(1, 0, -1));
        gChildren[2].cmpTransform.local.translate(new fudge.Vector3(1, 1, -1));

        let H: fudge.Node = createFragmentStructure("H");
        let hChildren: fudge.Node[] = H.getChildren();
        hChildren[0].cmpTransform.local.translateY(1);
        hChildren[1].cmpTransform.local.translateZ(1);
        hChildren[2].cmpTransform.local.translate(new fudge.Vector3(1, 0, 1));
        H.cmpTransform.local.rotateY(10);

        A.cmpTransform.local.translate(new fudge.Vector3(-7, 4, 0));
        B.cmpTransform.local.translate(new fudge.Vector3(0, 4, 0));
        C.cmpTransform.local.translate(new fudge.Vector3(7, 4, 0));
        D.cmpTransform.local.translate(new fudge.Vector3(-7, 0, 0));
        E.cmpTransform.local.translate(new fudge.Vector3(0, 0, 0));
        F.cmpTransform.local.translate(new fudge.Vector3(7, 0, 0));
        G.cmpTransform.local.translate(new fudge.Vector3(-7, -4, 0));
        H.cmpTransform.local.translate(new fudge.Vector3(0, -4, 0));

        game.appendChild(A);
        game.appendChild(B);
        game.appendChild(C);
        game.appendChild(D);
        game.appendChild(E);
        game.appendChild(F);
        game.appendChild(G);
        game.appendChild(H);

        return game;
    }

    function createFragmentStructure(name: string): fudge.Node {

        let f: fudge.Node = createCube(name, new fudge.Color(1, 0, 0, 1));
        let f2: fudge.Node = createCube(name + "2", new fudge.Color(0, 1, 0, 1));
        let f3: fudge.Node = createCube(name + "3", new fudge.Color(0, 0, 1, 1));
        let f4: fudge.Node = createCube(name + "4", new fudge.Color(1, 1, 0, 1));

        f.appendChild(f2);
        f.appendChild(f3);
        f.appendChild(f4);

        return f;
    }

    function createCube(name: string, color: fudge.Color): fudge.Node {

        let cube: fudge.Node = new fudge.Node(name);

        cube.addComponent(new fudge.ComponentTransform());

        let meshCube: fudge.MeshCube = new fudge.MeshCube();
        cube.addComponent(new fudge.ComponentMesh(meshCube));
        
        let mtrColor: fudge.Material = new fudge.Material(name, fudge.ShaderUniColor, new fudge.CoatColored(color));  
        cube.addComponent(new fudge.ComponentMaterial(mtrColor));
        
        return cube;
    }

    /*function update(_event: Event): void {

        fudge.RenderManager.update();
        viewport.draw();
    }*/

    /*function handleKeydown(_event: KeyboardEvent): void {

        keysPressed[_event.code] = true;
    }*/

    /*function handleKeyup(_event: KeyboardEvent): void {

        keysPressed[_event.code] = false;
    }*/
}