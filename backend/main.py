from fastapi import FastAPI

from api.routes import router as reservas_router
from db.database import Base, engine
from models.models import ReservaModel

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(reservas_router)


@app.get("/")
def root():
    return {"message": "TuristGo API funcionando 🚀"}