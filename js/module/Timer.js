define(["require", "exports", "../app/NotificationService"], function (require, exports, NotificationService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimerMod = /** @class */ (function () {
        function TimerMod() {
            var _this = this;
            this.setRunTimerOk = function (ok) { _this.runTimerOk = ok; };
            this.setUserTime = function (time) {
                _this.userTime = +time;
            };
            this.getDate = function () {
                var res = _this.getUserTimeObj();
                _this.setTimerDate();
                for (var key in _this.timerDate) {
                    res[key] = _this.timerDate[key];
                }
                return res;
            };
            this.getUserTimeObj = function () {
                return { day: 0, month: 0, year: 0, hour: 0, min: '', time: 0, timestamp: '' };
            };
            this.runTimer = function (runs) {
                if (!_this.runTimerOk) {
                    return;
                }
                var date = new Date();
                var dateDiff = date.getTime();
                var namespace = _this;
                if (runs) {
                    _this.actualTime = (runs > 1) ? (_this.actualTime + 1000) : _this.actualTime;
                    dateDiff = _this.actualTime;
                    dateDiff = Math.round(dateDiff / 1000);
                    if (dateDiff >= 3600) {
                        dateDiff = _this.getHours(dateDiff);
                    }
                    else {
                        dateDiff = '00:' + _this.getMinutes(dateDiff);
                    }
                }
                else {
                    _this.actualTime = dateDiff - _this.userTime;
                    dateDiff = '00:00:00';
                }
                NotificationService_1.AppNotification.exec('actualTime', dateDiff);
                if (_this.runTimerOk) {
                    window.setTimeout(function () { namespace.runTimer(2); }, 1000);
                }
            };
            this.toggleRunTimer = function (userTime, status) {
                var runTimerVal = 0;
                if (status === 'play') {
                    if (_this.hasPause) {
                        _this.hasPause = false;
                        runTimerVal = 1;
                    }
                    else {
                        _this.setUserTime(userTime);
                    }
                    _this.setRunTimerOk(true);
                    _this.runTimer(runTimerVal);
                }
                else {
                    _this.hasPause = true;
                }
            };
            this.timerHasPause = function () {
                return _this.hasPause;
            };
            this.setTimerDate = function () {
                var date = new Date();
                _this.timerDate = {
                    day: _this.formatZeroPreFix(date.getDate()),
                    month: _this.formatZeroPreFix(date.getMonth() + 1),
                    year: date.getFullYear(),
                    hour: _this.formatZeroPreFix(date.getHours()),
                    min: _this.formatZeroPreFix(date.getMinutes()),
                    time: date.getTime(),
                    timestamp: ''
                };
                _this.timerDate.timestamp = _this.timerDate.day + '.' + _this.timerDate.month + '.' + _this.timerDate.year + ' ' + _this.timerDate.hour + ':' + _this.timerDate.min;
            };
            this.formatZeroPreFix = function (dateVal) {
                return ((dateVal <= 9) ? '0' + dateVal : '' + dateVal);
            };
            this.formatCalcNumber = function (number, val, format) {
                var res = '';
                switch (format) {
                    case '%':
                        res = ((number % val <= 9) ? '0' + (number % val) : (number % val));
                        break;
                    case '/':
                        res = ((number / val) <= 9) ? '0' + (number / val) : (number / val);
                        break;
                }
                return res;
            };
            this.getMinutes = function (time) {
                var cache = '';
                var res = '';
                if (time >= 60) {
                    if (time % 60 === 0) {
                        cache = _this.formatCalcNumber(time, 60, '/');
                        res = cache + ':00';
                    }
                    else {
                        cache = Math.floor(time / 60);
                        cache = (cache <= 9) ? '0' + cache : cache;
                        res = cache + ':' + _this.formatCalcNumber(time, 60, '%');
                    }
                }
                else {
                    res = '00:' + _this.formatCalcNumber(time, 60, '%');
                }
                return res;
            };
            this.getHours = function (time) {
                var cache = '';
                var res = '';
                if (time % 3600 === 0) {
                    cache = _this.formatCalcNumber(time, 3600, '/');
                    res = cache + ':00:00';
                }
                else {
                    cache = Math.floor(time / 3600);
                    cache = (cache <= 9) ? '0' + cache : cache;
                    res = cache + ':' + _this.getMinutes((time % 3600));
                }
                return res;
            };
        }
        Object.defineProperty(TimerMod, "Instance", {
            get: function () { return this._instance || (this._instance = new this()); },
            enumerable: true,
            configurable: true
        });
        return TimerMod;
    }());
    var Timer = TimerMod.Instance;
    exports.Timer = Timer;
});
