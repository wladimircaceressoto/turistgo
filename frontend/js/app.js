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

            // Columna Nombre (nombre + apellido)
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

            // Insertar la fila en el tbody
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar las reservas:', error);
    }
}

// Función para enviar una nueva reserva al backend
async function enviarReserva(event) {
    event.preventDefault();

    // Leer los valores del formulario
    const nombre_cliente = document.getElementById('nombre_cliente').value;
    const apellido_cliente = document.getElementById('apellido_cliente').value;
    const documento_cliente = document.getElementById('documento_cliente').value;
    const fecha_servicio = document.getElementById('fecha_servicio').value;
    const hora_servicio = document.getElementById('hora_servicio').value;
    const aerolinea = document.getElementById('aerolinea').value;
    const numero_vuelo = document.getElementById('numero_vuelo').value;
    const cantidad_pasajeros = document.getElementById('cantidad_pasajeros').value;
    const observaciones = document.getElementById('observaciones').value;

    // Construir el objeto con los datos
    const datosReserva = {
        nombre_cliente: nombre_cliente,
        apellido_cliente: apellido_cliente,
        documento_cliente: documento_cliente,
        fecha_servicio: fecha_servicio,
        hora_servicio: hora_servicio,
        aerolinea: aerolinea,
        numero_vuelo: numero_vuelo,
        cantidad_pasajeros: parseInt(cantidad_pasajeros),
        observaciones: observaciones
    };

    try {
        // Enviar la petición POST al backend
        const response = await fetch('http://127.0.0.1:8000/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosReserva)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Limpiar el formulario
        document.getElementById('reserva-form').reset();

        // Volver a cargar las reservas
        await cargarReservas();

        // Mostrar mensaje de éxito
        alert('Reserva creada correctamente');
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        alert(`Error al crear la reserva: ${error.message}`);
    }
}

// Capturar el evento de envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('reserva-form');
    formulario.addEventListener('submit', enviarReserva);

    // Cargar las reservas al iniciar la página
    cargarReservas();
});
