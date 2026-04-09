// Capturar elementos del DOM
const formDisponibilidad = document.getElementById('form-disponibilidad');
const mensajeDisponibilidad = document.getElementById('mensaje-disponibilidad');
const formReservaCompleta = document.getElementById('form-reserva-completa');
const seccionReserva = document.getElementById('reserva');

// Función para cargar servicios dinámicamente
async function cargarServicios() {
    try {
        const response = await fetch('http://127.0.0.1:8000/servicios');
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const servicios = await response.json();
        const contenedor = document.getElementById('contenedor-servicios');
        contenedor.innerHTML = '';
        const serviciosActivos = servicios.filter(servicio => servicio.estado === 'activo');
        serviciosActivos.forEach(servicio => {
            const card = document.createElement('div');
            card.className = 'card';
            const img = document.createElement('img');
            img.className = 'card-img';
            img.src = getImageSrc(servicio.id);
            img.alt = servicio.nombre;
            const h3 = document.createElement('h3');
            h3.className = 'card-title';
            h3.textContent = servicio.nombre;
            const pDesc = document.createElement('p');
            pDesc.className = 'card-desc';
            pDesc.textContent = servicio.descripcion;
            const pPrecio = document.createElement('p');
            pPrecio.className = 'card-precio';
            pPrecio.textContent = 'Desde $' + servicio.precio_base_referencial.toLocaleString('es-CL');
            const button = document.createElement('button');
            button.className = 'btn-card';
            button.textContent = 'Reservar';
            button.addEventListener('click', () => {
                document.getElementById('reserva').scrollIntoView({ behavior: 'smooth' });
            });
            card.appendChild(img);
            card.appendChild(h3);
            card.appendChild(pDesc);
            card.appendChild(pPrecio);
            card.appendChild(button);
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error('Error cargando servicios:', error);
    }
}

// Función auxiliar para obtener la imagen basada en id
function getImageSrc(id) {
    switch (id) {
        case 1:
            return 'img/aeropuerto-hotel.jpg';
        case 2:
            return 'img/servicio-hotel.jpg';
        case 3:
            return 'img/city-tour.jpg';
        default:
            return 'img/aeropuerto-hotel.jpg';
    }
}

// Función auxiliar para mapear servicio string a id
function mapServicioToId(servicio) {
    switch (servicio) {
        case 'aeropuerto-hotel':
            return 1;
        case 'servicio-hotel':
            return 2;
        case 'city-tour':
            return 3;
        default:
            return null;
    }
}

// Event listener para DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al formulario rápido
    formDisponibilidad.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Leer valores del formulario
        const servicio = formDisponibilidad.servicio.value;
        const fecha = formDisponibilidad.fecha.value;
        const hora = formDisponibilidad.hora.value;
        const pasajeros = formDisponibilidad.pasajeros.value;

        // Validar que todos los campos estén completos
        if (!servicio || !fecha || !hora || !pasajeros) {
            mensajeDisponibilidad.textContent = 'Por favor completa todos los campos para consultar disponibilidad.';
            return;
        }

        const servicioId = mapServicioToId(servicio);
        if (servicioId === null) {
            mensajeDisponibilidad.textContent = 'Servicio no válido. Selecciona un servicio válido.';
            return;
        }

        // Consultar disponibilidad real al backend
        try {
            const response = await fetch('http://127.0.0.1:8000/reservas/disponibilidad', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    servicio_id: servicioId,
                    fecha_servicio: fecha,
                    hora_servicio: hora
                })
            });
            if (!response.ok) {
                throw new Error('Error consultando disponibilidad');
            }
            const data = await response.json();
            if (!data.disponible) {
                mensajeDisponibilidad.textContent = data.mensaje || 'No disponible en ese horario.';
            } else {
                // Limpiar mensaje
                mensajeDisponibilidad.textContent = '';

                // Copiar datos al formulario completo
                formReservaCompleta.servicio_id.value = servicio;
                formReservaCompleta.fecha_servicio.value = fecha;
                formReservaCompleta.hora_servicio.value = hora;
                formReservaCompleta.cantidad_pasajeros.value = pasajeros;

                // Hacer scroll suave hacia la sección reserva
                seccionReserva.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Error consultando disponibilidad:', error);
            mensajeDisponibilidad.textContent = 'Error consultando disponibilidad. Inténtalo de nuevo.';
        }
    });

    // Agregar event listener al formulario completo
    formReservaCompleta.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Leer valores del formulario completo
        const nombreCliente = formReservaCompleta.nombre_cliente.value;
        const apellidoCliente = formReservaCompleta.apellido_cliente.value;
        const telefonoCliente = formReservaCompleta.telefono_cliente.value;
        const fechaServicio = formReservaCompleta.fecha_servicio.value;
        const horaServicio = formReservaCompleta.hora_servicio.value;
        const aerolinea = formReservaCompleta.aerolinea.value;
        const numeroVuelo = formReservaCompleta.numero_vuelo.value;
        const cantidadPasajeros = parseInt(formReservaCompleta.cantidad_pasajeros.value, 10);
        const origen = formReservaCompleta.origen.value;
        const destino = formReservaCompleta.destino.value;
        const servicioId = mapServicioToId(formReservaCompleta.servicio_id.value);
        const observaciones = formReservaCompleta.observaciones.value;

        if (servicioId === null) {
            alert('Selecciona un servicio válido antes de enviar la reserva.');
            return;
        }

        // Construir objeto de reserva
        const reserva = {
            nombre_cliente: nombreCliente,
            apellido_cliente: apellidoCliente,
            telefono_cliente: telefonoCliente,
            fecha_servicio: fechaServicio,
            hora_servicio: horaServicio,
            aerolinea: aerolinea,
            numero_vuelo: numeroVuelo,
            cantidad_pasajeros: cantidadPasajeros,
            origen: origen,
            destino: destino,
            servicio_id: servicioId,
            observaciones: observaciones
        };

        // Enviar POST al backend
        try {
            const response = await fetch('http://127.0.0.1:8000/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reserva)
            });
            if (!response.ok) {
                throw new Error('Error creando reserva');
            }
            alert('Reserva creada correctamente');
            formReservaCompleta.reset();
        } catch (error) {
            console.error('Error creando reserva:', error);
            alert('Error creando reserva: ' + error.message);
        }
    });

    // Cargar servicios dinámicamente
    cargarServicios();
});
