// Variable global para almacenar el ID de la reserva que se está editando
let reservaEditandoId = null;

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

            // Columna Nombre
            const tdNombre = document.createElement('td');
            tdNombre.textContent = `${reserva.nombre_cliente} ${reserva.apellido_cliente}`;
            fila.appendChild(tdNombre);

            // Columna Fecha
            const tdFecha = document.createElement('td');
            tdFecha.textContent = reserva.fecha_servicio;
            fila.appendChild(tdFecha);

            // Columna Hora
            const tdHora = document.createElement('td');
            tdHora.textContent = reserva.hora_servicio;
            fila.appendChild(tdHora);

            // Columna Acciones
            const tdAcciones = document.createElement('td');

            // Botón Editar
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => {
                document.getElementById('nombre_cliente').value = reserva.nombre_cliente;
                document.getElementById('apellido_cliente').value = reserva.apellido_cliente;
                document.getElementById('documento_cliente').value = reserva.documento_cliente;
                document.getElementById('fecha_servicio').value = reserva.fecha_servicio;
                document.getElementById('hora_servicio').value = reserva.hora_servicio;
                document.getElementById('aerolinea').value = reserva.aerolinea;
                document.getElementById('numero_vuelo').value = reserva.numero_vuelo;
                document.getElementById('cantidad_pasajeros').value = reserva.cantidad_pasajeros;
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
        documento_cliente: document.getElementById('documento_cliente').value,
        fecha_servicio: document.getElementById('fecha_servicio').value,
        hora_servicio: document.getElementById('hora_servicio').value,
        aerolinea: document.getElementById('aerolinea').value,
        numero_vuelo: document.getElementById('numero_vuelo').value,
        cantidad_pasajeros: parseInt(document.getElementById('cantidad_pasajeros').value),
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

// Capturar el evento de envío del formulario
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('reserva-form');
    formulario.addEventListener('submit', enviarReserva);

    // Cargar las reservas al iniciar la página
    cargarReservas();
});