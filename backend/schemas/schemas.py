from typing import Optional
from pydantic import BaseModel


class Reserva(BaseModel):
    id: Optional[int] = None
    nombre_cliente: str
    apellido_cliente: str
    documento_cliente: str
    fecha_servicio: str
    hora_servicio: str
    aerolinea: str
    numero_vuelo: str
    cantidad_pasajeros: int
    observaciones: Optional[str] = None

class Config:
    orm_mode = True
