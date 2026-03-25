# Arquitectura preliminar - TuristGo

## Objetivo
Definir la estructura general del sistema TuristGo para su primera versión (MVP), identificando los componentes principales y su interacción.

---

## 1. Enfoque general

El sistema se plantea como una aplicación web compuesta por:

- un frontend (interfaz de usuario)
- un backend (lógica del sistema)
- una base de datos (almacenamiento de información)

La arquitectura será simple en su primera etapa, pero preparada para crecer.

---

## 2. Componentes principales

### 2.1 Frontend (cliente web)

Responsabilidades:
- mostrar servicios disponibles
- permitir al cliente ingresar una reserva
- mostrar información básica del servicio

Características:
- interfaz simple y clara
- sin autenticación de usuario en el MVP
- comunicación con backend mediante API

---

### 2.2 Panel administrativo

Responsabilidades:
- visualizar reservas
- revisar detalles de reservas
- cambiar estado de reservas
- asignar conductores
- gestionar precios

Características:
- acceso restringido
- interfaz separada del sitio público
- comunicación con backend mediante API

---

### 2.3 Backend (API)

Responsabilidades:
- recibir solicitudes del frontend
- validar datos de entrada
- gestionar lógica de negocio
- manejar estados de las reservas
- asignar conductores
- exponer endpoints para frontend y panel admin

Características:
- centraliza la lógica del sistema
- maneja reglas de negocio
- controla acceso a datos

---

### 2.4 Base de datos

Responsabilidades:
- almacenar información del sistema
- guardar reservas
- guardar servicios
- guardar conductores
- guardar usuarios administrativos

Características:
- persistencia de datos
- estructura basada en entidades del modelo de datos preliminar

---

## 3. Flujo de interacción entre componentes

### Flujo cliente

Cliente (frontend)
→ envía solicitud de reserva
→ Backend recibe y valida
→ Backend guarda en base de datos
→ Backend responde al frontend

---

### Flujo administrativo

Administrador (panel)
→ consulta reservas
→ Backend obtiene datos desde base de datos
→ Backend responde al panel
→ Administrador realiza acciones (confirmar, asignar, etc.)
→ Backend actualiza base de datos

---

## 4. Tipo de arquitectura

Para el MVP se propone:

- arquitectura tipo cliente-servidor
- backend centralizado
- frontend desacoplado mediante API

Esto permite:
- mantener el sistema organizado
- escalar a futuro
- integrar nuevas funcionalidades sin rehacer el sistema

---

## 5. Decisiones de diseño (MVP)

- no se separa en microservicios
- un solo backend central
- lógica de negocio en backend
- frontend solo consume API
- no hay tiempo real en esta etapa
- no hay integraciones externas complejas

---

## 6. Escalabilidad futura (sin entrar en detalle)

La arquitectura permite evolucionar hacia:

- integración con APIs externas (ej: vuelos)
- incorporación de pagos online
- sistema de usuarios para clientes
- app para conductores
- expansión geográfica
- modelo multi-empresa

---

## 7. Consideraciones

- se prioriza simplicidad sobre complejidad
- se prioriza velocidad de desarrollo para validar el negocio
- se evita sobre-ingeniería en el MVP
- se deja base preparada para crecer