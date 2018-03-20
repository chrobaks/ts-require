<?php
/**
 * Created by PhpStorm.
 * User: Chrobak
 * Date: 19.11.2017
 * Time: 20:04
 */

class FileApi
{
    public $error;
    public function writeJsonFile($filePath, $data)
    {
        $this->error = [];
        $res = false;

        if ($json = file_get_contents($filePath)) {

            $json = json_decode($json, true);
            $json[] = $data;
            if($file = fopen($filePath, "w")){
                fwrite($file, json_encode($json));
                fclose($file);
                $res = true;
            } else {
                $this->error[] = 'Cannot open file:'.$filePath;
            }
        } else {
            $this->error[] = 'Cannot find Content:'.$filePath;
        }

        return $res;
    }
    public function getJsonFile ($filePath)
    {
        $json = file_get_contents($filePath);
        return json_decode($json, true);
    }
    public function deleteJsonEntry ($filePath, $data)
    {
        $copy = [];
        $res = false;
        $id = (isset($data['id'])) ? trim($data['id']) : '';
        if ($id !== '') {
            $json = file_get_contents($filePath);
            $entries = json_decode($json, true);
            if (is_array($entries) && ! empty($entries)) {
                foreach($entries as $entry) {
                    if (isset($entry['id']) && $entry['id'] !== $id) {
                        $copy[] = $entry;
                    }
                }
            }
            if ($file = fopen($filePath, "w")) {
                fwrite($file, json_encode($copy));
                fclose($file);
                $res = true;
            }
        }
        return ["status"=>$res,"data"=>$copy];
    }
}