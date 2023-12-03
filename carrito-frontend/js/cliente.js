
//ESTE MÉTODO ES PARA GUARDAR

function save() {
    // Construir el objeto data
    var data = {
      'nombre': $('#nombre').val(),
      'telefono': $('#telefono').val(),
      'direccion': $('#direccion').val(),
      'correo': $('#correo').val(),
      'estado': parseInt($('#estado').val()),
    };
  
    var jsonData = JSON.stringify(data);
    $.ajax({
      url: 'http://localhost:9000/v1/api/cliente',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: jsonData,
      success: function (data) {
        alert("Registro agregado con éxito");
        loadData();
        clearData();
      },
      error: function (error) {
        console.error('Error en la solicitud:', error);
      }
    });
  }
  
//ESTE MÉTODO ES PARA ACTUALIZAR

  function update() {
    // Construir el objeto data
    var data = {
      'nombre': $('#nombre').val(),
      'telefono': $('#telefono').val(),
      'direccion': $('#direccion').val(),
      'correo': $('#correo').val(),
      'estado': parseInt($('#estado').val()),
    };
    var id = $("#id").val();
    var jsonData = JSON.stringify(data);
    $.ajax({
      url: 'http://localhost:9000/v1/api/cliente/' +id,
      data: jsonData,
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    }).done(function (result) {
      alert("Registro actualizado con éxito");
      loadData();
      clearData();
  
      //actualzar boton
      var btnAgregar = $('button[name="btnAgregar"]');
      btnAgregar.text('Agregar');
      btnAgregar.attr('onclick', 'save()');
    })
  }

  //ESTE MÉTODO MUESTRA LOS DATOS EN LA TABLA
  
  function loadData() {
    $.ajax({
      url: 'http://localhost:9000/v1/api/cliente',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        var html = '';
  
        data.forEach(function (item) {
          // Construir el HTML para cada objeto
          html += `<tr>
                  <td>`+ item.nombre + `</td>
                  <td>`+ item.correo + `</td>
                  <td>`+ item.telefono + `</td>
                  <td>`+ item.direccion + `</td>
                  <td>`+ (item.estado == true ? 'Activio' : 'Inactivo') + `</td>
                  <th><img src="../asset/icon/pencil-square.svg" alt="" onclick="findById(`+ item.id + `)"></th>
                  <th><img src="../asset/icon/trash3.svg" alt="" onclick="deleteById(`+ item.id + `)"></th>
              </tr>`;
        });
  
        $('#resultData').html(html);
      },
      error: function (error) {
        // Función que se ejecuta si hay un error en la solicitud
        console.error('Error en la solicitud:', error);
      }
    });
  }

  //ESTE MÉTODO LLENA LOS CAMPOS DE LOS REGISTROS SELECIONADOS
  
  function findById(id) {
    $.ajax({
      url: 'http://localhost:9000/v1/api/cliente/' + id,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        $('#id').val(data.id);
        $('#nombre').val(data.nombre);
        $('#correo').val(data.correo);
        $('#telefono').val(data.telefono);
        $('#direccion').val(data.direccion);
        $('#estado').val(data.estado == true ? 1 : 0);
  
        //Cambiar boton.
        var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text('Actualizar');
        btnAgregar.attr('onclick', 'update()');
      },
      error: function (error) {
        // Función que se ejecuta si hay un error en la solicitud
        console.error('Error en la solicitud:', error);
      }
    });
  }

  //ESTE MÉTODO ES PARA ELIMINAR
  
  function deleteById(id) {
    $.ajax({
      url: 'http://localhost:9000/v1/api/cliente/' + id,
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    }).done(function (result) {
      alert("Registro eliminado con éxito");
      loadData();
      clearData();
    })
  }

  //ESTE MÉTODO ES PARA LIMPIAR 
  
  function clearData() {
    $('#id').val('');
    $('#nombre').val('');
    $('#correo').val('');
    $('#direccion').val('');
    $('#telefono  ').val('');
    $('#estado').val('');
  }
  
  