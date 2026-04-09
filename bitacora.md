# Bitácora del proyecto - TuristGo

## Día 1 - 23/03/2026

### Hito
Consolidación de documentación funcional y definición de arquitectura preliminar del sistema.

### Contexto
Se recibió una validación general por parte de la clienta sobre la propuesta inicial del sistema, aunque aún existen múltiples aspectos del negocio que no han sido completamente definidos debido a dependencia de terceros.

Se decidió avanzar en la documentación utilizando supuestos controlados para no bloquear el progreso del proyecto.

---

### Trabajo realizado

Durante esta sesión se completó la fase de análisis y documentación inicial del sistema:

#### 1. Documentación funcional
- Definición de la visión del sistema (`vision.md`)
- Consolidación de requerimientos (`requerimientos.md`)
- Definición del alcance del MVP (`alcance_mvp.md`)

#### 2. Reglas de negocio
- Refinamiento de reglas de negocio
- Clasificación en:
  - confirmadas
  - asumidas
  - pendientes de validación

#### 3. Flujo del sistema
- Definición del flujo principal de reservas
- Identificación de actores (cliente, sistema, administrador)
- Definición de estados de la reserva

#### 4. Modelo de datos preliminar
- Identificación de entidades principales:
  - Servicio
  - Reserva
  - Conductor/Guía
  - Usuario administrador
- Definición de campos iniciales
- Definición de relaciones básicas

#### 5. Arquitectura preliminar
- Definición de componentes del sistema:
  - Frontend (sitio web)
  - Panel administrativo
  - Backend (API)
  - Base de datos
- Definición de flujo de interacción entre componentes
- Definición de enfoque arquitectónico (cliente-servidor)
- Identificación de decisiones de diseño para el MVP

---

### Decisiones clave

- El desarrollo se realizará por fases (MVP → mejoras → escalabilidad)
- El MVP se enfocará exclusivamente en:
  - servicio aeropuerto → alojamiento
  - Región Metropolitana
- El precio será configurable manualmente desde el panel administrativo
- El precio quedará registrado en cada reserva (no se recalcula)
- No se incluirá pago online en el MVP
- No se incluirá seguimiento automático de vuelos en el MVP
- La confirmación de reservas será manual
- La asignación de conductores será manual

---

### Riesgos identificados

- Falta de definición completa del negocio
- Dependencia de terceros para validación de procesos
- Posibles cambios futuros en reglas operativas
- Ambigüedad en manejo de excepciones (retrasos, sobrecarga, etc.)

---

### Estado actual del proyecto

El proyecto se encuentra en una etapa avanzada de definición funcional y estructural.

Se cuenta con:
- documentación base completa
- flujo del sistema definido
- modelo de datos preliminar
- arquitectura inicial

El sistema está próximo a pasar a la fase de definición técnica y posterior desarrollo.

---

### Próximos pasos

1. Revisión final de documentación
2. Definición de arquitectura técnica (stack)
3. Definición de estructura del proyecto
4. Configuración de repositorio (GitHub)
5. Inicio de desarrollo

---

### Notas

- Se decidió mantener separación entre documentación para cliente y decisiones estratégicas internas.
- Se priorizó claridad y orden por sobre velocidad de implementación.
- Se evitó iniciar desarrollo sin tener una base sólida definida.

## Día 2 - 28/03/2026

### Hito
Inicio del desarrollo backend real con FastAPI y PostgreSQL.

### Contexto
Se dejó atrás la fase puramente documental y se comenzó la implementación del backend del proyecto TuristGo, manteniendo una estructura ordenada por capas (routes, services, schemas, models, db).

Durante la jornada se avanzó desde una API básica en memoria hasta una integración real con PostgreSQL.

### Trabajo realizado

#### 1. Base del backend
- Se configuró `main.py` con FastAPI
- Se levantó el servidor correctamente
- Se creó el endpoint raíz `/`
- Se registró el router de reservas en `main.py`

