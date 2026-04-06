from datetime import datetime
from sqlalchemy.orm import Session

from db.database import SessionLocal
from models.models import ReservaModel
from schemas.schemas import DisponibilidadRequest, DisponibilidadResponse, Reserva, ReservaCreate, ReservaUpdate


def verificar_disponibilidad(data: DisponibilidadRequest):
    db: Session = SessionLocal()
    try:
        reservas = db.query(ReservaModel).filter(
            ReservaModel.servicio_id == data.servicio_id,
            ReservaModel.fecha_servicio == data.fecha_servicio
        ).all()

        hora_solicitada = datetime.strptime(data.hora_servicio, "%H:%M")

        for reserva in reservas:
            hora_reserva = datetime.strptime(reserva.hora_servicio, "%H:%M")
            diferencia_minutos = abs(int((hora_solicitada - hora_reserva).total_seconds() / 60))
            if diferencia_minutos <= 30:
                return DisponibilidadResponse(
                    disponible=False,
                    mensaje="Ese horario ya está muy solicitado. Podemos ofrecerte una alternativa cercana."
                )

        return DisponibilidadResponse(
            disponible=True,
            mensaje="Horario disponible."
        )
    finally:
        db.close()


def obtener_reservas():
    db: Session = SessionLocal()
    try:
        return db.query(ReservaModel).all()
    finally:
        db.close()

def obtener_reserva_por_id(reserva_id: int):
    db: Session = SessionLocal()
    try:
        return db.query(ReservaModel).filter(ReservaModel.id == reserva_id).first()
    finally:
        db.close()

def crear_reserva(reserva: ReservaCreate):
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


def eliminar_reserva(reserva_id: int):
    db: Session = SessionLocal()
    try:
        reserva = db.query(ReservaModel).filter(ReservaModel.id == reserva_id).first()
        if reserva is None:
            return None
        db.delete(reserva)
        db.commit()
        return reserva
    finally:
        db.close()


def actualizar_reserva(reserva_id: int, reserva_data: ReservaUpdate):
    db: Session = SessionLocal()
    try:
        reserva = db.query(ReservaModel).filter(ReservaModel.id == reserva_id).first()
        if reserva is None:
            return None

        # Validar que no exista otra reserva con los mismos datos
        existe_otra = db.query(ReservaModel).filter(
            ReservaModel.documento_cliente == reserva_data.documento_cliente,
            ReservaModel.fecha_servicio == reserva_data.fecha_servicio,
            ReservaModel.hora_servicio == reserva_data.hora_servicio,
            ReservaModel.id != reserva_id
        ).first()

        if existe_otra:
            raise ValueError("Ya existe una reserva para ese cliente en la misma fecha y hora.")

        # Actualizar los campos
        reserva.nombre_cliente = reserva_data.nombre_cliente
        reserva.apellido_cliente = reserva_data.apellido_cliente
        reserva.documento_cliente = reserva_data.documento_cliente
        reserva.fecha_servicio = reserva_data.fecha_servicio
        reserva.hora_servicio = reserva_data.hora_servicio
        reserva.aerolinea = reserva_data.aerolinea
        reserva.numero_vuelo = reserva_data.numero_vuelo
        reserva.cantidad_pasajeros = reserva_data.cantidad_pasajeros
        reserva.observaciones = reserva_data.observaciones

        db.commit()
        db.refresh(reserva)
        return reserva

    finally:
        db.close()


