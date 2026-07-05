from fastapi import FastAPI
from database import engine
from models import Base
from routers.users import router as user_router
from routers.projects import router as project_router
from routers.tasks import router as task_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TeamFlow API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],   # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(project_router)
app.include_router(task_router)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "Welcome to TeamFlow API"
    }