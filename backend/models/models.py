from sqlalchemy import Column, Integer, String

from db.database import Base


class ReservaModel(Base):
    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True, index=True)
    nombre_cliente = Column(String, nullable=False)
    apellido_cliente = Column(String, nullable=False)
    documento_cliente = Column(String, nullable=False)
    fecha_servicio = Column(String, nullable=False)
    hora_servicio = Column(String, nullable=False)
    aerolinea = Column(String, nullable=False)
    numero_vuelo = Column(String, nullable=False)
    cantidad_pasajeros = Column(Integer, nullable=False)
    observaciones = Column(String, nullable=True)