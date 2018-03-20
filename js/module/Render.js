define(["require", "exports", "./NumberFormat"], function (require, exports, NumberFormat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RenderMod = /** @class */ (function () {
        function RenderMod() {
            var _this = this;
            this.renderConfirm = function (dialogConf, $content) {
                var dialog = $("#dialog-confirm");
                if (!dialog.length) {
                    $('<div></div>')
                        .attr('id', 'dialog-confirm')
                        .attr('title', 'Information')
                        .append($('<div></div>'))
                        .appendTo('body');
                    dialog = $("#dialog-confirm");
                }
                dialog.dialog(dialogConf);
                dialog.find('div:eq(0)').empty().append($content);
            };
            this.renderUlList = function (list) {
                var $ul = $('<ul></ul>');
                list.forEach(function (item, index) { $ul.append($('<li></li>').text(item)); });
                return $ul;
            };
            this.renderTbl = function () {
                return $('<table></table>');
            };
            this.renderTblProject = function (list) {
                var $table = _this.renderTbl();
                var sum = NumberFormat_1.NumberFormat.getSumObj();
                var project = '';
                var proctCount = 0;
                $('body').find('.protimer-data').first().empty().append($table);
                for (var i = list.length - 1; i >= 0; i--) {
                    var obj = list[i];
                    var trClss = 'proct-content';
                    var icon = _this.renderFontIcon({ "class": "fa fa-trash-o", "aria-hidden": "true" });
                    var anchor = _this.renderAnchor(icon, {
                        "data-item-id": obj.id,
                        "data-toggle": "confirmation",
                        "data-placement": "right",
                        "title": "löschen?"
                    });
                    if (project !== obj.project) {
                        project = obj.project;
                        sum = NumberFormat_1.NumberFormat.getSumObj();
                        trClss = 'proct-content proct-' + proctCount;
                    }
                    sum = NumberFormat_1.NumberFormat.getSum(obj.time, sum);
                    _this.renderTblTr($table, trClss, obj, anchor);
                    if (i === 0 || list[i - 1].project !== project) {
                        var $content = $('.protimer-data').find('tr.proct-' + proctCount);
                        _this.renderTrBefore($content, { project: project + ' / Gesamtzeit', sum: NumberFormat_1.NumberFormat.getSumToString(sum) });
                        proctCount++;
                    }
                }
            };
            this.renderTblTr = function ($table, trClss, data, $anchor) {
                var $tdAnchor = $('<td></td>', { "data-item-id": data.id });
                if ($anchor && $anchor !== null) {
                    $tdAnchor.append($anchor);
                }
                $('<tr></tr>', { "class": trClss })
                    .append($tdAnchor, $('<td></td>').text(data.start), $('<td></td>').text(data.end), $('<td></td>').text(data.time))
                    .appendTo($table);
            };
            this.renderTrBefore = function ($before, data) {
                $before.before($('<tr></tr>', { "class": "header" }).append($('<td colspan="3"></td>').text(data.project), $('<td></td>').text(data.sum)), $('<tr></tr>', { "class": "header" }).append($('<td></td>').text('Delete'), $('<td></td>').text('Date start'), $('<td></td>').text('Date end'), $('<td></td>').text('Time')));
            };
            this.renderAnchor = function (content, attr) {
                return $('<a></a>', attr).append(content);
            };
            this.renderOptions = function ($select, list) {
                list.forEach(function (item, index) {
                    $select.append($('<option></option>', { "value": item.id }).text(item.val));
                });
            };
            this.renderFontIcon = function (attr) {
                return $('<i></i>', attr);
            };
        }
        Object.defineProperty(RenderMod, "Instance", {
            get: function () { return this._instance || (this._instance = new this()); },
            enumerable: true,
            configurable: true
        });
        return RenderMod;
    }());
    var Render = RenderMod.Instance;
    exports.Render = Render;
});
