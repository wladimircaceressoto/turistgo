from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router 
from db.database import Base, engine
from models.models import ReservaModel, ServicioModel

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {"message": "TuristGo API funcionando 🚀"}