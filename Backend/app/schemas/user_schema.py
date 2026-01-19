from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

# Soil Data Schema
class SoilDataSchema(BaseModel):
    nitrogen: Optional[float]
    phosphorus: Optional[float]
    potassium: Optional[float]
    ph: Optional[float]
    organic_carbon: Optional[float]
    soil_type: Optional[str]
    moisture: Optional[float]  

# Farm / Location Schema
class FarmLocationSchema(BaseModel):
    region: str
    state: Optional[str]
    district: Optional[str]
    latitude: float
    longitude: float

# User Schemas

# For user signup / creation
class UserCreateSchema(BaseModel):
    username: str
    email: EmailStr
    password: str  
    location: Optional[FarmLocationSchema] = None
    soil_data: Optional[SoilDataSchema] = None

# For user login
class UserLoginSchema(BaseModel):
    username: str
    password: str

# For responses (omit password)
class UserOutSchema(BaseModel):
    id: str
    username: str
    email: EmailStr
    location: Optional[FarmLocationSchema]
    soil_data: Optional[SoilDataSchema]
    created_at: datetime
    updated_at: datetime

