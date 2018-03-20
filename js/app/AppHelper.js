define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppHelper = /** @class */ (function () {
        function AppHelper() {
            this.strReplace = function (regexp, str, replaceWith) {
                var strMatch = str.match(regexp);
                strMatch.forEach(function (item, index) {
                    str = str.replace(item, replaceWith[item]);
                });
                return str;
            };
            this.langArgs = function (id, args) {
                var lang = {
                    "projectConfirm": [
                        'Projekt : ' + args.userProject,
                        'Startzeit : ' + args.start,
                        'Endzeit : ' + args.end,
                        'Zeit : ' + args.time,
                        'Diese Projektzeit speichern?'
                    ]
                };
                return (lang.hasOwnProperty(id)) ? lang[id] : [];
            };
        }
        return AppHelper;
    }());
    exports.Helper = new AppHelper();
});
