<head>
    <meta charset="UTF-8">
    <title>Configurator App / Login</title>
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <style>
        * {margin: 0;padding: 0;}
        body {background-color: #34515e;padding-top: 200px;font-family: Verdana, Arial, sans-serif;}
        .container {max-width: 350px;margin: 0 auto;padding:0 ; border: 1px solid #000;}
        .label {  padding: 5px 10px;  background: #1c313a;  color : #fff;  font-size : 0.8em;  font-weight: bold;  }
        .label i {  margin-right: 10px;  }
        .alert {  padding: 30px;  background: #fff;  font-size : 0.9em;  color : #1c313a;  border-top: 1px solid #000;  }
        #footer {position: absolute;  bottom: 0;  width: 100%;  height: 30px;  color : #fff;  font-size : 0.6em;  background-color: #1c313a;  border-top:1px solid #455a64;  display: flex;  flex-direction:row-reverse;  }
        #footer > div {padding: 7px 10px 0 0;  }
        #footer > div span:first-child {color : #6ec6ff;}
    </style>
</head>
<body>
<div class="container">
    <div class="label"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> System-Information</div>
    <div class="alert">Applikationsfehler, bitte wende dich an den Support!</div>
</div>
<div id="footer"><div><span>Configurator App v0.1</span> | netcodev&copy;2017</div></div>
</body>