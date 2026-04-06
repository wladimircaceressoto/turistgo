from typing import Optional
from pydantic import BaseModel, Field


class Reserva(BaseModel):
    nombre_cliente: str
    apellido_cliente: str
    telefono_cliente: str
    fecha_servicio: str
    hora_servicio: str
    aerolinea: str
    numero_vuelo: str
    cantidad_pasajeros: int = Field(ge=1, le=3)
    origen: str
    destino: str
    servicio_id: int
    observaciones: Optional[str] = None


class ReservaCreate(Reserva):
    pass

class ReservaUpdate(Reserva):
    pass

class ReservaResponse(Reserva):
    id: int

class Config:
    orm_mode = True

class Servicio(BaseModel):
    nombre: str
    descripcion: str
    precio_base_referencial: int = Field(ge=1)
    estado: str

class ServicioCreate(Servicio):
    pass

class ServicioUpdate(Servicio):
    pass

class ServicioResponse(Servicio):
    id: int

class Config:
    orm_mode = True

class DisponibilidadRequest(BaseModel):
    servicio_id: int
    fecha_servicio: str
    hora_servicio: str
    

class DisponibilidadResponse(BaseModel):
    disponible: bool
    mensaje: str
