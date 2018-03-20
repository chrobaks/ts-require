<?php
/**
 * Created by PhpStorm.
 * User: Chrobak
 * Date: 15.09.2017
 * Time: 21:26
 */

require_once 'FileApi.php';

class RestApi
{
    private $requestData;
    private $fileApi;

    public function __construct()
    {
        $this->fileApi = new FileApi();
    }
    public function ajax ($request)
    {
        if (isset($request['act'])) {
            switch ($request['act']) {
                case 'setProtime':
                    if ( $this->fileApi->writeJsonFile($request['path'],$request['json'])) {
                        print json_encode(["status"=>"success"]);
                    } else {
                        print json_encode(["status"=>"error", "error"=>$this->fileApi->error]);
                    }
                    break;
                case 'deleteProtime':
                    $result = $this->fileApi->deleteJsonEntry($request['path'],$request['json']);
                    if ( $result['status'] === true) {
                        print json_encode(["status"=>"success","data"=>$result['data']]);
                    } else {
                        print json_encode(["status"=>"error"]);
                    }
                    break;
                case 'getProtime':
                    $res = $this->fileApi->getJsonFile($request['path']);
                    if ($res !== null) {
                        print json_encode($res);
                    }
                    break;
            }
        }
    }
}

$appRestApi = new RestApi();
$appRestApi->ajax($_REQUEST);