/// <reference path ="./interface/IClass.ts"/>
define(["require", "exports", "./app/NotificationService", "./app/AjaxService", "./AppView", "./AppUser"], function (require, exports, NotificationService_1, AjaxService_1, AppView_1, AppUser_1) {
    "use strict";
    var App = /** @class */ (function () {
        function App(AppConfig, AppBootstrap) {
            var _this = this;
            this.appDelete = function (id) {
                var projectPath = _this.getUserProjectPath();
                var data = AppUser_1.AppUser.getQuery('delete', { path: projectPath, id: id });
                AjaxService_1.Ajax.jsonRequest(data).promise().done(function (response) {
                    if (response.hasOwnProperty('status') && response.status === 'success') {
                        if (response.hasOwnProperty('data')) {
                            AppView_1.AppView.setProjectList(response.data);
                        }
                    }
                });
            };
            this.appDisplay = function (obj) {
                AppView_1.AppView.setDisplay(obj);
            };
            this.appTimer = function ($obj) {
                var command = $obj.attr('name') || '';
                command = command.replace('btn-', '');
                switch (command) {
                    case 'start':
                        AppView_1.AppView.showBtn('play');
                        AppUser_1.AppUser.setTimer('start', AppView_1.AppView.toggleStartStatus());
                        AppView_1.AppView.setDisplay({ name: 'start', data: AppUser_1.AppUser.getUserTime('start', 'timestamp') });
                        break;
                    case 'end':
                        AppUser_1.AppUser.setTimer('end', '');
                        AppView_1.AppView.setStopStatus();
                        break;
                    case 'save':
                        _this.saveUserTime();
                        break;
                    case 'clear':
                        AppView_1.AppView.setStartStatus('start');
                        break;
                }
            };
            this.appSelect = function ($obj) {
                var val = '' + $obj.val() || '';
                val = $.trim(val);
                AppView_1.AppView.setStartStatus('');
                if (val !== '') {
                    AppUser_1.AppUser.setUserProject(val);
                    AppView_1.AppView.showBtn('start');
                    AppView_1.AppView.updateProjectList(_this.getUserProjectPath());
                }
            };
            this.saveUserTime = function () {
                var projectPath = _this.getUserProjectPath();
                AppView_1.AppView.viewConfirm($('body').find('.container-protimer').first(), AppUser_1.AppUser.getQuery('confirm', null))
                    .promise()
                    .done(function () {
                    var data = AppUser_1.AppUser.getQuery('insert', { path: projectPath });
                    AjaxService_1.Ajax.jsonRequest(data).promise().done(function () { AppView_1.AppView.updateProjectList(projectPath); });
                    AppView_1.AppView.setStartStatus('start');
                })
                    .fail(function () { AppView_1.AppView.setStartStatus('start'); });
            };
            this.getUserProjectPath = function () {
                var userProject = AppUser_1.AppUser.getUserProject();
                return _this.appConfig.sourcePath + _this.appConfig.userDir + '/' + userProject + '/protime.json';
            };
            this.appConfig = AppConfig;
            AppView_1.AppView.setAppBootstrap(AppBootstrap);
            AppView_1.AppView.updateSelect("project", this.appConfig.projects);
            NotificationService_1.AppNotification.set('appDelete', this.appDelete);
            NotificationService_1.AppNotification.set('appDisplay', this.appDisplay);
            NotificationService_1.AppNotification.set('appTimer', this.appTimer);
            NotificationService_1.AppNotification.set('appSelect', this.appSelect);
        }
        ;
        return App;
    }());
    return App;
});
