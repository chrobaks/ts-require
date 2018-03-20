
/// <reference path ="./interface/IClass.ts"/>

import { AppNotification } from './app/NotificationService';
import { Ajax } from './app/AjaxService';
import { AppView } from './AppView';
import { AppUser } from './AppUser';

class App implements IClassApp
{
    private appConfig:IAppConfig;

    public constructor (AppConfig:IAppConfig, AppBootstrap:IBootstrapConfirm)
    {
        this.appConfig = AppConfig;
        AppView.setAppBootstrap(AppBootstrap);
        AppView.updateSelect("project", this.appConfig.projects);
        AppNotification.set('appDelete',this.appDelete);
        AppNotification.set('appDisplay',this.appDisplay);
        AppNotification.set('appTimer',this.appTimer);
        AppNotification.set('appSelect',this.appSelect);
    };

    public appDelete = (id:string) :void =>
    {
        const projectPath:string = this.getUserProjectPath();
        const data = AppUser.getQuery('delete',{path:projectPath, id:id});
        Ajax.jsonRequest(data).promise().done((response:{status:string, data:IUserQueryJson[]}) : void => {
            if (response.hasOwnProperty('status') && response.status==='success') {
                if (response.hasOwnProperty('data')) { AppView.setProjectList(response.data); }
            }
        });
    };

    public appDisplay = (obj:{name:string, data:string|number}) :void =>
    {
        AppView.setDisplay(obj);
    };

    public appTimer = ($obj:JQuery) :void =>
    {
        let command : string = $obj.attr('name')||'';
        command = command.replace('btn-','');

        switch (command) {
            case 'start':
                AppView.showBtn('play');
                AppUser.setTimer('start',AppView.toggleStartStatus());
                AppView.setDisplay({name:'start',data:AppUser.getUserTime('start','timestamp')});
                break;
            case 'end':
                AppUser.setTimer('end','');
                AppView.setStopStatus();
                break;
            case 'save':
                this.saveUserTime();
                break;
            case 'clear':
                AppView.setStartStatus('start');
                break;
        }
    };

    public appSelect = ($obj:JQuery) :void =>
    {
        let val:string = '' + $obj.val()|| '';
        val = $.trim(val);
        AppView.setStartStatus('');
        if (val !== '') {
            AppUser.setUserProject(val);
            AppView.showBtn('start');
            AppView.updateProjectList(this.getUserProjectPath());
        }
    };

    private saveUserTime = () :void =>
    {
        let projectPath:string = this.getUserProjectPath();
        AppView.viewConfirm ($('body').find('.container-protimer').first(), <string[]>AppUser.getQuery('confirm',null))
            .promise()
            .done( () : void => {
                const data = AppUser.getQuery('insert',{path:projectPath});
                Ajax.jsonRequest(data).promise().done( () : void => { AppView.updateProjectList(projectPath); });
                AppView.setStartStatus('start');
            })
            .fail( () : void => { AppView.setStartStatus('start'); });
    };

    private getUserProjectPath = () :string =>
    {
        const userProject :string = AppUser.getUserProject();
        return this.appConfig.sourcePath + this.appConfig.userDir + '/' + userProject + '/protime.json';
    };
}

export = App;
