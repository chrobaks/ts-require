
interface ISum
{
    hour : number;
    min  : number;
    sec  : number;
    [key:string] : number;
}

interface IClassNumberFormat_GetSumToString {
    (sum:ISum) : string
}
interface IClassNumberFormat_GetSum {
    (data:string, sum:ISum) : ISum
}
interface IClassNumberFormat_GetSumObj {
    () : ISum
}

interface IClassNumberFormat {
    getSumToString : IClassNumberFormat_GetSumToString;
    getSum         : IClassNumberFormat_GetSum;
    getSumObj      : IClassNumberFormat_GetSumObj;
}