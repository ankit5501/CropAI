from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import timezone, datetime

class SoilData(BaseModel):
    nitrogen: Optional[float]
    phosphorus: Optional[float]
    potassium: Optional[float]
    ph: Optional[float]
    organic_carbon: Optional[float]
    soil_type: Optional[str]
    moisture: Optional[float]  

class FarmLocation(BaseModel):
    region: str
    state: Optional[str]
    district: Optional[str]
    latitude: float
    longitude: float

class UserModel(BaseModel):
    username: str
    email: EmailStr
    password: Optional[str]  
    location: Optional[FarmLocation]  
    soil_data: Optional[SoilData]  
    created_at: datetime = datetime.now(timezone.utc)
    updated_at: datetime = datetime.now(timezone.utc)
