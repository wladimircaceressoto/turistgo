// Capturar elementos del DOM
const formDisponibilidad = document.getElementById('form-disponibilidad');
const mensajeDisponibilidad = document.getElementById('mensaje-disponibilidad');
const formReservaCompleta = document.getElementById('form-reserva-completa');
const seccionReserva = document.getElementById('reserva');

// Agregar event listener al formulario rápido
formDisponibilidad.addEventListener('submit', function(event) {
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

    // Simular disponibilidad: si hora es exactamente 12:00, no disponible
    const disponible = hora !== '12:00';

    if (!disponible) {
        mensajeDisponibilidad.textContent = 'Ese horario ya está muy solicitado. Podemos ofrecerte una alternativa cercana.';
    } else {
        // Limpiar mensaje
        mensajeDisponibilidad.textContent = '';

        // Copiar datos al formulario completo
        formReservaCompleta.servicio.value = servicio;
        formReservaCompleta.fecha.value = fecha;
        formReservaCompleta.hora.value = hora;
        formReservaCompleta.pasajeros.value = pasajeros;

        // Hacer scroll suave hacia la sección reserva
        seccionReserva.scrollIntoView({ behavior: 'smooth' });
    }
});
