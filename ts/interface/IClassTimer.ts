
interface ITimerDate {
    [key: string] : any
    day           : number|string;
    month         : number|string;
    year          : number;
    hour          : number|string;
    min           : number|string;
    time          : number;
    timestamp     : string;
}

interface IClassTimer_SetRunTimerOk{
    (ok:boolean) :void
}
interface IClassTimer_SetUserTime {
    (time:number|string) :void
}
interface IClassTimer_GetDate {
    () :ITimerDate
}
interface IClassTimer_GetUserTimeObj {
    () :ITimerDate
}
interface IClassTimer_RunTimer {
    (runs:number) :void
}
interface IClassTimer_ToggleRunTimer {
    (userTime:number|string, status:string):void
}
interface IClassTimer_TimerHasPause {
    () :boolean
}
interface IClassTimer {
    setRunTimerOk  : IClassTimer_SetRunTimerOk;
    setUserTime    : IClassTimer_SetUserTime;
    getDate        : IClassTimer_GetDate;
    getUserTimeObj : IClassTimer_GetUserTimeObj;
    runTimer       : IClassTimer_RunTimer;
    toggleRunTimer : IClassTimer_ToggleRunTimer;
    timerHasPause  : IClassTimer_TimerHasPause;
}