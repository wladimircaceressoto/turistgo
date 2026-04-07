from datetime import datetime
from sqlalchemy.orm import Session

from db.database import SessionLocal
from models.models import ReservaModel, ServicioModel
from schemas.schemas import DisponibilidadRequest, DisponibilidadResponse, Reserva, ReservaCreate, ReservaUpdate, ServicioCreate, ServicioUpdate


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
        # Validar disponibilidad real
        disponibilidad = verificar_disponibilidad(
            DisponibilidadRequest(
                servicio_id=reserva.servicio_id,
                fecha_servicio=reserva.fecha_servicio,
                hora_servicio=reserva.hora_servicio
            )
        )

        if not disponibilidad.disponible:
            raise ValueError(disponibilidad.mensaje)

        nueva_reserva = ReservaModel(
            nombre_cliente=reserva.nombre_cliente,
            apellido_cliente=reserva.apellido_cliente,
            telefono_cliente=reserva.telefono_cliente,
            fecha_servicio=reserva.fecha_servicio,
            hora_servicio=reserva.hora_servicio,
            aerolinea=reserva.aerolinea,
            numero_vuelo=reserva.numero_vuelo,
            cantidad_pasajeros=reserva.cantidad_pasajeros,
            observaciones=reserva.observaciones,
            origen=reserva.origen,
            destino=reserva.destino,
            servicio_id=reserva.servicio_id
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

        # Validar disponibilidad real, permitiendo la propia reserva
        reservas_existentes = db.query(ReservaModel).filter(
            ReservaModel.servicio_id == reserva_data.servicio_id,
            ReservaModel.fecha_servicio == reserva_data.fecha_servicio,
            ReservaModel.id != reserva_id
        ).all()

        hora_solicitada = datetime.strptime(reserva_data.hora_servicio, "%H:%M")
        for otra_reserva in reservas_existentes:
            hora_otra = datetime.strptime(otra_reserva.hora_servicio, "%H:%M")
            diferencia_minutos = abs(int((hora_solicitada - hora_otra).total_seconds() / 60))
            if diferencia_minutos <= 30:
                raise ValueError("Ese horario ya está muy solicitado. Podemos ofrecerte una alternativa cercana.")

        # Actualizar los campos
        reserva.nombre_cliente = reserva_data.nombre_cliente
        reserva.apellido_cliente = reserva_data.apellido_cliente
        reserva.telefono_cliente = reserva_data.telefono_cliente
        reserva.fecha_servicio = reserva_data.fecha_servicio
        reserva.hora_servicio = reserva_data.hora_servicio
        reserva.aerolinea = reserva_data.aerolinea
        reserva.numero_vuelo = reserva_data.numero_vuelo
        reserva.cantidad_pasajeros = reserva_data.cantidad_pasajeros
        reserva.observaciones = reserva_data.observaciones
        reserva.origen = reserva_data.origen
        reserva.destino = reserva_data.destino
        reserva.servicio_id = reserva_data.servicio_id

        db.commit()
        db.refresh(reserva)
        return reserva

    finally:
        db.close()


# Funciones CRUD para Servicio

def obtener_servicios():
    db: Session = SessionLocal()
    try:
        return db.query(ServicioModel).all()
    finally:
        db.close()


def obtener_servicio_por_id(servicio_id: int):
    db: Session = SessionLocal()
    try:
        return db.query(ServicioModel).filter(ServicioModel.id == servicio_id).first()
    finally:
        db.close()


def crear_servicio(servicio: ServicioCreate):
    db: Session = SessionLocal()
    try:
        nuevo_servicio = ServicioModel(
            nombre=servicio.nombre,
            descripcion=servicio.descripcion,
            precio_base_referencial=servicio.precio_base_referencial,
            estado=servicio.estado
        )
        db.add(nuevo_servicio)
        db.commit()
        db.refresh(nuevo_servicio)
        return nuevo_servicio
    finally:
        db.close()


def actualizar_servicio(servicio_id: int, servicio_data: ServicioUpdate):
    db: Session = SessionLocal()
    try:
        servicio = db.query(ServicioModel).filter(ServicioModel.id == servicio_id).first()
        if servicio is None:
            return None

        servicio.nombre = servicio_data.nombre
        servicio.descripcion = servicio_data.descripcion
        servicio.precio_base_referencial = servicio_data.precio_base_referencial
        servicio.estado = servicio_data.estado

        db.commit()
        db.refresh(servicio)
        return servicio
    finally:
        db.close()


def eliminar_servicio(servicio_id: int):
    db: Session = SessionLocal()
    try:
        servicio = db.query(ServicioModel).filter(ServicioModel.id == servicio_id).first()
        if servicio is None:
            return None
        db.delete(servicio)
        db.commit()
        return servicio
    finally:
        db.close()


