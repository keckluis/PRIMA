"use strict";
var P01_HelloWorld;
(function (P01_HelloWorld) {
    console.log("Hello World");
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.body.innerHTML = "Hello World";
    }
})(P01_HelloWorld || (P01_HelloWorld = {}));
//# sourceMappingURL=Test.js.map