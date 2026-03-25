# Flujo general del sistema - TuristGo

## Flujo principal del cliente

1. El cliente ingresa al sitio web.
2. El cliente visualiza el servicio disponible.
3. El cliente selecciona reservar.
4. El cliente completa el formulario con:
   - nombre
   - apellido
   - documento
   - fecha
   - hora
   - aerolínea
   - número de vuelo
   - cantidad de pasajeros
5. El sistema registra la solicitud de reserva.
6. La reserva queda en estado pendiente.
7. El equipo interno revisa la reserva.
8. El equipo interno asigna un conductor/guía.
9. La reserva cambia de estado según gestión interna.
10. El servicio se realiza.

## Flujo interno administrativo

1. El administrador ingresa al panel.
2. Visualiza reservas pendientes.
3. Revisa datos del servicio.
4. Asigna conductor/guía.
5. Cambia estado de la reserva.
6. Gestiona ajustes de precio cuando corresponda.

## Flujo futuro no incluido en MVP

1. Detección automática de estado del vuelo.
2. Ajuste automático ante retrasos.
3. Pago online.
4. Notificaciones automáticas.