#### 2. Schema inicial
- Se creó el modelo `Reserva` en `schemas.py`
- Se definieron campos de entrada y salida para reservas
- Se configuró soporte ORM en el schema
- Se agregó el campo `id` para exponer identificadores generados por base de datos

#### 3. Rutas y lógica de reservas
- Se creó el módulo `routes.py`
- Se implementaron endpoints:
  - `GET /reservas`
  - `POST /reservas`
- Se separó la lógica de negocio hacia `services.py`
- Se evitó duplicidad de lógica entre rutas y servicios

#### 4. Validaciones iniciales
- Se implementó validación para evitar reservas duplicadas
- Se capturó el error en `routes.py`
- Se devolvió respuesta HTTP 400 con mensaje claro para el cliente

#### 5. PostgreSQL
- Se conectó pgAdmin al servidor local PostgreSQL
- Se reorganizó pgAdmin para trabajar con un solo servidor y múltiples bases de datos
- Se creó la base de datos `turistgo_db`
- Se configuró `database.py` con SQLAlchemy
- Se creó el modelo ORM `ReservaModel` en `models.py`
- Se generó la tabla `reservas` en PostgreSQL desde el código
- Se reemplazó la lista en memoria por persistencia real en base de datos

#### 6. Verificación
- Se probó inserción real desde la API
- Se verificó la persistencia en PostgreSQL con consulta SQL directa
- Se comprobó que los datos se almacenan correctamente en la tabla `reservas`

### Decisiones tomadas
- Mantener una arquitectura simple pero ordenada
- Separar responsabilidades entre:
  - routes
  - services
  - schemas
  - models
  - db
- Utilizar PostgreSQL desde el inicio del proyecto
- Trabajar con un único servidor PostgreSQL y múltiples bases de datos por proyecto

### Problemas encontrados
- El agente de IA en VS Code realizó cambios inesperados en estructura al inicio
- Se corrigió la estructura del proyecto manualmente
- Hubo bloqueos repetidos del puerto 8000 al reiniciar el servidor
- Se resolvió utilizando cierre de procesos o puertos alternativos

### Aprendizajes clave
- Diferencia entre validaciones de estructura (Pydantic) y validaciones de negocio (services)
- Diferencia entre schema y modelo ORM
- Importancia de `include_router` en FastAPI
- Importancia de `orm_mode` / compatibilidad ORM en la serialización de respuestas
- Flujo completo entre API, lógica de negocio y base de datos

### Estado actual del proyecto
El backend ya permite:
- crear reservas
- listar reservas
- validar duplicados
- guardar datos en PostgreSQL

### Próximos pasos
1. Implementar `DELETE /reservas/{id}`
2. Implementar `PUT` o `PATCH` para actualización de reservas
3. Mejorar validaciones
4. Pulir respuestas HTTP
5. Evaluar separación futura de schemas de entrada y salida

## Día 3 - 28/03/2026

### Hito
Implementación completa de operaciones CRUD sobre reservas con persistencia en PostgreSQL.

### Trabajo realizado

#### 1. GET por ID
- Se implementó `GET /reservas/{id}`
- Se agregó función `obtener_reserva_por_id` en services
- Se manejó error 404 cuando la reserva no existe

#### 2. DELETE
- Se implementó `DELETE /reservas/{id}`
- Se agregó función `eliminar_reserva`
- Se validó eliminación correcta en base de datos
- Se manejó error 404 cuando la reserva no existe

#### 3. UPDATE
- Se implementó `PUT /reservas/{id}`
- Se agregó función `actualizar_reserva`
- Se actualizaron todos los campos del modelo
- Se implementó validación para evitar duplicados en actualización
- Se manejaron errores:
  - 404 (no existe)
  - 400 (duplicado)

#### 4. Pruebas completas
Se realizaron pruebas en Swagger:

- Creación de reservas ✔️
- Listado de reservas ✔️
- Búsqueda por ID ✔️
- Eliminación ✔️
- Actualización ✔️
- Validación de duplicados ✔️
- Manejo de errores HTTP ✔️

