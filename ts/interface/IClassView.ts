
interface IAppBtn  {
    [key: string] : any;
    start : any;
    end   : any;
    save  : any;
    clear : any;
}

interface IAppSelect  {
    [key: string] : any;
    project ? : null
}

interface IAppDisplay  {
    [key: string] : any;
    start   : any;
    end     : any;
    protime : any;
}

interface IViewDisplay  {
    [key: string] : any;
    name:string;
    data:string|number;
}

interface IClassView_SetAppBootstrap {
    (object:IBootstrapConfirm) :void
}
interface IClassView_ViewConfirm {
    ($appendTo:JQuery, list:string[]) :JQueryPromise<void>
}
interface IClassView_DisabledBtn {
    (name:string) :void
}
interface IClassView_ShowBtn {
    (name:string) :void
}
interface IClassView_SetProjectList {
    (list:any[]) :void
}
interface IClassView_SetDisplay {
    (obj:IViewDisplay) :void
}
interface IClassView_GetStartStatus {
    () :any
}
interface IClassView_SetStartStatus {
    (status:string) :void
}
interface IClassView_SetStopStatus {
    () :void
}
interface IClassView_TtoggleStartStatus {
    () :string
}
interface IClassView_UpdateSelect {
    (selectName:string, list:{id:string,val:string}[]) :void
}
interface IClassView_UpdateProjectList {
    (path:string) :void
}

interface IClassView {
    setAppBootstrap   : IClassView_SetAppBootstrap;
    viewConfirm       : IClassView_ViewConfirm;
    disabledBtn       : IClassView_DisabledBtn;
    showBtn           : IClassView_ShowBtn;
    setProjectList    : IClassView_SetProjectList;
    setDisplay        : IClassView_SetDisplay;
    getStartStatus    : IClassView_GetStartStatus;
    setStartStatus    : IClassView_SetStartStatus;
    setStopStatus     : IClassView_SetStopStatus;
    toggleStartStatus : IClassView_TtoggleStartStatus;
    updateSelect      : IClassView_UpdateSelect;
    updateProjectList : IClassView_UpdateProjectList
}