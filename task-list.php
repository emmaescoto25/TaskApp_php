<?php 
// Esta fucnion nos ayuda a traernos los datos de la DB y colocarlas en la tabla del cliente.
include ('database.php'); // Variables de Conexion

$query = ('SELECT * from task'); //Seleccionamos toda la tabla
$result = mysqli_query($connection,$query); //Ejecutamos el query anterior

if(!$result){ // si no hay un resultado devuelvo un error con la conexion
    die('Query Failed'.mysqli_error($connection));
}

//Creamos variable para recibir el arreglo de la base
$json= array();
while($row=mysqli_fetch_array($result)){  // recorremos cada fila obtenida y la guardo en $row
    //lleno el string con lo que tengo en $row
    $json[] = array(
        'dato1' => $row['nombre'],
        'dato2' => $row['descripcion'],
        'dato3'=>$row['id']

    );

}

$jsonstring = json_encode($json);
echo $jsonstring;

?>