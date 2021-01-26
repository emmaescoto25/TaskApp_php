<?php 
// Esta Funcion va e inserta datos a la Data Base

include('database.php');

if(isset($_POST['name'])){ // Si recibo la propiedad name 
    $name = $_POST['name']; // Guardo la propiedad name
    $description = $_POST['description']; // Guardo la propiedad description

    $query = "INSERT into task (nombre, descripcion) VALUES('$name','$description')"; // genero el query para la insercion a la base de datos
    $result = mysqli_query($connection, $query); // Ejecuto el query anterior

    if(!$result){
        die('Query Failed');
    }

    echo 'Task Added Successfully';





};


?>