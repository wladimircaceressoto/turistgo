from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from db.database import Base


class ReservaModel(Base):
    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True, index=True)
    nombre_cliente = Column(String, nullable=False)
    apellido_cliente = Column(String, nullable=False)
    telefono_cliente = Column(String, nullable=False)
    fecha_servicio = Column(String, nullable=False)
    hora_servicio = Column(String, nullable=False)
    aerolinea = Column(String, nullable=False)
    numero_vuelo = Column(String, nullable=False)
    cantidad_pasajeros = Column(Integer, nullable=False)
    origen = Column(String, nullable=False)
    destino = Column(String, nullable=False)
    servicio_id = Column(Integer, ForeignKey("servicios.id"), nullable=False)
    observaciones = Column(String, nullable=True)
    servicio = relationship("ServicioModel", back_populates="reservas")

class ServicioModel(Base):
    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=False)
    precio_base_referencial = Column(Integer, nullable=False)
    estado = Column(String, nullable=False)
    reservas = relationship("ReservaModel", back_populates="servicio")