#### 5. Verificación en PostgreSQL
- Se confirmó que todas las operaciones afectan correctamente la tabla `reservas`
- Se verificó persistencia real mediante consultas SQL

### Estado actual
El sistema cuenta con un backend completamente funcional para la gestión de reservas.

### Próximos pasos
- Refactor de schemas (separar entrada/salida)
- Mejorar validaciones con Pydantic
- Implementar autenticación (futuro)
- Comenzar desarrollo del frontend

## Día 4 - 29/03/2026

### Hito
Refactor profesional del backend y cierre de la fase backend MVP.

### Trabajo realizado

#### 1. Refactor de schemas
- Se reorganizaron los schemas de reservas según su función:
  - `Reserva` como clase base con campos comunes
  - `ReservaCreate` para creación
  - `ReservaUpdate` para actualización
  - `ReservaResponse` para respuestas del sistema
- Se eliminó la necesidad de enviar `id` en operaciones de creación y actualización
- Se mantuvo `id` únicamente en respuestas

#### 2. Integración del refactor
- Se actualizaron los endpoints para usar los nuevos schemas
- Se ajustaron imports en `routes.py` y `services.py`
- Se verificó en Swagger que:
  - `POST /reservas` no solicita `id`
  - `PUT /reservas/{id}` no solicita `id`
  - las respuestas siguen incluyendo `id`

#### 3. Validaciones Pydantic
- Se agregó validación para `cantidad_pasajeros`
- Regla implementada:
  - debe ser mayor que 0
  - debe ser menor o igual a 3
- Se verificó correctamente el rechazo de datos inválidos mediante error `422`

### Estado actual
El backend del MVP quedó cerrado y operativo, listo para ser consumido por un frontend.

### Resultado del backend
El sistema ya permite:
- listar reservas
- obtener reservas por id
- crear reservas
- actualizar reservas
- eliminar reservas
- validar duplicados
- validar cantidad máxima de pasajeros
- persistir datos en PostgreSQL

### Próximos pasos
1. Actualizar README técnico si es necesario
2. Realizar commit y push de cierre del backend
3. Iniciar planificación y desarrollo del frontend

## Día 5 - 01/04/2026

### Hito
Implementación del frontend inicial y conexión completa con el backend.

### Trabajo realizado

#### 1. Estructura del frontend
- Se creó la estructura base del frontend:
  - index.html
  - css/styles.css
  - js/app.js
- Se definió un layout tipo panel administrativo:
  - formulario de creación de reservas
  - tabla de visualización

#### 2. Diseño visual (CSS)
- Se aplicaron estilos básicos utilizando paleta basada en el logo:
  - azul principal
  - naranjo de acento
  - fondo claro
- Se diseñó un panel limpio y centrado
- Se estilizaron inputs, botones y tabla
- Se implementaron estados hover y focus

#### 3. Consumo de API (GET)
- Se implementó función `cargarReservas()`
- Se utilizó `fetch()` para consumir endpoint `/reservas`
- Se renderizó dinámicamente la tabla desde el DOM
- Se manejaron errores con `try/catch`

#### 4. Manejo de CORS
- Se detectó error CORS mediante consola del navegador
- Se implementó middleware CORSMiddleware en FastAPI
- Se permitió acceso desde frontend (puerto 5500)
- Se validó correcta comunicación frontend-backend

#### 5. Envío de datos (POST)
- Se implementó función `enviarReserva()`
- Se capturó el evento submit del formulario
- Se utilizó `preventDefault()` para evitar recarga
- Se construyó objeto JavaScript con los datos
- Se envió la información al backend usando `fetch` (POST)
- Se implementaron headers y serialización JSON
- Se validó respuesta del backend

#### 6. Actualización dinámica de la UI
- Se limpió el formulario tras envío exitoso
- Se recargó la tabla sin refrescar la página
- Se mostró mensaje de confirmación al usuario

### Estado actual
El sistema cuenta con un flujo completo funcional:

Frontend → Backend → Base de datos → Frontend

