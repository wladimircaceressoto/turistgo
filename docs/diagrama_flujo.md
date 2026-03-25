# Flujo general del sistema - TuristGo

## Objetivo
Describir el flujo principal del sistema para la primera versión (MVP), desde la visualización del servicio por parte del cliente hasta la gestión interna de la reserva.

---

## Flujo principal: reserva de servicio

### 1. Visualización del servicio
1. El cliente ingresa al sitio web de TuristGo.
2. El cliente visualiza el servicio disponible.
3. El cliente revisa la información general del servicio.
4. El cliente selecciona la opción de reservar.

### 2. Registro de la reserva
5. El sistema muestra el formulario de reserva.
6. El cliente completa los datos solicitados:
   - nombre
   - apellido
   - documento
   - fecha del servicio
   - hora del servicio
   - aerolínea
   - número de vuelo
   - cantidad de pasajeros
   - observaciones (opcional)
7. El cliente envía la solicitud de reserva.
8. El sistema valida que la información mínima requerida esté completa.
9. El sistema registra la reserva.
10. El sistema asigna el estado inicial: `pendiente`.
11. El sistema guarda el precio vigente del servicio al momento de la reserva.

### 3. Gestión interna de la reserva
12. El administrador ingresa al panel interno.
13. El administrador visualiza las reservas pendientes.
14. El administrador revisa los datos de la reserva.
15. El administrador decide si la reserva puede ser atendida.
16. Si la reserva puede ser atendida:
    - cambia el estado a `confirmada`
    - asigna un conductor/guía
    - cambia el estado a `asignada`
17. Si la reserva no puede ser atendida:
    - la reserva queda pendiente de resolución
    - o cambia a `cancelada` según decisión operativa

### 4. Ejecución del servicio
18. El conductor/guía realiza el servicio.
19. El administrador actualiza el estado de la reserva a `completada`.

---

## Flujo resumido por estados

- La reserva se crea en estado `pendiente`
- Luego puede pasar a `confirmada`
- Después puede pasar a `asignada`
- Finalmente puede pasar a `completada`
- En caso de problemas, puede pasar a `cancelada`

---

## Decisiones asumidas para este flujo

1. La reserva no se confirma automáticamente.
2. La revisión de disponibilidad es manual.
3. La asignación de conductor es manual.
4. El precio se registra al crear la reserva.
5. No existe pago online en el MVP.
6. No existe seguimiento automático de vuelos en el MVP.

---

## Flujos pendientes de definición

Los siguientes flujos existen a nivel de negocio, pero aún no están completamente definidos por el cliente:

- modificación de reserva por retraso de vuelo
- cancelación de reserva
- conflicto de horario entre reservas
- falta de conductor disponible
- confirmación al cliente por correo o mensaje

## Flujo simplificado

Cliente entra al sitio  
→ visualiza servicio  
→ completa formulario  
→ sistema registra reserva  
→ estado pendiente  
→ admin revisa  
→ confirma o cancela  
→ asigna conductor  
→ servicio realizado  
→ reserva completada

## Actores involucrados

### Cliente
- visualiza servicio
- completa reserva

### Sistema
- valida datos
- registra reserva
- asigna estado inicial
- guarda precio aplicado

### Administrador
- revisa reservas
- confirma o cancela
- asigna conductor
- marca servicio como completado