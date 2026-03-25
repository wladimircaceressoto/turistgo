# Modelo de datos preliminar - TuristGo

## Objetivo
Definir las entidades principales del sistema y sus relaciones básicas para el MVP.

---

## 1. Servicio

Representa un tipo de servicio ofrecido por TuristGo.

Ejemplo: traslado aeropuerto → alojamiento

Campos:
- id
- nombre
- descripcion
- region
- precio_actual
- moneda
- capacidad_maxima
- activo
- created_at
- updated_at

---

## 2. Reserva

Representa una solicitud de servicio realizada por un cliente.

Campos:
- id
- servicio_id

### Datos del cliente
- nombre_cliente
- apellido_cliente
- documento_cliente

### Datos del servicio
- fecha_servicio
- hora_servicio
- cantidad_pasajeros

### Datos del vuelo
- aerolinea
- numero_vuelo

### Datos económicos
- precio_aplicado
- moneda_precio

### Estado y operación
- estado (pendiente, confirmada, asignada, completada, cancelada)
- conductor_id (nullable)

### Extras
- observaciones
- created_at
- updated_at

---

## 3. ConductorGuia

Representa a un conductor o guía del sistema.

Campos:
- id
- nombre
- apellido
- telefono
- email
- activo
- idioma
- certificado_mtt (boolean)
- observaciones
- created_at
- updated_at

---

## 4. UsuarioAdministrador

Representa a un usuario interno del sistema.

Campos:
- id
- nombre
- email
- password_hash
- rol
- activo
- created_at
- updated_at

---

## 5. Relación entre entidades

- Una reserva pertenece a un servicio
- Una reserva puede tener un conductor asignado
- Un conductor puede tener múltiples reservas
- Un administrador gestiona reservas y servicios

---

## 6. Decisiones de diseño (importante)

- Los datos del cliente se almacenan directamente en la reserva (MVP)
- El precio se guarda en la reserva y no se recalcula después
- El conductor es asignado manualmente
- No se considera usuario cliente en el MVP

---

## 7. Evolución futura (no MVP)

- Separar entidad Cliente
- Historial de precios
- Disponibilidad automática de conductores
- Integración con vuelos
- Pagos online

## 8. Estados de la reserva

- pendiente: creada pero no revisada
- confirmada: validada por el equipo
- asignada: con conductor definido
- completada: servicio realizado
- cancelada: anulada