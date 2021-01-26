<?php 
 //Funcion de servidor para editar las tareas esto solo permite posisionarte de nunevo en el Form

include ('database.php');
$id = $_POST['id']; // guardamos en la variable id lo que estamos recibiendo de la propiedad id
$query = "SELECT * FROM task WHERE id = $id  "; //generamos la consulta SQL
$result = mysqli_query($connection, $query); // ejecutamos la consulta SQL y obtenemos un resultados


if(!$result){  // si algo falla lo detenemos y enviamos un mensaje
    die('Query Failed');
}

$json = array();
while($row = mysqli_fetch_array($result)){ // si hay un resultado entonces recorremos el resultado y lo convertimos en un json
    $json[] = array(

        'name' => $row['nombre'],
        'description' => $row['descripcion'],
        'id'=> $row['id']
    );
    
};

$jsonstring = json_encode($json[0]); // convertimos el objeto en String y lo enviamos de regreso al cliente
echo $jsonstring;




?>