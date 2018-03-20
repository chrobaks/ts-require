define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserQueryMod = /** @class */ (function () {
        function UserQueryMod() {
            this.insertQuery = function (args) {
                return {
                    "act": "setProtime",
                    "path": args.path,
                    "json": {
                        "id": args.id,
                        "project": args.userProject,
                        "start": args.start,
                        "end": args.end,
                        "time": args.time
                    }
                };
            };
            this.deleteQuery = function (args) {
                return {
                    "act": "deleteProtime",
                    "path": args.path,
                    "json": { "id": args.id }
                };
            };
        }
        return UserQueryMod;
    }());
    exports.UserQuery = new UserQueryMod();
});
