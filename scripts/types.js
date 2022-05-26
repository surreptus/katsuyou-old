"use strict";
exports.__esModule = true;
exports.Group = exports.Inflection = void 0;
var Inflection;
(function (Inflection) {
    Inflection["Present"] = "present";
    Inflection["PresentNegative"] = "present-negative";
    Inflection["Polite"] = "polite";
    Inflection["PoliteNegative"] = "polite-negative";
    Inflection["Past"] = "past";
    Inflection["PastNegative"] = "past-negative";
    Inflection["Te"] = "te";
    Inflection["TeNegative"] = "te-negative";
})(Inflection = exports.Inflection || (exports.Inflection = {}));
var Group;
(function (Group) {
    Group["Ichidan"] = "ichidan";
    Group["Godan"] = "godan";
    Group["Irregular"] = "irregular";
})(Group = exports.Group || (exports.Group = {}));
