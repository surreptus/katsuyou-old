"use strict";
exports.__esModule = true;
var types_1 = require("../types");
function conjugateIchidan(verb, inflection) {
    var root = verb.slice(0, -1);
    switch (inflection) {
        case types_1.Inflection.Present:
            return "".concat(root, "\u308B");
        case types_1.Inflection.PresentNegative:
            return "".concat(root, "\u306A\u3044");
        case types_1.Inflection.Polite:
            return "".concat(root, "\u307E\u3059");
        case types_1.Inflection.PoliteNegative:
            return "".concat(root, "\u307E\u305B\u3093");
        default:
            return verb;
    }
}
function conjugateGodan(verb, inflection) {
}
function conjugateIrregular(verb, inflection) {
}
function conjugate(verb, inflection, group) {
    switch (group) {
        case types_1.Group.Ichidan:
            return conjugateIchidan(verb, inflection);
        case types_1.Group.Godan:
            return conjugateGodan(verb, inflection);
        default:
            return conjugateIrregular(verb, inflection);
    }
}
exports["default"] = conjugate;
