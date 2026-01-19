from pydantic import BaseModel
from typing import List, Optional

class CropIdentificationRequest(BaseModel):
    images: List[str]                # Base64 encoded images
    latitude: Optional[float]
    longitude: Optional[float]
    similar_images: Optional[bool] = True
    details: Optional[str] = "type,common_names,eppo_code,wiki_url,taxonomy"
    language: Optional[str] = "en"
    async_mode: Optional[bool] = False

class CropIdentificationResponse(BaseModel):
    identification_result: dict
