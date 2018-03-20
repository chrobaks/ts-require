
import { AppNotification } from './app/NotificationService';
import { Helper } from './app/AppHelper';
import { UserQuery } from './module/UserQuery';
import { UserTime as Timer } from './module/Time';

class User implements IClassUser
{
    private userTime    : IUserTime;
    private userProject : string;

    private static _instance:User;

    private constructor () {
        this.userTime = {
            start : Timer.getUserTimeObj(),
            end   : Timer.getUserTimeObj(),
            time  : ''
        };
        this.userProject = '';
        AppNotification.set('actualTime',this.actualTime);
    }
    public static get Instance () { return this._instance || (this._instance = new this()); }

    public actualTime = (args:number|string) :void =>
    {
        AppNotification.exec('appDisplay',{name:'protime',data:args});
        this.updateUserTime('time', args);
    };

    public getQuery = (queryId:string, args:any) :IUserInsertQuery|IUserDeleteQuery|string[] =>
    {
        let res:IUserInsertQuery|IUserDeleteQuery|string[] = [];
        if (queryId==='delete') {
            res = UserQuery.deleteQuery(args);
        } else {
            let data:{[key:string]:string} = this.getQueryValue();
            if (queryId==='insert') {
                data.path = args.path;
                data.id = '' + this.getUserTime('start','time');
                res = UserQuery.insertQuery(data);
            } else {
                res = Helper.langArgs('projectConfirm',data);
            }
        }
        return res;
    };

    public setUserProject = (project:string):void =>
    {
        this.userProject = project;
    };

    public setTimer = (command:string, status:string):void =>
    {
        Timer.setRunTimerOk(false);
        if (command === 'start') {
            this.toggleRunTimer(command, status);
        } else {
            this.updateUserTime(command,Timer.getDate());
        }
    };

    public getUserProject = ():string =>
    {
        return this.userProject;
    };

    public getUserTime = (command:string, prop:string):string =>
    {
        return (this.userTime[command].hasOwnProperty(prop)) ? '' + this.userTime[command][prop] : '' + this.userTime[command];
    };

    private getQueryValue = () :{[key:string]:string} =>
    {
        return {
            userProject : this.userProject,
            start       : this.getUserTime('start','timestamp'),
            end         : this.getUserTime('end','timestamp'),
            time        : this.getUserTime('time',''),
        };
    };

    private toggleRunTimer = (command:string, status:string):void =>
    {
        if (status === 'play' && Timer.timerHasPause() !== true) {
            this.updateUserTime(command, Timer.getDate());
        }
        Timer.toggleRunTimer(this.userTime[command].time, status);
    };

    private updateUserTime = (command:string, date:ITimerDate|number|string):void =>
    {
        this.userTime[command] = date;
        if (command === 'start') { this.userTime.end = Timer.getUserTimeObj() }
    };

}

export const AppUser :IClassUser = User.Instance;
