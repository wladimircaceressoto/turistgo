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