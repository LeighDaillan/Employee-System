<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

include('DBconnect.php');

$objDb = new DBconnect('localhost', 'root', '', 'krustykrabdb');
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {

    $id = intval(explode('/', $_SERVER['REQUEST_URI'])[3]);
    $sql = "DELETE FROM employees
            WHERE employee_id = $id";

    $result = mysqli_query($conn, $sql);

    echo json_encode(['status' => true, 'employee_id' => $id]);

}
mysqli_close($conn);
?>