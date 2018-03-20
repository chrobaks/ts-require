
class AjaxService
{
    public jsonRequest = (data:any) :JQueryPromise<any> =>
    {
        return $.ajax({
            url      : 'index.php',
            data     : data,
            dataType : 'json'
        });
    }
}

export const Ajax = new AjaxService();