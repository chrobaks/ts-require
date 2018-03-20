
class NumberFormatMod implements IClassNumberFormat
{
    public getSumToString = (sum:ISum) : string =>
    {
        const h :number|string = (sum.hour <= 9) ? '0' + sum.hour : sum.hour;
        const m :number|string = (sum.min <= 9) ? '0' + sum.min : sum.min;
        const s :number|string = (sum.sec <= 9) ? '0' + sum.sec : sum.sec;
        return h+':'+m+':'+s;
    };
    public getSum = (data:string, sum:ISum) : ISum =>
    {
        let time:string[] = data.split(':');
        time.forEach((item:string, index:number) => {
            let m:number|string = (item.match(/^0/)) ? item.replace('0','') : item;
            let n:number = +m||0;
            if (index===0) {
                sum.hour += n;
            } else if (index===1) {
                if (sum.min + n < 60) {
                    sum.min += n;
                } else {
                    sum.hour++;
                    sum.min += (n-60);
                }
            } else if (index===2) {
                if (sum.sec + n < 60) {
                    sum.sec += n;
                } else {
                    sum.min++;
                    sum.sec += (n-60);
                }
            }
        });
        return sum;
    };
    public getSumObj = () : ISum =>
    {
        return {hour:0,min:0,sec:0};
    }
}
const NumberFormat = new NumberFormatMod();
export {NumberFormat};