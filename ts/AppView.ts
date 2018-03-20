
import { AppNotification } from './app/NotificationService';
import { DialogOptions, Render } from './module/Render';
import {AppUser} from "./AppUser";

class View implements IClassView
{
    private static _instance : IClassView;
    private AppBootstrap     : IBootstrapConfirm;
    private $btn             : IAppBtn;
    private $select          : IAppSelect;
    private $display         : IAppDisplay;

    private constructor () {
        this.initSelect();
        this.initBtn();
        this.initDisplay();
    }
    public static get Instance () { return this._instance || (this._instance = new this()); }

    public disabledBtn = (name:string) :void =>
    {
        for (let k in this.$btn) { if (name === '' || name !== k) { this.$btn[k].prop('disabled','disabled'); }}
    };

    public getStartStatus = () :string =>
    {
        return this.$btn.start.attr('data-value')||'';
    };

    public showBtn = (name:string) :void =>
    {
        switch (name) {
            case 'start':
                this.$btn.start.prop('disabled',false);
                break;
            case 'play':
                this.$btn.end.prop('disabled',false);
                break;
            case 'save':
                this.$btn.clear.prop('disabled',false);
                this.$btn.save.prop('disabled',false);
                this.$btn.start.prop('disabled',true);
                break;
        }
    };

    public setAppBootstrap = (object:IBootstrapConfirm) :void => { this.AppBootstrap = object; };

    public setProjectList = (list:any[]) :void =>
    {
        Render.renderTblProject(list);
        this.AppBootstrap.confirmation( ($obj:JQuery) :void => {
            const id:string = '' + $obj.attr('data-item-id')||'';
            if (id !== '') {AppNotification.exec('appDelete',id);}
        });
    };

    public setDisplay = (obj:IViewDisplay) :void =>
    {
        if (obj.name === '' ) {
            for (let k in this.$display) { this.$display[k].val(''); }
        } else {
            this.$display[obj.name].val(obj.data);
            if (obj.name === 'start') { this.$display.end.val('') }
        }
    };

    public setStartStatus = (status:string) :void =>
    {
        this.disabledBtn('');
        this.setDisplay ({name:'', data:''});
        if (status === 'start') {
            this.showBtn('start');
        }
    };

    public setStopStatus = () :void =>
    {
        this.setDisplay({name:'end',data:AppUser.getUserTime('end','timestamp')});
        this.showBtn('save');
        if (this.getStartStatus() === 'pause') { this.toggleStartStatus(); }
    };

    public toggleStartStatus = () :string =>
    {
        const status:string = (typeof this.getStartStatus() !== 'undefined') ? this.getStartStatus() : '';
        const attr:string   = (status === 'play') ? 'pause':'play';
        this.$btn.start.attr('data-value',attr);
        this.$btn.start.text(attr);
        return status;
    };

    public updateSelect = (selectName:string, list:{id:string,val:string}[]) :void =>
    {
        if (this.$select.hasOwnProperty(selectName) && list.length) {
            Render.renderOptions(this.$select[selectName], list);
        }
    };

    public updateProjectList = (path:string) :void =>
    {
        const namespace = this;
        const ajaxConf:IAjaxProjectList = {
            url      : 'index.php',
            data     : {"act" : "getProtime", "path": path},
            dataType : 'json'
        };
        $.ajax(ajaxConf).done( function (response) { namespace.setProjectList(response); });
    };

    public viewConfirm = ($appendTo:JQuery, list:string[]) :JQueryPromise<void> => {
        const dfr = $.Deferred<void>();
        const dialogConf : DialogOptions  = {
            resizable : false,
            height    : "auto",
            width     : 400,
            modal     : true,
            buttons   : {
                "speichern" : function () {$( this ).dialog( "close" );dfr.resolve();},
                "abbbrechen" : function () {$( this ).dialog( "close" );dfr.reject();}
            }
        };
        Render.renderConfirm(dialogConf, Render.renderUlList(list));
        return dfr.promise();
    };

    private initBtn = () :void =>
    {
        this.$btn = {start : null, end : null, save : null, clear : null};
        for (let k in this.$btn) { this.$btn[k] = $('button[name=btn-'+k+']'); }
        $('.protimer-ctrl button').on('click', function () { AppNotification.exec('appTimer',$(this)); });
    };

    private initSelect = () :void =>
    {
        this.$select = {project : null};
        for (let k in this.$select) { this.$select[k] = $('select[name='+k+']'); }
        $('.protimer-ctrl select').on('change', function () { AppNotification.exec('appSelect',$(this)); });
    };

    private initDisplay = () :void =>
    {
        this.$display = {start : null, end : null, protime : null};
        for (let k in this.$display) { this.$display[k] = $('input[name='+k+']'); }
    };
}

export const AppView :IClassView = View.Instance;
