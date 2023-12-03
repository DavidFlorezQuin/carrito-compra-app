    document.addEventListener('DOMContentLoaded', function () {

        function enviarDatosAlBackend() {
            var codigo = document.getElementById('codigo').value;
            var nombre = document.getElementById('nombre').value;
            var precio = document.getElementById('precio').value;
            var cantidad = document.getElementById('cantidad').value;
            var estado = document.getElementById('estado').value;
            

            var datos = {
                codigo: codigo,
                nombre: nombre,
                precio: precio,
            
                cantidad: cantidad,
                estado: estado
            };
            console.log(datos);

            fetch('http://localhost:9000/v1/api/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert("DATOS ALMACENADOS");
                    // Después de enviar datos, consulta y actualiza la tabla
                    consultarDatosTabla();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        function limpiarTabla() {
            var tabla = document.getElementById('tablaProductos');
            var tbody = tabla.getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
        }

        function agregarFilaATabla(codigo, nombre, precio, cantidad, estado) {
            var tabla = document.getElementById('tablaProductos');
            var tbody = tabla.getElementsByTagName('tbody')[0];

            var row = tbody.insertRow();
            row.setAttribute('data-codigo', codigo);
            var cellCodigo = row.insertCell(0);
            var cellNombre = row.insertCell(1);
            var cellPrecio = row.insertCell(2);
            var cellCantidad = row.insertCell(3);
            var cellEstado = row.insertCell(4)
            var cellAcciones = row.insertCell(5);

            console.log(cellEstado);

            cellCodigo.innerHTML = codigo;
            cellNombre.innerHTML = nombre;
            cellPrecio.innerHTML = precio;
            cellCantidad.innerHTML = cantidad;
            cellEstado .innerHTML = estado;
            
            var btnEliminar = document.createElement("button");
            btnEliminar.innerHTML = "Eliminar";
            btnEliminar.className = "btnEliminar";
            btnEliminar.addEventListener("click", function () {
                // Lógica para eliminar el producto
                alert('Eliminar: ' + codigo);
            });

            var btnEditar = document.createElement("button");
            btnEditar.innerHTML = "Editar";
            btnEditar.className = "btnEditar";
            btnEditar.addEventListener("click", function () {
                // Llama a la función para cargar los datos en el formulario
                cargarDatosEnFormulario(codigo);
            });

            cellAcciones.appendChild(btnEliminar);
            cellAcciones.appendChild(btnEditar);
        }

        function consultarDatosTabla() {
            // Hacer una solicitud GET a tu endpoint de la API para obtener los datos
            fetch('http://localhost:9000/v1/api/producto')
                .then(response => response.json())
                .then(data => {
                    // Limpiar la tabla antes de agregar nuevos datos
                    limpiarTabla();
                    // Agregar cada fila a la tabla con los datos obtenidos
                    data.forEach(producto => {
                        agregarFilaATabla(producto.codigo, producto.nombre, producto.precio, producto.cantidad,producto.estado);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        // Función de ejemplo para cargar datos en el formulario para editar
        function cargarDatosEnFormulario(codigo) {
            // Lógica para cargar los datos en el formulario según el código
            // Puedes implementar esta función según tu estructura y necesidades
            alert('Cargar datos para editar: ' + codigo);
        }

        var form = document.querySelector('form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            enviarDatosAlBackend();
        });

        // Llamada inicial para cargar datos al cargar la página
        consultarDatosTabla();
    });

