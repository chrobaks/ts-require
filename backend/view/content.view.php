<head>
    <meta charset="UTF-8">
    <title>ProjectTimer TS</title>
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/jquery-ui.min.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/app.css">
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>PROJECT TIME APP</h3></div>
    </div>
</div>
<div class="container container-protimer">
    <form>
        <div class="row protimer-ctrl"><select name="project"><option value="" selected>Projekt-Auswahl</option></select><label>Projektauswahl</label></div>
        <div class="row"><input name="start" readonly><label>Startdatum</label></div>
        <div class="row"><input name="end" readonly><label>Enddatum</label></div>
        <div class="row">
            <input name="protime" readonly><label>Projektzeit</label>
            <hr>
        </div>
        <div class="row protimer-ctrl">
            <button type="button" class="btn btn-primary" name="btn-start" data-value="play" disabled>play</button>
            <button type="button" class="btn btn-default" name="btn-end" disabled>stop</button>
            <button type="button" class="btn btn-success" name="btn-save" disabled>save</button>
            <button type="button" class="btn btn-danger" name="btn-clear" disabled>clear</button>
        </div>
    </form>
    <div class="protimer-data"></div>
</div>
<div id="footer"><div><span>ProTimer App v0.1</span> | netcodev&copy;2017</div></div>
<script src="libraries/jquery-3.1.1.min.js"></script>
<script src="libraries/jquery-ui.min.js"></script>
<script src="libraries/bootstrap.min.js"></script>
<script src="libraries/bootstrap-confirmation-2.4.min.js"></script>
<script src="libraries/require.js"></script>
<script>
    var AppConfig = {
        'siteUrl'    : '<?=$view['siteUrl'];?>',
        'sourcePath' : '<?=$view['sourcePath'];?>',
        'user'       : '<?=$view['user']['name'];?>',
        'userDir'    : '<?=$view['userDir'];?>',
        'projects'   : <?=json_encode($view['projects']);?>
    };
    var AppBootstrap = ( function ($) {
        function confirmation (callBack)
        {
            $('a[data-toggle="confirmation"]').confirmation({
                rootSelector : '[data-toggle="confirmation"]',
                singleton    : true,
                popout       : true,
                onConfirm    : function(){callBack($(this));}
            });
        }
        return {
            confirmation : confirmation
        }
    })(jQuery);
    if(require && typeof require.config !== 'undefined') {
        require(['js/App'], function (App) {
            var app = new App(AppConfig, AppBootstrap);
        });

    }
</script>
</body>