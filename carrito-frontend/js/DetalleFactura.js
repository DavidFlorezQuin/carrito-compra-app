//ESTE MÉTODO ES PARA GUARDAR

function save() {
  // Construir el objeto data
  var fechaActual = new Date().toISOString().split('T')[0];
    
  var data = {
    'fecha': fechaActual,
    'cantidad': parseInt($('#cantidad').val()),
    'valorPagar':200,
    'facturaId': {
      'id' : parseInt($('#factura').val())
    },
    'productoId': {
      'id' : parseInt($('#producto').val())
    },
    'estado': parseInt($('#estado').val()),
  };

  var jsonData = JSON.stringify(data);
  $.ajax({
    url: 'http://localhost:9000/v1/api/DetalleFactura',
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
    url: 'http://localhost:9000/v1/api/DetalleFactura',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var html = '';

      data.forEach(function (item) {
        // Construir el HTML para cada objeto
        html += `<tr>
                <td>`+ item.facturaId.codigo + `</td>
                <td>`+ item.productoId.nombre + `</td>
                <td>`+ item.cantidad + `</td>
                <td>`+ item.valorPagar + `</td>
                <td>`+ (item.estado == true ? 'Activo' : 'Inactivo') + `</td>
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
//ESTE MÉTODO MUESTRA LOS DATOS DE CLIENTES
function selectProducto() {
  $.ajax({
    url: 'http://localhost:9000/v1/api/producto',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var selectElement = $('#producto');
      selectElement.empty(); // Limpiar opciones anteriores, si las hay

      data.forEach(function (item) {
        // Agregar una opción por cada cliente
        var option = $('<option>', {
          value: item.id,
          text: item.nombre
        });
        selectElement.append(option);
      });
    },
    error: function (error) {
      console.error('Error en la solicitud:', error);
    }
  });
}
function selectFactura() {
  $.ajax({
    url: 'http://localhost:9000/v1/api/factura',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var selectElement = $('#factura');
      selectElement.empty(); // Limpiar opciones anteriores, si las hay

      data.forEach(function (item) {
        // Agregar una opción por cada cliente
        var option = $('<option>', {
          value: item.id,
          text: item.codigo
        });
        selectElement.append(option);
      });
    },
    error: function (error) {
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