### Resultado del sistema
El usuario puede:
- visualizar reservas existentes
- crear nuevas reservas desde la interfaz
- ver actualización inmediata de datos

### Próximos pasos
1. Mejorar manejo de errores del backend en frontend
2. Implementar eliminación de reservas (DELETE)
3. Implementar actualización de reservas (PUT)
4. Desarrollar vitrina pública del sistema
5. Evaluar despliegue del sistema (deploy)

## Día 6 - 02/04/2026

### 🔥 Avances del día

✅ Frontend Fase 1 completado (Panel Administrativo)

Se implementó interfaz completa para gestión de reservas:

- Formulario para crear reservas conectado al backend (POST)
- Tabla dinámica que muestra reservas desde la API (GET)
- Botón "Editar" que:
  - Carga los datos en el formulario
  - Permite modificar la reserva
  - Ejecuta actualización mediante PUT
- Botón "Eliminar" con confirmación (DELETE)
- Recarga dinámica de datos sin refrescar la página

### 🧠 Aprendizajes clave

- Uso de `fetch` para comunicación frontend-backend
- Manejo de funciones asincrónicas (`async/await`)
- Manipulación del DOM (createElement, appendChild, innerHTML)
- Uso de eventos (`DOMContentLoaded`, `submit`, `click`)
- Diferencia entre POST vs PUT en lógica real
- Manejo de estado en frontend (reservaEditandoId)
- Solución de error CORS en FastAPI

### ⚠️ Problemas encontrados

- Error CORS bloqueando comunicación frontend-backend
→ Solucionado agregando CORSMiddleware en FastAPI

- Código duplicado generado por agente en app.js
→ Detectado y corregido manualmente

### 🚀 Estado del proyecto

- Backend: ✅ 100% funcional
- Panel Administrativo: ✅ 100% funcional
- Proyecto general: 🔄 listo para vitrina (frontend cliente)

### 🎯 Próximo paso

➡️ Diseñar e implementar la "Vitrina TuristGo" (interfaz para cliente final)

## Día 7 - 03/04/2026

### ✅ Avances de la sesión

#### 1. Vitrina pública TuristGo
Se continuó el desarrollo de la página pública del sistema (vitrina.html), logrando una versión visual y funcional mucho más cercana al producto final.

#### 2. Mejora visual de la vitrina
- Se incorporó el logo real de TuristGo en el header.
- Se ajustó el hero principal para centrar mejor el H1 y el botón de “Consultar disponibilidad”.
- Se crearon e integraron imágenes reales/generadas para las 3 cards de servicios:
  - Aeropuerto → Hotel
  - Hotel → Aeropuerto
  - City Tour Santiago
- Se verificó que la navegación del menú funciona correctamente con scroll interno.

#### 3. JavaScript de la vitrina
Se implementó lógica inicial en vitrina.js para el formulario rápido del hero:
- captura de datos del formulario rápido
- validación de campos obligatorios
- simulación temporal de disponibilidad
- mensaje comercial de no disponibilidad
- copia automática de datos al formulario completo
- scroll suave hacia la sección de reserva

#### 4. Validaciones realizadas
Se probó correctamente el comportamiento del hero:
- con hora bloqueada se muestra mensaje de no disponibilidad
- con hora disponible se completa el formulario completo y se hace scroll a la reserva

### 🧠 Definiciones funcionales importantes
Durante la sesión se definió el plan maestro del sistema en dos fases:

#### V1 (primer deploy)
- entidad Servicio
- relación Reserva → Servicio mediante servicio_id
- nuevos campos en reserva: origen y destino
- CRUD de servicios
- disponibilidad real con margen horario
- validación final anti-colisión al guardar reserva
- correo automático a la clienta
- panel admin con mantención de servicios
- vitrina conectada a backend real

#### V2 (evolución)
- tabla tarifaria por comuna
- cálculo automático de precios
- capacidad máxima de reservas por bloque horario
- soporte para múltiples vehículos
- WhatsApp automático
- mejoras operativas y filtros avanzados

