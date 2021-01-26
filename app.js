
$(document).ready(function () { //El codigo se ejecuta una vez que el DOM este listo Esta Es La Funcion Principal
  GetTasks(); // inicializo la lista de tareas
  let editar = false; // variable para editar el form de tareas

  $('#task-result').hide(); // oculto el recuado donde se muestran las tareas buscadas por search


  $('#search').keyup(function (e) { // esperamos el evento presionar tecla(cualquiera)  "keyup"
    if ($('#search').val()) { // Si alguien a tipeado o buscado algo entonces ejecuto la busqueda.
      let search = $('#search').val(); // Guardo el valor del #search en let search.

      //Ajax Jquery request =>REF task-search.php-----------------------------------------------------------------------------------------------------
      $.ajax({
        url: 'task-search.php',
        type: 'POST',
        data: { search },
        success: function (response) { // si es Exitoso recibo la respuesta

          let tasks = JSON.parse(response); // la convierto a formato JSON y la guardo en tasks ya que hasta "response" viene en String con formato JSON
          let template = ''; //plantilla para mostrar en pantalla se usara para recorrer la base de datos 

          tasks.forEach(task => { //el for nos ayuda a recorrer las tablas las cuales ponemos dentro de los <li></li>
            console.log(task)

            template += `<li> 
          ${task.name}
          
          </li>`

          })

          $('#container').html(template); // anexo los datos a este #id HTML 
          $('#task-result').show(); // muestro la tarjetita con tareas 



        }
      });

    };
  });








  //Envio De Datos Del Formulario TASK a la BASE: ->REF task-add.php--------------------------------------------------------------------

  $('#task-form').submit(function(e){

    // creamos un objeto para enviar los datos del formulario  #task-form
    const postData = { 
      name: $('#name').val(),
      description: $('#description').val(),
      id: $('#taskId').val()

    };

     let url = editar === false ? 'task-add.php' : 'task-edit.php'; // si editar es falso lo envias a task-add.php y si es verdadero a task-edit.php
     console.log(url);

    //Otro metodo aparte de AJAX para agregar las tareas a la base
    $.post(url, postData, function(response){
      GetTasks(); // refresco la lista cada que agrego una tarea
      console.log(response);
      $('#task-form').trigger('reset') //limpi los datos del formulario.

    });
    e.preventDefault();
    
  })







  //Funcion para traer los datos a la lista-> REF task-list.php-----------------------------------------------------------
  
  function GetTasks(){

    $.ajax({
      url: 'task-list.php',
      type: 'GET',
      success: function(response){ // cachamos la respuesta del task-list.php
        let tasks = JSON.parse(response) //convierto a JSON la respuesta.
        let template = '';// genero una variable vacia
  
        tasks.forEach(task => { // recorro la respuesta es decir cada una de las filas
           
  
          //voy llenando la variable (template) con lo que recorri(task) en formato de una tabla de html
          template += ` 
          <tr taskId = ${task.dato3}>
  
          <td >${task.dato3}</td>
          <td>
          <a href="#" class="task-item"> ${task.dato1}</a>
          </td>
          <td>${task.dato2}</td>
          <td>
           <button class="task-delete btn btn-danger"> 
           Delete
           </button>
          </td>
  
          </tr>
          `      
        })
        
        
        $('#tasks').html(template); //le decimos a la plantilla donde se pinte
        
      }
      
    });
  }

  //ELIMINAR TAREAS -->REF task-delete.php --------------------------------------------------------------------------------------------

  //Del documento detectamos el evento click de la cualquiera que tenga la clase .task-delete (boton eliminar )
  $(document).on('click', '.task-delete', function(){ 
    if(confirm('Are you sure want to delete it ?')){
      let element = $(this)[0].parentElement.parentElement; // obtengo el elemento 0 que es asicamente es el boton y despues busco el elmento padre 2 veces para poder subir de nivel hasta <tr></tr> 
      let id = $(element).attr('taskId'); // buscamos el elemento cuyo atributo sea task-id y lo almaceno en una variable.
      $.post('task-delete.php',{id}, function(response){
      GetTasks();

    })
    }


  })

  //Editar  TAREAS  REF task-single.php y task-edit.php -----------------------------------------------------------------------------

  $(document).on('click', '.task-item', function(){ // del documento escucho el evento click de .task-item

    let element = $(this)[0].parentElement.parentElement; // obtengo el elemento 0 que es asicamente es el boton y despues busco el elmento padre 2 veces para poder subir de nivel hasta <tr></tr> 
    let id = $(element).attr('taskId'); // buscamos el elemento cuyo atributo sea task-id y lo almaceno en una variable.
    $.post('task-single.php', {id}, function(response){
      const task = JSON.parse(response) // convierto la respuesta en formato JSON
      $('#name').val(task.name); // llenamos el form con en valor de name
      $('#description').val(task.description);
      $('#taskId').val(task.id);
      editar = true; // variable para editar el form de tareas
    })

   
    

  });

});


