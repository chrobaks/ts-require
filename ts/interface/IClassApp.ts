

interface IBootstrapOnConfirm {
    (callBack:any) : void;
}
interface IBootstrapConfirm {
    confirmation : IBootstrapOnConfirm;
}


interface IAppConfig {
    siteUrl:string;
    sourcePath:string;
    user:string;
    userDir:string;
    projects:{id:string,val:string}[];
}

interface IAjaxProjectList {
    url:string;
    data:{
        act:string,
        path:string
    };
    dataType:string;
}

interface IClassApp_AppDelete {
    (id:string) :void
}
interface IClassApp_AppDisplay {
    (obj:{name:string, data:string|number}) :void
}
interface IClassApp_AppTimer {
    ($obj:JQuery) :void
}
interface IClassApp_AppSelect {
    ($obj:JQuery) :void
}
interface IClassApp {
    appDelete  : IClassApp_AppDelete;
    appDisplay : IClassApp_AppDisplay;
    appTimer   : IClassApp_AppTimer;
    appSelect  : IClassApp_AppSelect;
}