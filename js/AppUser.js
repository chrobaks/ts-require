define(["require", "exports", "./app/NotificationService", "./app/AppHelper", "./module/UserQuery", "./module/Time"], function (require, exports, NotificationService_1, AppHelper_1, UserQuery_1, Time_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var User = /** @class */ (function () {
        function User() {
            var _this = this;
            this.actualTime = function (args) {
                NotificationService_1.AppNotification.exec('appDisplay', { name: 'protime', data: args });
                _this.updateUserTime('time', args);
            };
            this.getQuery = function (queryId, args) {
                var res = [];
                if (queryId === 'delete') {
                    res = UserQuery_1.UserQuery.deleteQuery(args);
                }
                else {
                    var data = _this.getQueryValue();
                    if (queryId === 'insert') {
                        data.path = args.path;
                        data.id = '' + _this.getUserTime('start', 'time');
                        res = UserQuery_1.UserQuery.insertQuery(data);
                    }
                    else {
                        res = AppHelper_1.Helper.langArgs('projectConfirm', data);
                    }
                }
                return res;
            };
            this.setUserProject = function (project) {
                _this.userProject = project;
            };
            this.setTimer = function (command, status) {
                Time_1.UserTime.setRunTimerOk(false);
                if (command === 'start') {
                    _this.toggleRunTimer(command, status);
                }
                else {
                    _this.updateUserTime(command, Time_1.UserTime.getDate());
                }
            };
            this.getUserProject = function () {
                return _this.userProject;
            };
            this.getUserTime = function (command, prop) {
                return (_this.userTime[command].hasOwnProperty(prop)) ? '' + _this.userTime[command][prop] : '' + _this.userTime[command];
            };
            this.getQueryValue = function () {
                return {
                    userProject: _this.userProject,
                    start: _this.getUserTime('start', 'timestamp'),
                    end: _this.getUserTime('end', 'timestamp'),
                    time: _this.getUserTime('time', ''),
                };
            };
            this.toggleRunTimer = function (command, status) {
                if (status === 'play' && Time_1.UserTime.timerHasPause() !== true) {
                    _this.updateUserTime(command, Time_1.UserTime.getDate());
                }
                Time_1.UserTime.toggleRunTimer(_this.userTime[command].time, status);
            };
            this.updateUserTime = function (command, date) {
                _this.userTime[command] = date;
                if (command === 'start') {
                    _this.userTime.end = Time_1.UserTime.getUserTimeObj();
                }
            };
            this.userTime = {
                start: Time_1.UserTime.getUserTimeObj(),
                end: Time_1.UserTime.getUserTimeObj(),
                time: ''
            };
            this.userProject = '';
            NotificationService_1.AppNotification.set('actualTime', this.actualTime);
        }
        Object.defineProperty(User, "Instance", {
            get: function () { return this._instance || (this._instance = new this()); },
            enumerable: true,
            configurable: true
        });
        return User;
    }());
    exports.AppUser = User.Instance;
});
