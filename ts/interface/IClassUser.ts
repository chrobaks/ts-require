
interface IUserTime {
    [key: string] : any;
    start         : ITimerDate;
    end           : ITimerDate;
    time          : any;
}

interface IClassUser_SetTimer {
    (command:string, status:string):void
}
interface IClassUser_GetUserProject {
    ():string
}
interface IClassUser_SetUserProject {
    (project:string):void
}
interface IClassUser_GetQuery {
    (queryId:string, args:any) :IUserInsertQuery|IUserDeleteQuery|string[]
}
interface IClassUser_ActualTime {
    (args:number|string):void
}
interface IClassUser_GetUserTime {
    (command:string, prop:string):string
}

interface IClassUser {
    setTimer                  : IClassUser_SetTimer;
    getUserProject            : IClassUser_GetUserProject;
    setUserProject            : IClassUser_SetUserProject;
    getQuery                  : IClassUser_GetQuery;
    actualTime                : IClassUser_ActualTime;
    getUserTime               : IClassUser_GetUserTime;
}