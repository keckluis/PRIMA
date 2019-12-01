"use strict";
var T03_Camera;
(function (T03_Camera) {
    function test() {
        testGrid();
    }
    T03_Camera.test = test;
    function testGrid() {
        let cube = new T03_Camera.Cube(T03_Camera.CUBE_TYPE.GREEN, T03_Camera.fudge.Vector3.ZERO());
        T03_Camera.grid.push(cube.cmpTransform.local.translation, new T03_Camera.GridElement(cube));
        let pulled = T03_Camera.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = T03_Camera.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = T03_Camera.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(T03_Camera || (T03_Camera = {}));
//# sourceMappingURL=Test.js.map