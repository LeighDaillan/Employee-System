<?php

include('DBconnect.php');

$objDb = new DBconnect('localhost', 'root', '', 'krustykrabdb');
$conn = $objDb->connect();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $sql = "SELECT * FROM employees";

    // run SQL statement
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        http_response_code(404);
        die(mysqli_error($conn));
    }

    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);
}

mysqli_close($conn);

?>