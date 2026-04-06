from typing import List
from fastapi import APIRouter, HTTPException

from schemas.schemas import DisponibilidadRequest, DisponibilidadResponse, Reserva, ReservaCreate, ReservaUpdate, ReservaResponse
from services.services import obtener_reservas, obtener_reserva_por_id, crear_reserva, eliminar_reserva, actualizar_reserva, verificar_disponibilidad

router = APIRouter(prefix="/reservas", tags=["reservas"])


@router.get("", response_model=List[ReservaResponse])
def listar_reservas():
    """Devuelve todas las reservas existentes."""
    return obtener_reservas()

@router.get("/{reserva_id}", response_model=ReservaResponse)
def obtener_reserva(reserva_id: int):
    """Devuelve una reserva específica por su ID."""
    reserva = obtener_reserva_por_id(reserva_id)
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reserva

@router.post("", response_model=ReservaResponse, status_code=201)
def registrar_reserva(reserva: ReservaCreate):
    """Agrega una reserva nueva en la base de datos."""
    try:
        return crear_reserva(reserva)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{reserva_id}", response_model=ReservaResponse)
def eliminar_reserva_endpoint(reserva_id: int):
    """Elimina una reserva específica por su ID."""
    reserva = eliminar_reserva(reserva_id)
    if reserva is None:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reserva


@router.put("/{reserva_id}", response_model=ReservaResponse)
def actualizar_reserva_endpoint(reserva_id: int, reserva: ReservaUpdate):
    """Actualiza una reserva específica por su ID."""
    try:
        reserva_actualizada = actualizar_reserva(reserva_id, reserva)
        if reserva_actualizada is None:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return reserva_actualizada
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/disponibilidad", response_model=DisponibilidadResponse)
def verificar_disponibilidad_endpoint(data: DisponibilidadRequest):
    """Verifica la disponibilidad real de horarios para un servicio."""
    return verificar_disponibilidad(data)

