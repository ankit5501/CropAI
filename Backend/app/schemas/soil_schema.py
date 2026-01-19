# app/schemas/soil_schema.py
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class SoilRequest(BaseModel):
    latitude: float
    longitude: float
    location_name: Optional[str] = None

class SoilNutrients(BaseModel):
    nitrogen: Optional[float] = None
    phosphorus: Optional[float] = None
    potassium: Optional[float] = None
    ph: Optional[float] = None
    soil_type: Optional[str] = None
    bulk_density: Optional[float] = None
    organic_carbon: Optional[float] = None
    other: Optional[Dict[str, Any]] = None

class SoilRecord(BaseModel):
    id: str
    user_id: str
    latitude: float
    longitude: float
    location_name: Optional[str]
    nutrients: SoilNutrients
    raw_response: Dict[str, Any]
    created_at: datetime
