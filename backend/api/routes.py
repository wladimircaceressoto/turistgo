from typing import List
from fastapi import APIRouter, HTTPException

from schemas.schemas import DisponibilidadRequest, DisponibilidadResponse, Reserva, ReservaCreate, ReservaUpdate, ReservaResponse, ServicioCreate, ServicioUpdate, ServicioResponse
from services.services import (
    obtener_reservas,
    obtener_reserva_por_id,
    crear_reserva,
    eliminar_reserva,
    actualizar_reserva,
    verificar_disponibilidad,
    obtener_servicios,
    obtener_servicio_por_id,
    crear_servicio,
    actualizar_servicio,
    eliminar_servicio,
)

reservas_router = APIRouter(prefix="/reservas", tags=["reservas"])
servicios_router = APIRouter(prefix="/servicios", tags=["servicios"])




@reservas_router.get("", response_model=List[ReservaResponse])
def listar_reservas():
    """Devuelve todas las reservas existentes."""
    return obtener_reservas()

@reservas_router.get("/{reserva_id}", response_model=ReservaResponse)
def obtener_reserva(reserva_id: int):
    """Devuelve una reserva específica por su ID."""
    reserva = obtener_reserva_por_id(reserva_id)
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reserva

@reservas_router.post("", response_model=ReservaResponse, status_code=201)
def registrar_reserva(reserva: ReservaCreate):
    """Agrega una reserva nueva en la base de datos."""
    try:
        return crear_reserva(reserva)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@reservas_router.delete("/{reserva_id}", response_model=ReservaResponse)
def eliminar_reserva_endpoint(reserva_id: int):
    """Elimina una reserva específica por su ID."""
    reserva = eliminar_reserva(reserva_id)
    if reserva is None:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reserva


@reservas_router.put("/{reserva_id}", response_model=ReservaResponse)
def actualizar_reserva_endpoint(reserva_id: int, reserva: ReservaUpdate):
    """Actualiza una reserva específica por su ID."""
    try:
        reserva_actualizada = actualizar_reserva(reserva_id, reserva)
        if reserva_actualizada is None:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return reserva_actualizada
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@reservas_router.post("/disponibilidad", response_model=DisponibilidadResponse)
def verificar_disponibilidad_endpoint(data: DisponibilidadRequest):
    """Verifica la disponibilidad real de horarios para un servicio."""
    return verificar_disponibilidad(data)


@servicios_router.get("", response_model=List[ServicioResponse])
def listar_servicios():
    """Devuelve todos los servicios existentes."""
    return obtener_servicios()


@servicios_router.get("/{servicio_id}", response_model=ServicioResponse)
def obtener_servicio(servicio_id: int):
    """Devuelve un servicio específico por su ID."""
    servicio = obtener_servicio_por_id(servicio_id)
    if servicio is None:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return servicio


@servicios_router.post("", response_model=ServicioResponse, status_code=201)
def crear_servicio_endpoint(servicio: ServicioCreate):
    """Crea un servicio nuevo en la base de datos."""
    return crear_servicio(servicio)


@servicios_router.put("/{servicio_id}", response_model=ServicioResponse)
def actualizar_servicio_endpoint(servicio_id: int, servicio: ServicioUpdate):
    """Actualiza un servicio específico por su ID."""
    servicio_actualizado = actualizar_servicio(servicio_id, servicio)
    if servicio_actualizado is None:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return servicio_actualizado


@servicios_router.delete("/{servicio_id}", response_model=ServicioResponse)
def eliminar_servicio_endpoint(servicio_id: int):
    """Elimina un servicio específico por su ID."""
    servicio = eliminar_servicio(servicio_id)
    if servicio is None:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return servicio

router = APIRouter()
router.include_router(reservas_router)
router.include_router(servicios_router)