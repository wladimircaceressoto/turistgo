# Reglas de negocio - TuristGo

## Objetivo
Definir las reglas que rigen el funcionamiento del sistema en su primera versión (MVP), diferenciando entre reglas confirmadas, asumidas y pendientes de validación.

---

## 1. Reglas confirmadas

1. El servicio principal inicial es traslado aeropuerto → alojamiento.
2. La cantidad máxima de pasajeros por reserva es de 3.
3. El negocio opera inicialmente con un equipo reducido de guías/conductores.
4. Los precios del servicio están influenciados por variables externas (combustible, tipo de cambio, costos operacionales).
5. El número de vuelo es un dato relevante para la prestación del servicio.
6. El servicio puede requerir adaptación ante cambios o retrasos de vuelo.

---

## 2. Reglas asumidas (para el MVP)

1. El precio del servicio será definido manualmente por un administrador.
2. El precio aplicado se almacenará en la reserva y no se recalculará posteriormente.
3. La reserva se crea en estado `pendiente`.
4. La confirmación de la reserva será manual.
5. La asignación de conductor será realizada manualmente por un administrador.
6. Una reserva no puede superar los 3 pasajeros en el MVP.
7. No se permitirá sobreasignación automática de servicios.
8. La disponibilidad de conductores será gestionada manualmente.
9. Los cambios de reserva serán gestionados manualmente por el equipo.
10. El sistema no incluye pago online en esta etapa.
11. El sistema no incluye seguimiento automático de vuelos en esta etapa.

---

## 3. Reglas pendientes de validación

1. Tiempo límite para modificar una reserva.
2. Tiempo límite para cancelar una reserva.
3. Procedimiento en caso de retraso de vuelo que genere conflicto con otra reserva.
4. Procedimiento cuando no hay conductores disponibles.
5. Tipo de confirmación al cliente (manual o automática).
6. Medio de comunicación con el cliente (correo, WhatsApp, otro).
7. Política de priorización de reservas.
8. Manejo de errores en datos de vuelo ingresados por el cliente.

---

## 4. Notas importantes

- Este documento es una base inicial y puede evolucionar a medida que se obtenga más información del negocio.
- Las reglas asumidas permiten avanzar en el diseño del sistema sin bloquear el desarrollo.
- Ninguna regla pendiente debe ser implementada de forma definitiva sin validación del cliente.