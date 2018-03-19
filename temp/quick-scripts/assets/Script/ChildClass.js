(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ChildClass.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '58ad30XPqVHQoduXxkcQ/vu', 'ChildClass', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ChildClass.js.map
        