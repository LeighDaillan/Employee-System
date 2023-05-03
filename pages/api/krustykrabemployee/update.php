<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

include('DBconnect.php');

$objDb = new DBconnect('localhost', 'root', '', 'krustykrabdb');
$conn = $objDb->connect();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = intval($_POST['id']);
    $name = $_POST['name'];
    $position = $_POST['position'];
    $email = $_POST['email'];
    $mobile = intval($_POST['mobile']);
    $birthdate = $_POST['birthdate'];
    $age = intval($_POST['age']);
    $gender = $_POST['gender'];
    $hired_date = $_POST['hired_date'];

    $sql = "UPDATE employees
                SET employee_name =  '$name', employee_position = '$position', employee_email = '$email', employee_mobile = $mobile, employee_birthdate =  '$birthdate', employee_age =  $age, employee_gender = '$gender', employee_hired_date =  '$hired_date'
                WHERE employee_id = $id";

    $result = mysqli_query($conn, $sql);

    echo json_encode(['status' => true, 'employee_id' => $id]);

}
mysqli_close($conn);
?>