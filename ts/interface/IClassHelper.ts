

interface IClassHelper_StrReplace {
    (regexp:any, str:string, replaceWith:{[key:string]:string}) :string
}
interface IClassHelper_LangArgs {
    (id:string, args:{[key:string]:string}) :string[]
}

interface IClassHelper {
    strReplace : IClassHelper_StrReplace;
    langArgs   : IClassHelper_LangArgs;
}