### 🚀 Estado actual del proyecto
- Backend CRUD reservas: ✅ funcional
- Panel administrativo: ✅ funcional
- Vitrina pública HTML/CSS/JS inicial: ✅ funcional
- Plan maestro V1/V2: ✅ definido

### 🎯 Próximo paso
Iniciar Backend V1:
1. diseñar entidad Servicio
2. actualizar entidad Reserva
3. planificar endpoints de servicios y disponibilidad real

## Día 8 - 05/04/2026

###  Logros del día

Se rediseñó completamente el modelo de datos:
Se creó la entidad Servicio
Se actualizó la entidad Reserva incorporando:
telefono_cliente
origen
destino
servicio_id
Se estableció relación entre Reserva y Servicio (ForeignKey + relationship)
Se actualizó schemas.py:
Nuevos schemas para Servicio
Ajustes en Reserva
  Se agregaron:
DisponibilidadRequest
DisponibilidadResponse
  Se implementó lógica de negocio clave:
Función verificar_disponibilidad en services.py
  Regla:
Bloqueo de ±30 minutos por reserva
  Se creó endpoint:
POST /reservas/disponibilidad
Se realizó reset de base de datos:
Eliminación de estructura anterior
Creación de tablas nuevas (reservas, servicios)
Validación en pgAdmin

### Aprendizajes clave

Diferencia entre ForeignKey y relationship
Cómo estructurar schemas para requests/responses
Manejo de lógica de negocio en services
Conversión de strings a datetime para validaciones
Flujo real backend:
schema → service → route → DB

### Problemas enfrentados

Error de SQLAlchemy por modelo mal interpretado
Resolución mediante:
revisión de modelos
recreación de base de datos

### Próximos pasos

CRUD de servicios
Integrar disponibilidad real en vitrina
Crear reservas desde vitrina
Validación backend al crear reserva
Preparación para deploy

## Día 9 - 06/04/2026

### ✅ Avances realizados

#### 1. Backend V1 validado y cerrado
- Se probaron completamente los endpoints de reservas
- Se probaron completamente los endpoints de servicios
- Se validó la lógica de disponibilidad con margen de 30 minutos antes y después
- Todas las pruebas funcionaron correctamente

#### 2. Rediseño visual del panel administrativo
Se mejoró la estructura general del panel para darle apariencia de dashboard:
- se agregó sidebar izquierda
- se incorporó logo de TuristGo
- se agregó navegación interna con secciones:
  - Crear Reserva
  - Gestionar Reservas
  - Gestión de Servicios
- se reorganizó el contenido principal en módulos/secciones
- se mejoró el CSS general del panel con layout de dos columnas, sidebar fija y tarjetas visuales

### 🧠 Estado actual
- Backend V1: 100%
- Panel administrativo: 75%
- Vitrina pública: 70%
- Proyecto total: 93%

### ⚠️ Pendientes inmediatos
#### Panel administrativo
- actualizar formulario de reservas al nuevo modelo
- actualizar tabla de reservas
- implementar módulo funcional de servicios

#### Vitrina
- conectar disponibilidad real con backend
- conectar creación de reserva real
- cargar servicios dinámicamente

### 🎯 Próximo paso
Continuar con la adaptación funcional del panel administrativo al nuevo modelo de datos.

## Día 10 - 07/04/2026

### 🎯 Objetivo de la sesión

Avanzar en la recta final de la V1, enfocándonos en:
Finalizar integración de servicios en backend
Conectar panel administrativo con servicios
Mejorar estructura y estética del panel

### ⚙️ Desarrollo realizado

1. Backend – Servicios (finalización completa)

Se implementó CRUD completo para entidad Servicio:
GET /servicios
GET /servicios/{id}
POST /servicios
PUT /servicios/{id}
DELETE /servicios/{id}
Integración completa con base de datos (PostgreSQL)
Validación de funcionamiento mediante pruebas en Swagger

2. Panel Administrativo – Integración de Servicios

