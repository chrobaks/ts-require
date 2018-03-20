<?php
/**
 * Created by PhpStorm.
 * User: Chrobak
 * Date: 16.09.2017
 * Time: 22:50
 */

if (isset($_REQUEST['act']) || isset($_REQUEST['prouser'])) {
    require_once 'RestApi.php';
}

$appConfig = [
    'isRequest'     => false,
    'siteUrl'       => 'http://127.0.0.1/ts-require/',
    'sourcePath'    => 'backend/user/',
    'projects' => [
        [
            'id' => 'configurator',
            'val' => 'Konfigurator'
        ]
    ]
];

class App
{
    public $config = [];

    public function __construct($appConfig)
    {
        $this->config = $appConfig;
        $this->config['view'] = 'error.view.php';
    }
    public function route ()
    {
        if (isset($_REQUEST['act']) || isset($_REQUEST['prouser'])) {
            $this->config['isRequest'] = true;
        } else {
            $_SESSION['u'] = 'customer';
            $_SESSION['user'] = ['name'=>'Stefan Chrobak'];
            $this->config['view'] = 'content.view.php';
        }
        return $this->view();
    }
    private function view ()
    {
        if ($this->config['isRequest'] === false) {
            $view = [
                'view'       => $this->config['view'],
                'siteUrl'    => $this->config['siteUrl'],
                'sourcePath' => $this->config['sourcePath'],
                'projects'   => $this->config['projects'],
                'user'       => $_SESSION['user']
            ];
            $view['userDir'] = strtolower(str_replace(' ','_', $view['user']['name'])) ;
        } else {
            $view = ['isRequest' => $this->config['isRequest']];
        }
        return $view;
    }
}

$app = new App($appConfig);
$view = $app->route();
if (isset($view['isRequest'])) { exit(0); }