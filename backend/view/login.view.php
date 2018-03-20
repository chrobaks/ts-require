<head>
    <meta charset="UTF-8">
    <title>ProTimer App / Login</title>
    <style>
        * {margin: 0;padding: 0;}
        body {background-color: #34515e;padding-top: 200px;font-family: Verdana, Arial, sans-serif;}
        form, input {width: 250px;}
        form {margin: 0 auto;}
        input {height: 30px;margin-bottom: 10px;  }
        input[type=text],input[type=password] {background-color: #8eacbb;  border: 1px solid #1c313a;  border-radius: 5px;  text-align: center;  }
        input[type=submit] {cursor:pointer;background-color: #607d8b;  border: 1px solid #1c313a;  border-radius: 5px;  color: #fff;  }
        #footer {position: absolute;  bottom: 0;  width: 100%;  height: 30px;  color : #fff;  font-size : 0.6em;  background-color: #1c313a;  border-top:1px solid #455a64;  display: flex;  flex-direction:row-reverse;  }
        #footer > div {padding: 7px 10px 0 0;  }
        #footer > div span:first-child {color : #6ec6ff;}
    </style>
</head>
<body>
<div id="login"><form action="index.php" method="post"><input id="username" name="user" type="text" placeholder="Enter username"><input name =pass type="password" placeholder="Enter password"><input type="submit" value="configurator login"></form></div>
<div id="footer"><div><span>ProTimer App v0.1</span> | netcodev&copy;2017</div></div>
<script>document.getElementById('username').focus();</script>
</body>
