
import { AppNotification } from '../app/NotificationService';

class Time implements IClassTimer
{
    private static _instance :Time;
    private timerDate        :ITimerDate;
    private runTimerOk       :boolean;
    private hasPause         :boolean;
    private actualTime       :number;
    private userTime         :number;

    private constructor () {}
    public static get Instance () { return this._instance || (this._instance = new this()); }

    public setRunTimerOk = (ok:boolean) :void => { this.runTimerOk = ok; };

    public setUserTime = (time:number|string) :void => {
        this.userTime = + time;
    };

    public getDate = () :ITimerDate =>
    {
        let res:ITimerDate = this.getUserTimeObj();
        this.setTimerDate();
        for ( let key in this.timerDate) { res[key] = this.timerDate[key] }
        return res;
    };

    public getUserTimeObj = () :ITimerDate =>
    {
        return {day:0, month:0, year:0, hour:0, min:'', time:0, timestamp:''};
    };

    public runTimer = (runs:number) :void =>
    {
        if ( ! this.runTimerOk) {return;}
        const date : Date = new Date();
        let dateDiff : number|string = date.getTime();
        let namespace : Time = this;
        if (runs) {
            this.actualTime = (runs > 1) ? (this.actualTime + 1000) : this.actualTime;
            dateDiff = this.actualTime;
            dateDiff = Math.round(dateDiff / 1000);
            if (dateDiff >= 3600) {
                dateDiff = this.getHours(dateDiff);
            } else {
                dateDiff = '00:' + this.getMinutes(dateDiff);
            }
        } else {
            this.actualTime = dateDiff - this.userTime;
            dateDiff = '00:00:00';
        }
        AppNotification.exec('actualTime',dateDiff);
        if (this.runTimerOk) {
            window.setTimeout(function(){namespace.runTimer(2)}, 1000);
        }
    };


    public toggleRunTimer = (userTime:number|string, status:string):void =>
    {
        let runTimerVal:number = 0;
        if (status === 'play') {
            if (this.hasPause) {
                this.hasPause = false;
                runTimerVal = 1
            } else {
                this.setUserTime(userTime);
            }
            this.setRunTimerOk(true);
            this.runTimer(runTimerVal);
        } else {
            this.hasPause = true;
        }
    };

    public timerHasPause = () :boolean =>
    {
        return this.hasPause;
    };

    private setTimerDate = () :void =>
    {
        const date:Date = new Date();
        this.timerDate = {
            day   : this.formatZeroPreFix(date.getDate()),
            month : this.formatZeroPreFix(date.getMonth() + 1),
            year  : date.getFullYear(),
            hour  : this.formatZeroPreFix(date.getHours()),
            min   : this.formatZeroPreFix(date.getMinutes()),
            time  : date.getTime(),
            timestamp : ''
        };
        this.timerDate.timestamp = this.timerDate.day  + '.' + this.timerDate.month  + '.' + this.timerDate.year  + ' ' +this.timerDate.hour  + ':' +this.timerDate.min;
    };

    private formatZeroPreFix = (dateVal:number) :string =>
    {
        return ((dateVal <= 9 ) ? '0' + dateVal : '' + dateVal);
    };

    private formatCalcNumber = (number:number, val:number, format:string) :number|string =>
    {
        let res:number|string = '';
        switch (format) {
            case '%':
                res = ((number % val <= 9) ? '0' +(number % val) : (number % val) );
                break;
            case '/':
                res = ((number / val) <= 9) ? '0' + (number / val) : (number / val);
                break;
        }
        return res;
    };

    private getMinutes = (time:number) :string =>
    {
        let cache:number|string = '';
        let res:string = '';
        if (time >= 60 ) {
            if(time % 60 === 0) {
                cache = this.formatCalcNumber(time, 60, '/');
                res = cache + ':00';
            } else {
                cache = Math.floor(time / 60);
                cache = (cache <= 9) ? '0' + cache : cache
                res = cache + ':' + this.formatCalcNumber(time, 60, '%');
            }
        } else {
            res = '00:' + this.formatCalcNumber(time, 60, '%');
        }
        return res;
    };

    private getHours = (time:number) :string =>
    {
        let cache:number|string = '';
        let res:string = '';

        if(time % 3600 === 0) {
            cache = this.formatCalcNumber(time, 3600, '/');
            res = cache + ':00:00';
        } else {
            cache = Math.floor(time / 3600);
            cache = (cache <= 9) ? '0' + cache : cache;
            res = cache + ':' + this.getMinutes((time % 3600));
        }
        return res;
    };
}

const UserTime = Time.Instance;

export {UserTime};