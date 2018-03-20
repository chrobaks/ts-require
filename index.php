<?php
session_start();
require_once 'backend/App.php';
?>

<!DOCTYPE html>
<html lang="de">

<?php
if (isset($view['view'])) {
    include_once 'backend/view/'.$view['view'];
}
?>

</html>