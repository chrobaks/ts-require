

interface IClassRender_RenderConfirm {
    (dialogConf:JQueryUI.DialogOptions, $content:JQuery) :void
}
interface IClassRender_RenderUlList {
    (list:string[]) :JQuery
}
interface IClassRender_RenderTbl {
    () :JQuery
}
interface IClassRender_RenderTblProject {
    (list:any[]) :void
}
interface IClassRender_RenderTblTr {
    ($table:JQuery, trClss:string, data:{[key:string]:string}, $anchor:JQuery|null) :void
}
interface IClassRender_RenderTrBefore {
    ($before:JQuery, data:{[key:string]:string}) :void
}
interface IClassRender_RenderAnchor {
    (content:string|JQuery, attr:{[key:string]:string|number|boolean}) :JQuery
}
interface IClassRender_RenderOptions {
    ($select:JQuery, list:{id:string,val:string}[]) :void
}
interface IClassRender_RenderFontIcon {
    (attr:{[key:string]:string|number|boolean}) :JQuery
}

interface IClassRender {
    renderConfirm    : IClassRender_RenderConfirm;
    renderUlList     : IClassRender_RenderUlList;
    renderTbl        : IClassRender_RenderTbl;
    renderTblProject : IClassRender_RenderTblProject;
    renderTblTr      : IClassRender_RenderTblTr;
    renderTrBefore   : IClassRender_RenderTrBefore;
    renderAnchor     : IClassRender_RenderAnchor;
    renderOptions    : IClassRender_RenderOptions;
    renderFontIcon   : IClassRender_RenderFontIcon;
}