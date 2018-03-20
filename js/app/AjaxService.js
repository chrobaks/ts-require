define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AjaxService = /** @class */ (function () {
        function AjaxService() {
            this.jsonRequest = function (data) {
                return $.ajax({
                    url: 'index.php',
                    data: data,
                    dataType: 'json'
                });
            };
        }
        return AjaxService;
    }());
    exports.Ajax = new AjaxService();
});
