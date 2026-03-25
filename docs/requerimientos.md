# Requerimientos iniciales - TuristGo

## Requerimientos funcionales confirmados

1. El sistema debe permitir ofrecer servicios de traslado turístico.
2. En una primera etapa, el servicio principal será aeropuerto → alojamiento.
3. El cliente debe poder registrar una reserva.
4. La reserva debe permitir ingresar datos del pasajero.
5. La reserva debe permitir ingresar datos del vuelo.
6. La reserva debe considerar fecha, hora y cantidad de pasajeros.
7. El sistema debe contemplar un máximo inicial de 3 pasajeros por reserva.
8. Debe existir una forma interna de visualizar las reservas.
9. Debe existir una forma interna de asignar reservas a conductores/guías.
10. Los precios deben poder administrarse considerando variaciones operacionales.
11. Debe existir la posibilidad futura de agregar nuevos servicios.
12. Debe existir la posibilidad futura de ampliar cobertura geográfica.

## Requerimientos funcionales asumidos para el MVP

1. El cliente accederá mediante una página web.
2. La web tendrá una sección tipo vitrina para mostrar servicios.
3. El cliente podrá reservar mediante un formulario simple.
4. La confirmación inicial de la reserva será manual.
5. El pago online no se incluirá en la primera versión.
6. El precio del servicio será configurable manualmente desde un panel administrativo.
7. Cada reserva guardará el precio aplicado al momento de ser creada.
8. Los cambios de reserva por retrasos o modificaciones de vuelo serán gestionados manualmente por el equipo.

## Requerimientos no funcionales preliminares

1. El sistema debe ser simple de usar.
2. El sistema debe estar preparado para crecer por fases.
3. El sistema debe permitir mantener orden operativo.
4. El sistema debe considerar la futura incorporación de nuevas funcionalidades.
5. El sistema debe construirse sobre una base que permita crecer en funcionalidades y adaptarse a futuras necesidades del negocio.

## Requerimientos pendientes de validación

1. Método exacto de confirmación de reservas.
2. Reglas de cancelación y modificación.
3. Tratamiento de sobrecarga operativa cuando no haya conductores disponibles.
4. Integración futura con seguimiento automático de vuelos.
5. Método exacto de cobro en fases posteriores.
6. Nivel de automatización deseado por el cliente.