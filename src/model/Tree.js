"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var Tree = /** @class */ (function () {
    function Tree(name, children, parent) {
        this.id = this.generateHash();
        this.name = name;
        this.children = children;
        this.parent = parent;
    }
    Tree.prototype.toString = function () {
        return this.name;
    };
    Tree.prototype.generateHash = function (salt) {
        if (salt === void 0) { salt = 20; }
        return bcrypt.hashSync(String(this.name + Date.now()), salt);
    };
    Tree.prototype.findByName = function (name) {
        var res;
        res = [];
        if (this.name === name) {
            res.push(this);
        }
        if (this.children) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var found = child.findByName(name);
                if (found) {
                    res.push.apply(res, found);
                }
            }
        }
        return res;
    };
    return Tree;
}());
exports.default = Tree;
