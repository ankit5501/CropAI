from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware  # <-- added
from app.routes.auth_routes import auth_router
from app.routes.crop_routes import router as crop_router
from app.routes.soil_routes import router as soil_router
from app.routes.fertilizer_routes import fertilizer_router

app = FastAPI(title="CropAI Backend")

# Add SessionMiddleware for OAuth login
app.add_middleware(SessionMiddleware, secret_key="supersecretkey123")

# CORS configuration
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router, tags=["Authentication"])
app.include_router(crop_router, prefix="/crop", tags=["Crop Identification & Recommendation"])
app.include_router(soil_router, prefix="/soil", tags=["Soil"])
app.include_router(fertilizer_router, prefix="/fertilizer", tags=["Fertilizer Recommendation"])

@app.get("/ping")
async def ping():
    return {"status": "ok"}

