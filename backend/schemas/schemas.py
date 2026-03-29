from typing import Optional
from pydantic import BaseModel, Field


class Reserva(BaseModel):
    nombre_cliente: str
    apellido_cliente: str
    documento_cliente: str
    fecha_servicio: str
    hora_servicio: str
    aerolinea: str
    numero_vuelo: str
    cantidad_pasajeros: int = Field(ge=0, le=3)
    observaciones: Optional[str] = None

class ReservaCreate(Reserva):
    pass

class ReservaUpdate(Reserva):
    pass

class ReservaResponse(Reserva):
    id: int

class Config:
    orm_mode = True
