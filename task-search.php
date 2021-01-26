



<?php 
//Esta Funcion va y busca algo en la base de datos

include ('database.php'); // Conexion a DB

$search = $_POST['search']; // Recipiente para dato

if(!empty($search)){
    $query = "SELECT * FROM task WHERE nombre LIKE '$search%'"; //Hago una consulta y busco en la base de datos (% coincide con todos los elementos parecidos)
    $result = mysqli_query($connection, $query); // ejecuto mi consulta y le paso los parametros de la consulta($query) y conexion ($connection) 

    if(!$result){
        die('Query ERROR'.mysqli_error($connection)); // si no hay resultado termino conexion y muestro en error
    }

    $json = array();
    while($row=mysqli_fetch_array($result)){ //mientras Recupera una fila de resultados como un array asociativo, un array numérico o como ambos

        $json[]= array(
            'name' => $row['nombre'], //Clave: 'name' Valor: 'nombre' (DataBase)
            'description' => $row['descripcion'],
            'id' => $row['id']

        );

       

    }

    $jsonstring = json_encode($json); // convierto en String en formato JSON
    echo $jsonstring; // Devuelvo al Cliente los datos en String con estructura JSON
}






?>