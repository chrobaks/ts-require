
import { NumberFormat } from './NumberFormat';
import DialogOptions = JQueryUI.DialogOptions;

class RenderMod implements IClassRender
{
    private static _instance:RenderMod;

    private constructor () {}
    public static get Instance () { return this._instance || (this._instance = new this()); }

    public renderConfirm = (dialogConf:DialogOptions, $content:JQuery) :void =>
    {
        let dialog:JQuery = $("#dialog-confirm");
        if ( ! dialog.length) {
            $('<div></div>')
                .attr('id','dialog-confirm')
                .attr('title','Information')
                .append($('<div></div>'))
                .appendTo('body');
            dialog = $("#dialog-confirm");
        }
        dialog.dialog(dialogConf);
        dialog.find('div:eq(0)').empty().append($content);
    };

    public renderUlList = (list:string[]) :JQuery =>
    {
        const $ul:JQuery = $('<ul></ul>');
        list.forEach((item:string, index:number) :void => { $ul.append($('<li></li>').text(item)); });
        return $ul
    };

    public renderTbl = () :JQuery =>
    {
        return $('<table></table>');
    };

    public renderTblProject = (list:any[]) :void =>
    {
        const $table:JQuery = this.renderTbl();
        let sum:ISum = NumberFormat.getSumObj();
        let project:string = '';
        let proctCount:number = 0;

        $('body').find('.protimer-data').first().empty().append($table);

        for (let i = list.length-1; i >= 0; i--) {

            let obj = list[i];
            let trClss = 'proct-content';
            let icon = this.renderFontIcon({"class":"fa fa-trash-o", "aria-hidden":"true"});
            let anchor = this.renderAnchor(icon, {
                "data-item-id":obj.id,
                "data-toggle":"confirmation",
                "data-placement":"right",
                "title":"löschen?"
            });

            if (project !== obj.project) {
                project = obj.project;
                sum = NumberFormat.getSumObj();
                trClss = 'proct-content proct-' + proctCount;
            }

            sum = NumberFormat.getSum(obj.time, sum);
            this.renderTblTr($table, trClss, obj, anchor);

            if (i === 0 || list[i-1].project !== project) {
                let $content = $('.protimer-data').find('tr.proct-' + proctCount);
                this.renderTrBefore($content, {project:project+' / Gesamtzeit', sum:NumberFormat.getSumToString(sum)});
                proctCount++;
            }
        }
    };

    public renderTblTr = ($table:JQuery, trClss:string, data:{[key:string]:string}, $anchor:JQuery|null) :void =>
    {
        const $tdAnchor:JQuery = $('<td></td>',{"data-item-id":data.id});

        if ($anchor && $anchor !== null) {
            $tdAnchor.append($anchor);
        }
        $('<tr></tr>',{"class":trClss})
            .append(
                $tdAnchor,
                $('<td></td>').text(data.start),
                $('<td></td>').text(data.end),
                $('<td></td>').text(data.time)
            )
            .appendTo($table);
    };

    public renderTrBefore = ($before:JQuery, data:{[key:string]:string}) :void =>
    {
        $before.before(
            $('<tr></tr>', {"class":"header"}).append($('<td colspan="3"></td>').text(data.project), $('<td></td>').text(data.sum) ),
            $('<tr></tr>',{"class":"header"}).append(
                $('<td></td>').text('Delete'),
                $('<td></td>').text('Date start'),
                $('<td></td>').text('Date end'),
                $('<td></td>').text('Time')
            )
        );
    };

    public renderAnchor = (content:string|JQuery, attr:{[key:string]:string|number|boolean}) :JQuery =>
    {
        return $('<a></a>',attr).append(content);
    };
    public renderOptions = ($select:JQuery, list:{id:string,val:string}[]) :void =>
    {
        list.forEach((item:{id:string,val:string}, index:number) :void => {
            $select.append($('<option></option>',{"value":item.id}).text(item.val));
        });
    };

    public renderFontIcon = (attr:{[key:string]:string|number|boolean}) :JQuery =>
    {
        return $('<i></i>',attr);
    };
}

const Render = RenderMod.Instance;

export { DialogOptions, Render };