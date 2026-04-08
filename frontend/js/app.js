// Variable global para almacenar el ID de la reserva que se está editando
let reservaEditandoId = null;

// Variable global para almacenar el ID del servicio que se está editando
let servicioEditandoId = null;

// Función para cargar las reservas desde el backend
async function cargarReservas() {
    try {
        const response = await fetch('http://127.0.0.1:8000/reservas');

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const reservas = await response.json();

        // Seleccionar el tbody de la tabla
        const tbody = document.querySelector('#tabla-reservas tbody');

        // Limpiar el contenido actual
        tbody.innerHTML = '';

        // Recorrer la lista de reservas y crear filas
        reservas.forEach(reserva => {
            const fila = document.createElement('tr');

            // Columna ID
            const tdId = document.createElement('td');
            tdId.textContent = reserva.id;
            fila.appendChild(tdId);

            // Columna Cliente
            const tdNombre = document.createElement('td');
            tdNombre.textContent = `${reserva.nombre_cliente} ${reserva.apellido_cliente}`;
            fila.appendChild(tdNombre);

            // Columna Servicio
            const tdServicio = document.createElement('td');
            const servicioTexto = reserva.servicio_id === 1
                ? 'Aeropuerto → Hotel'
                : reserva.servicio_id === 2
                    ? 'Hotel → Aeropuerto'
                    : reserva.servicio_id === 3
                        ? 'City Tour Santiago'
                        : 'Servicio no definido';
            tdServicio.textContent = servicioTexto;
            fila.appendChild(tdServicio);

            // Columna Fecha
            const tdFecha = document.createElement('td');
            tdFecha.textContent = reserva.fecha_servicio;
            fila.appendChild(tdFecha);

            // Columna Hora
            const tdHora = document.createElement('td');
            tdHora.textContent = reserva.hora_servicio;
            fila.appendChild(tdHora);

            // Columna Origen
            const tdOrigen = document.createElement('td');
            tdOrigen.textContent = reserva.origen;
            fila.appendChild(tdOrigen);

            // Columna Destino
            const tdDestino = document.createElement('td');
            tdDestino.textContent = reserva.destino;
            fila.appendChild(tdDestino);

            // Columna Acciones
            const tdAcciones = document.createElement('td');

            // Botón Editar
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => {
                document.getElementById('nombre_cliente').value = reserva.nombre_cliente;
                document.getElementById('apellido_cliente').value = reserva.apellido_cliente;
                document.getElementById('telefono_cliente').value = reserva.telefono_cliente;
                document.getElementById('fecha_servicio').value = reserva.fecha_servicio;
                document.getElementById('hora_servicio').value = reserva.hora_servicio;
                document.getElementById('aerolinea').value = reserva.aerolinea;
                document.getElementById('numero_vuelo').value = reserva.numero_vuelo;
                document.getElementById('cantidad_pasajeros').value = reserva.cantidad_pasajeros;
                document.getElementById('origen').value = reserva.origen;
                document.getElementById('destino').value = reserva.destino;
                document.getElementById('servicio_id').value = reserva.servicio_id;
                document.getElementById('observaciones').value = reserva.observaciones ?? '';

                // Guardar el ID de la reserva que se está editando
                reservaEditandoId = reserva.id;

                // Llevar la vista al formulario
                document.getElementById('reserva-form').scrollIntoView({ behavior: 'smooth' });
            });
            tdAcciones.appendChild(btnEditar);

            // Botón Eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', async () => {
                if (confirm('¿Seguro que deseas eliminar esta reserva?')) {
                    try {
                        const response = await fetch(`http://127.0.0.1:8000/reservas/${reserva.id}`, {
                            method: 'DELETE'
                        });

                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }

                        await cargarReservas();
                        alert('Reserva eliminada correctamente');
                    } catch (error) {
                        console.error('Error al eliminar la reserva:', error);
                        alert(`Error al eliminar la reserva: ${error.message}`);
                    }
                }
            });
            tdAcciones.appendChild(btnEliminar);

            fila.appendChild(tdAcciones);

            // Insertar la fila en el tbody
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar las reservas:', error);
    }
}

