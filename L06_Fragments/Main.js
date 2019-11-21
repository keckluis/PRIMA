"use strict";
var L06_Fragments;
(function (L06_Fragments) {
    /*interface KeyPressed {

        [code: string]: boolean;
    }*/
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    let viewport;
    let game = new fudge.Node("Game");
    //let keysPressed: KeyPressed = {};
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        let game = createFragments();
        let cam = new fudge.ComponentCamera();
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
    function createFragments() {
        let A = createFragmentStructure("A");
        let aChildren = A.getChildren();
        aChildren[0].cmpTransform.local.translateX(1);
        aChildren[1].cmpTransform.local.translateX(2);
        aChildren[2].cmpTransform.local.translateX(3);
        let B = createFragmentStructure("B");
        let bChildren = B.getChildren();
        bChildren[0].cmpTransform.local.translateX(1);
        bChildren[1].cmpTransform.local.translateX(2);
        bChildren[2].cmpTransform.local.translate(new fudge.Vector3(1, 1, 0));
        let C = createFragmentStructure("C");
        let cChildren = C.getChildren();
        cChildren[0].cmpTransform.local.translateX(1);
        cChildren[1].cmpTransform.local.translate(new fudge.Vector3(1, 1, 0));
        cChildren[2].cmpTransform.local.translate(new fudge.Vector3(2, 1, 0));
        let D = createFragmentStructure("D");
        let dChildren = D.getChildren();
        dChildren[0].cmpTransform.local.translateX(1);
        dChildren[1].cmpTransform.local.translateX(2);
        dChildren[2].cmpTransform.local.translate(new fudge.Vector3(2, 1, 0));
        let E = createFragmentStructure("E");
        let eChildren = E.getChildren();
        eChildren[0].cmpTransform.local.translateX(1);
        eChildren[1].cmpTransform.local.translate(new fudge.Vector3(0, 1, 0));
        eChildren[2].cmpTransform.local.translate(new fudge.Vector3(1, 1, 0));
        let F = createFragmentStructure("F");
        let fChildren = F.getChildren();
        fChildren[0].cmpTransform.local.translateX(1);
        fChildren[1].cmpTransform.local.translate(new fudge.Vector3(1, 0, 1));
        fChildren[2].cmpTransform.local.translate(new fudge.Vector3(1, 1, 0));
        let G = createFragmentStructure("G");
        let gChildren = G.getChildren();
        gChildren[0].cmpTransform.local.translateX(1);
        gChildren[1].cmpTransform.local.translate(new fudge.Vector3(1, 0, -1));
        gChildren[2].cmpTransform.local.translate(new fudge.Vector3(1, 1, -1));
        let H = createFragmentStructure("H");
        let hChildren = H.getChildren();
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
    function createFragmentStructure(name) {
        let f = createCube(name, new fudge.Color(1, 0, 0, 1));
        let f2 = createCube(name + "2", new fudge.Color(0, 1, 0, 1));
        let f3 = createCube(name + "3", new fudge.Color(0, 0, 1, 1));
        let f4 = createCube(name + "4", new fudge.Color(1, 1, 0, 1));
        f.appendChild(f2);
        f.appendChild(f3);
        f.appendChild(f4);
        return f;
    }
    function createCube(name, color) {
        let cube = new fudge.Node(name);
        cube.addComponent(new fudge.ComponentTransform());
        let meshCube = new fudge.MeshCube();
        cube.addComponent(new fudge.ComponentMesh(meshCube));
        let mtrColor = new fudge.Material(name, fudge.ShaderUniColor, new fudge.CoatColored(color));
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
})(L06_Fragments || (L06_Fragments = {}));
//# sourceMappingURL=Main.js.map