Formulario de reservas actualizado
Se reemplazó documento_cliente por telefono_cliente
Se agregaron nuevos campos:
origen
destino
servicio_id (select)
Se alinearon los id del formulario con el backend

Tabla de reservas mejorada

Se agregó columna:
servicio (interpretando servicio_id)
origen
destino
Se ajustó lógica en JS para mostrar correctamente los datos

Módulo Gestión de Servicios (nuevo)

Se creó formulario para:
nombre
descripción
precio_base_referencial
estado (activo/inactivo)
Se implementó tabla de servicios con:
listado dinámico desde backend
botones de editar y eliminar
Se integraron funciones JS:
cargarServicios()
enviarServicio()

### 3. Correcciones clave detectadas y solucionadas

🔧 Problema de IDs inconsistentes

El JS usaba IDs antiguos (nombre_servicio, etc.)
Se corrigió para coincidir con HTML:
nombre
descripcion
precio_base_referencial
estado

🔧 Mejora visual del panel

Se implementó sidebar funcional con navegación
Se mejoró distribución general del layout
Se aplicó consistencia visual entre:
formulario de reservas
formulario de servicios
tablas

🔧 Estética final del módulo servicios

Botón “Crear Servicio” reposicionado correctamente
Tabla de servicios estilizada igual que reservas:
encabezado azul
filas alternadas
hover
padding uniforme

### 4. Validaciones funcionales realizadas

Crear servicio ✔
Editar servicio ✔
Eliminar servicio ✔
Listar servicios ✔
Crear reserva con servicio ✔
Visualización correcta en tabla ✔

### 🧠 Decisiones importantes

Se decidió manejar servicio_id como referencia directa en reservas
Se priorizó consistencia entre frontend y backend (nombres de campos)
Se dejó el diseño del select de servicios para validación futura con cliente
Se consideró el panel administrativo como cerrado para V1

### Próximos pasos

Conectar vitrina con backend:
endpoint de disponibilidad
creación real de reservas
Validar flujo completo:
vitrina → backend → panel
Preparar primer deploy (demo cliente)

## Día 11 - 08/04/2026

## 🟢 Estado general
Se finaliza la versión 1 (V1) del sistema TuristGo, quedando completamente funcional a nivel backend, panel administrativo y vitrina pública.

---

## ⚙️ Backend
- CRUD completo de reservas implementado
- CRUD completo de servicios implementado
- Relación entre reservas y servicios mediante servicio_id
- Validación de disponibilidad por bloque de 30 minutos
- Endpoint de disponibilidad funcional
- Base de datos PostgreSQL operativa

---

## 🖥️ Panel Administrativo
- Creación, edición y eliminación de reservas
- Visualización de reservas en tabla
- Creación, edición y eliminación de servicios
- Visualización de servicios en tabla
- Sidebar funcional con navegación por secciones
- Mejora visual general del panel (UI más profesional)

---

## 🌐 Vitrina (Frontend Cliente)
- Carga dinámica de servicios desde backend
- Visualización de servicios mediante cards
- Visualización de precio base referencial
- Consulta de disponibilidad conectada a backend
- Creación de reservas reales desde vitrina
- Integración completa frontend-backend

---

## 🐛 Problemas detectados y resueltos
- Error en carga de imágenes por nombre/ruta → solucionado
- Inconsistencias visuales en formularios → corregidas
- Validación de disponibilidad no aplicada correctamente → solucionado
- Diferencias entre registros antiguos y nuevos → identificado como tema de modelo

---

## ⚠️ Limitaciones detectadas (para V2)
- No existe cálculo de precio final por comuna/destino
- No se informa precio real antes de reservar
- No existe envío de comprobante al cliente
- Formularios aún no son dinámicos según tipo de servicio
- Imágenes de servicios aún no administrables desde panel

---

## 🎯 Conclusión
La V1 queda completamente operativa como sistema funcional base, permitiendo:
- gestionar servicios
- gestionar reservas
- recibir solicitudes desde vitrina

Se define V2 como etapa enfocada en operación real del negocio.
