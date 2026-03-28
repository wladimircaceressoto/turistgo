from sqlalchemy.orm import Session

from db.database import SessionLocal
from models.models import ReservaModel
from schemas.schemas import Reserva


def obtener_reservas():
    db: Session = SessionLocal()
    try:
        return db.query(ReservaModel).all()
    finally:
        db.close()


def crear_reserva(reserva: Reserva):
    db: Session = SessionLocal()
    try:
        existe = db.query(ReservaModel).filter(
            ReservaModel.documento_cliente == reserva.documento_cliente,
            ReservaModel.fecha_servicio == reserva.fecha_servicio,
            ReservaModel.hora_servicio == reserva.hora_servicio
        ).first()

        if existe:
            raise ValueError("Ya existe una reserva para ese cliente en la misma fecha y hora.")

        nueva_reserva = ReservaModel(
            nombre_cliente=reserva.nombre_cliente,
            apellido_cliente=reserva.apellido_cliente,
            documento_cliente=reserva.documento_cliente,
            fecha_servicio=reserva.fecha_servicio,
            hora_servicio=reserva.hora_servicio,
            aerolinea=reserva.aerolinea,
            numero_vuelo=reserva.numero_vuelo,
            cantidad_pasajeros=reserva.cantidad_pasajeros,
            observaciones=reserva.observaciones
        )

        db.add(nueva_reserva)
        db.commit()
        db.refresh(nueva_reserva)

        return nueva_reserva

    finally:
        db.close()
