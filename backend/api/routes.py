from typing import List
from fastapi import APIRouter, HTTPException

from schemas.schemas import Reserva
from services.services import obtener_reservas, crear_reserva

router = APIRouter(prefix="/reservas", tags=["reservas"])


@router.get("", response_model=List[Reserva])
def listar_reservas():
    """Devuelve todas las reservas existentes."""
    return obtener_reservas()


@router.post("", response_model=Reserva, status_code=201)
def registrar_reserva(reserva: Reserva):
    """Agrega una reserva nueva en memoria."""
    try:
        return crear_reserva(reserva)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
