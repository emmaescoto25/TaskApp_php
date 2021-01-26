<?php 

include ('database.php');

if(isset($_POST['id'])){ // si existe el parametro 
$id = $_POST['id']; //lo guardo dentro de una variable
$query = "DELETE FROM task WHERE id = $id"; // genero my consult a la DB
$result = mysqli_query($connection, $query); // ejecuto el query


if(!$result){  // si no obtengo ningun resultado
    die ('Query Failed !!' );  
}

echo "Task Deleted Successfully";

}


?>