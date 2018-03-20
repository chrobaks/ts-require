
class AppHelper implements IClassHelper
{
    public strReplace = (regexp:any, str:string, replaceWith:{[key:string]:string}) :string =>
    {
        let strMatch = <string[]>str.match(regexp);
        strMatch.forEach((item:string, index:number) :void => {
            str = str.replace(item,replaceWith[item]);
        });
        return str;
    };

    public langArgs = (id:string, args:{[key:string]:string}) :string[] =>
    {
        let lang :{[key:string]:string[]} = {
            "projectConfirm" : [
                'Projekt : ' + args.userProject,
                'Startzeit : ' + args.start,
                'Endzeit : ' + args.end,
                'Zeit : ' + args.time,
                'Diese Projektzeit speichern?'
            ]
        };
        return (lang.hasOwnProperty(id)) ? lang[id] : [];
    };
}

export const Helper:IClassHelper = new AppHelper();