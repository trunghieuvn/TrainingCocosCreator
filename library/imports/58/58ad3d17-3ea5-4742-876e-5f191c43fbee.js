"use strict";
cc._RF.push(module, '58ad30XPqVHQoduXxkcQ/vu', 'ChildClass');
// Script/ChildClass.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SuperClass_1 = require("./SuperClass");
var ccclass = cc._decorator.ccclass;
var ChildClass = /** @class */ (function (_super) {
    __extends(ChildClass, _super);
    function ChildClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildClass.prototype.testAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve("Hello, World! From ChildClass!");
                        }, 1000);
                    })];
            });
        });
    };
    ChildClass = __decorate([
        ccclass
    ], ChildClass);
    return ChildClass;
}(SuperClass_1.default));
exports.default = ChildClass;

cc._RF.pop();