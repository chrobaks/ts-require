define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumberFormatMod = /** @class */ (function () {
        function NumberFormatMod() {
            this.getSumToString = function (sum) {
                var h = (sum.hour <= 9) ? '0' + sum.hour : sum.hour;
                var m = (sum.min <= 9) ? '0' + sum.min : sum.min;
                var s = (sum.sec <= 9) ? '0' + sum.sec : sum.sec;
                return h + ':' + m + ':' + s;
            };
            this.getSum = function (data, sum) {
                var time = data.split(':');
                time.forEach(function (item, index) {
                    var m = (item.match(/^0/)) ? item.replace('0', '') : item;
                    var n = +m || 0;
                    if (index === 0) {
                        sum.hour += n;
                    }
                    else if (index === 1) {
                        if (sum.min + n < 60) {
                            sum.min += n;
                        }
                        else {
                            sum.hour++;
                            sum.min += (n - 60);
                        }
                    }
                    else if (index === 2) {
                        if (sum.sec + n < 60) {
                            sum.sec += n;
                        }
                        else {
                            sum.min++;
                            sum.sec += (n - 60);
                        }
                    }
                });
                return sum;
            };
            this.getSumObj = function () {
                return { hour: 0, min: 0, sec: 0 };
            };
        }
        return NumberFormatMod;
    }());
    var NumberFormat = new NumberFormatMod();
    exports.NumberFormat = NumberFormat;
});
