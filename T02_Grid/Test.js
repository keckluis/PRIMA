"use strict";
var T02_Grid;
(function (T02_Grid) {
    function test() {
        testGrid();
    }
    T02_Grid.test = test;
    function testGrid() {
        let cube = new T02_Grid.Cube(T02_Grid.CUBE_TYPE.GREEN, T02_Grid.ƒ.Vector3.ZERO());
        T02_Grid.grid.push(cube.cmpTransform.local.translation, new T02_Grid.GridElement(cube));
        let pulled = T02_Grid.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = T02_Grid.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = T02_Grid.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(T02_Grid || (T02_Grid = {}));
//# sourceMappingURL=Test.js.map