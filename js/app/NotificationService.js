define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotificationService = /** @class */ (function () {
        function NotificationService() {
            var _this = this;
            this.set = function (namespace, callback) {
                _this.notificationCache[namespace] = callback;
            };
            this.exec = function (namespace, args) {
                if (_this.notificationCache.hasOwnProperty(namespace)) {
                    _this.notificationCache[namespace](args);
                }
            };
            this.notificationCache = {};
        }
        Object.defineProperty(NotificationService, "Instance", {
            get: function () { return this._instance || (this._instance = new this()); },
            enumerable: true,
            configurable: true
        });
        return NotificationService;
    }());
    var AppNotification = NotificationService.Instance;
    exports.AppNotification = AppNotification;
});
