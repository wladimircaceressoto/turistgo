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