"use strict";
var T05_Compression;
(function (T05_Compression) {
    class Combos {
        constructor(_elements) {
            this.found = [];
            this.detect(_elements);
        }
        detect(_elements) {
            for (let element of _elements) {
                if (this.contains(element))
                    continue;
                let combo = [];
                combo.push(element);
                this.recurse(element, combo);
                this.found.push(combo);
            }
        }
        contains(_element) {
            for (let combo of this.found)
                for (let element of combo)
                    if (element == _element)
                        return true;
            return false;
        }
        recurse(_element, _combo) {
            let matches = this.findNeigborsOfSameColor(_element);
            for (let iMatch = matches.length - 1; iMatch >= 0; iMatch--) {
                let match = matches[iMatch];
                let iCombo = _combo.indexOf(match);
                if (iCombo >= 0)
                    matches.splice(iMatch, 1);
                else
                    _combo.push(match);
            }
            for (let match of matches)
                this.recurse(match, _combo);
        }
        findNeigborsOfSameColor(_element) {
            let allNeighbors = T05_Compression.grid.findNeighbors(_element.position);
            let found = allNeighbors.filter(_neighbor => (_neighbor.cube.name == _element.cube.name));
            return found;
        }
    }
    T05_Compression.Combos = Combos;
})(T05_Compression || (T05_Compression = {}));
//# sourceMappingURL=Combos.js.map