// Función para enviar una nueva reserva o actualizar una existente
async function enviarReserva(event) {
    event.preventDefault();

    const datosReserva = {
        nombre_cliente: document.getElementById('nombre_cliente').value,
        apellido_cliente: document.getElementById('apellido_cliente').value,
        telefono_cliente: document.getElementById('telefono_cliente').value,
        fecha_servicio: document.getElementById('fecha_servicio').value,
        hora_servicio: document.getElementById('hora_servicio').value,
        aerolinea: document.getElementById('aerolinea').value,
        numero_vuelo: document.getElementById('numero_vuelo').value,
        cantidad_pasajeros: parseInt(document.getElementById('cantidad_pasajeros').value),
        origen: document.getElementById('origen').value,
        destino: document.getElementById('destino').value,
        servicio_id: parseInt(document.getElementById('servicio_id').value),
        observaciones: document.getElementById('observaciones').value
    };

    try {
        let response;
        let mensajeExito;

        if (reservaEditandoId === null) {
            // Crear nueva reserva
            response = await fetch('http://127.0.0.1:8000/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosReserva)
            });
            mensajeExito = 'Reserva creada correctamente';
        } else {
            // Actualizar reserva existente
            response = await fetch(`http://127.0.0.1:8000/reservas/${reservaEditandoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosReserva)
            });
            mensajeExito = 'Reserva actualizada correctamente';
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        document.getElementById('reserva-form').reset();
        reservaEditandoId = null;

        await cargarReservas();
        alert(mensajeExito);
    } catch (error) {
        const accion = reservaEditandoId === null ? 'crear' : 'actualizar';
        console.error(`Error al ${accion} la reserva:`, error);
        alert(`Error al ${accion} la reserva: ${error.message}`);
    }
}

// Función para cargar los servicios desde el backend
async function cargarServicios() {
    try {
        const response = await fetch('http://127.0.0.1:8000/servicios');

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const servicios = await response.json();

        // Seleccionar el tbody de la tabla
        const tbody = document.querySelector('#tabla-servicios tbody');

        // Limpiar el contenido actual
        tbody.innerHTML = '';

        // Recorrer la lista de servicios y crear filas
        servicios.forEach(servicio => {
            const fila = document.createElement('tr');

            // Columna ID
            const tdId = document.createElement('td');
            tdId.textContent = servicio.id;
            fila.appendChild(tdId);

            // Columna Nombre
            const tdNombre = document.createElement('td');
            tdNombre.textContent = servicio.nombre;
            fila.appendChild(tdNombre);

            // Columna Descripción
            const tdDescripcion = document.createElement('td');
            tdDescripcion.textContent = servicio.descripcion;
            fila.appendChild(tdDescripcion);

            // Columna Precio
            const tdPrecio = document.createElement('td');
            tdPrecio.textContent = servicio.precio_base_referencial;
            fila.appendChild(tdPrecio);

            // Columna Estado
            const tdEstado = document.createElement('td');
            tdEstado.textContent = servicio.estado;
            fila.appendChild(tdEstado);

            // Columna Acciones
            const tdAcciones = document.createElement('td');

            // Botón Editar
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => {
                document.getElementById('nombre').value = servicio.nombre;
                document.getElementById('descripcion').value = servicio.descripcion;
                document.getElementById('precio_base_referencial').value = servicio.precio_base_referencial;
                document.getElementById('estado').value = servicio.estado;

                // Guardar el ID del servicio que se está editando
                servicioEditandoId = servicio.id;

                // Llevar la vista al formulario
                document.getElementById('servicio-form').scrollIntoView({ behavior: 'smooth' });
            });
            tdAcciones.appendChild(btnEditar);

            // Botón Eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', async () => {
                if (confirm('¿Seguro que deseas eliminar este servicio?')) {
                    try {
                        const response = await fetch(`http://127.0.0.1:8000/servicios/${servicio.id}`, {
                            method: 'DELETE'
                        });

                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }

                        await cargarServicios();
                        alert('Servicio eliminado correctamente');
                    } catch (error) {
                        console.error('Error al eliminar el servicio:', error);
                        alert(`Error al eliminar el servicio: ${error.message}`);
                    }
                }
            });
            tdAcciones.appendChild(btnEliminar);

            fila.appendChild(tdAcciones);

            // Insertar la fila en el tbody
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
    }
}

// Función para enviar un nuevo servicio o actualizar uno existente
async function enviarServicio(event) {
    event.preventDefault();

    const datosServicio = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio_base_referencial: parseInt(document.getElementById('precio_base_referencial').value),
        estado: document.getElementById('estado').value
    };

    try {
        let response;
        let mensajeExito;

        if (servicioEditandoId === null) {
            // Crear nuevo servicio
            response = await fetch('http://127.0.0.1:8000/servicios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosServicio)
            });
            mensajeExito = 'Servicio creado correctamente';
        } else {
            // Actualizar servicio existente
            response = await fetch(`http://127.0.0.1:8000/servicios/${servicioEditandoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosServicio)
            });
            mensajeExito = 'Servicio actualizado correctamente';
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        document.getElementById('servicio-form').reset();
        servicioEditandoId = null;

        await cargarServicios();
        alert(mensajeExito);
    } catch (error) {
        const accion = servicioEditandoId === null ? 'crear' : 'actualizar';
        console.error(`Error al ${accion} el servicio:`, error);
        alert(`Error al ${accion} el servicio: ${error.message}`);
    }
}

// Capturar el evento de envío del formulario
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('reserva-form');
    formulario.addEventListener('submit', enviarReserva);

    const formularioServicio = document.getElementById('servicio-form');
    formularioServicio.addEventListener('submit', enviarServicio);

    // Cargar las reservas al iniciar la página
    cargarReservas();

    // Cargar los servicios al iniciar la página
    cargarServicios();
});