<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

include('DBconnect.php');

$objDb = new DBconnect('localhost', 'root', '', 'krustykrabdb');
$conn = $objDb->connect();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $position = $_POST['position'];
    $email = $_POST['email'];
    $mobile = intval($_POST['mobile']);
    $birthdate = $_POST['birthdate'];
    $age = intval($_POST['age']);
    $gender = $_POST['gender'];
    $hired_date = $_POST['hired_date'];


    try {
        $sql = "INSERT INTO employees (employee_name, employee_position, employee_email, employee_mobile, employee_birthdate, employee_age, employee_gender, employee_hired_date)
               VALUES ('$name', '$position', '$email', '$mobile', '$birthdate', '$age', '$gender', '$hired_date')";

        $result = mysqli_query($conn, $sql);

        echo json_encode(['status' => true, 'employee_name' => $name]);
    } catch (Exception $e) {
        echo json_encode(['status' => false, 'error' => $e->getMessage()]);
    }


}
mysqli_close($conn);
?>