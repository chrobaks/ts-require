define(["require", "exports", "./app/NotificationService", "./module/Render", "./AppUser"], function (require, exports, NotificationService_1, Render_1, AppUser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var View = /** @class */ (function () {
        function View() {
            var _this = this;
            this.disabledBtn = function (name) {
                for (var k in _this.$btn) {
                    if (name === '' || name !== k) {
                        _this.$btn[k].prop('disabled', 'disabled');
                    }
                }
            };
            this.getStartStatus = function () {
                return _this.$btn.start.attr('data-value') || '';
            };
            this.showBtn = function (name) {
                switch (name) {
                    case 'start':
                        _this.$btn.start.prop('disabled', false);
                        break;
                    case 'play':
                        _this.$btn.end.prop('disabled', false);
                        break;
                    case 'save':
                        _this.$btn.clear.prop('disabled', false);
                        _this.$btn.save.prop('disabled', false);
                        _this.$btn.start.prop('disabled', true);
                        break;
                }
            };
            this.setAppBootstrap = function (object) { _this.AppBootstrap = object; };
            this.setProjectList = function (list) {
                Render_1.Render.renderTblProject(list);
                _this.AppBootstrap.confirmation(function ($obj) {
                    var id = '' + $obj.attr('data-item-id') || '';
                    if (id !== '') {
                        NotificationService_1.AppNotification.exec('appDelete', id);
                    }
                });
            };
            this.setDisplay = function (obj) {
                if (obj.name === '') {
                    for (var k in _this.$display) {
                        _this.$display[k].val('');
                    }
                }
                else {
                    _this.$display[obj.name].val(obj.data);
                    if (obj.name === 'start') {
                        _this.$display.end.val('');
                    }
                }
            };
            this.setStartStatus = function (status) {
                _this.disabledBtn('');
                _this.setDisplay({ name: '', data: '' });
                if (status === 'start') {
                    _this.showBtn('start');
                }
            };
            this.setStopStatus = function () {
                _this.setDisplay({ name: 'end', data: AppUser_1.AppUser.getUserTime('end', 'timestamp') });
                _this.showBtn('save');
                if (_this.getStartStatus() === 'pause') {
                    _this.toggleStartStatus();
                }
            };
            this.toggleStartStatus = function () {
                var status = (typeof _this.getStartStatus() !== 'undefined') ? _this.getStartStatus() : '';
                var attr = (status === 'play') ? 'pause' : 'play';
                _this.$btn.start.attr('data-value', attr);
                _this.$btn.start.text(attr);
                return status;
            };
            this.updateSelect = function (selectName, list) {
                if (_this.$select.hasOwnProperty(selectName) && list.length) {
                    Render_1.Render.renderOptions(_this.$select[selectName], list);
                }
            };
            this.updateProjectList = function (path) {
                var namespace = _this;
                var ajaxConf = {
                    url: 'index.php',
                    data: { "act": "getProtime", "path": path },
                    dataType: 'json'
                };
                $.ajax(ajaxConf).done(function (response) { namespace.setProjectList(response); });
            };
            this.viewConfirm = function ($appendTo, list) {
                var dfr = $.Deferred();
                var dialogConf = {
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "speichern": function () { $(this).dialog("close"); dfr.resolve(); },
                        "abbbrechen": function () { $(this).dialog("close"); dfr.reject(); }
                    }
                };
                Render_1.Render.renderConfirm(dialogConf, Render_1.Render.renderUlList(list));
                return dfr.promise();
            };
            this.initBtn = function () {
                _this.$btn = { start: null, end: null, save: null, clear: null };
                for (var k in _this.$btn) {
                    _this.$btn[k] = $('button[name=btn-' + k + ']');
                }
                $('.protimer-ctrl button').on('click', function () { NotificationService_1.AppNotification.exec('appTimer', $(this)); });
            };
            this.initSelect = function () {
                _this.$select = { project: null };
                for (var k in _this.$select) {
                    _this.$select[k] = $('select[name=' + k + ']');
                }
                $('.protimer-ctrl select').on('change', function () { NotificationService_1.AppNotification.exec('appSelect', $(this)); });
            };
            this.initDisplay = function () {
                _this.$display = { start: null, end: null, protime: null };
                for (var k in _this.$display) {
                    _this.$display[k] = $('input[name=' + k + ']');
                }
            };
            this.initSelect();
            this.initBtn();
            this.initDisplay();
        }
        Object.defineProperty(View, "Instance", {
            get: function () { return this._instance || (this._instance = new this()); },
            enumerable: true,
            configurable: true
        });
        return View;
    }());
    exports.AppView = View.Instance;
});
