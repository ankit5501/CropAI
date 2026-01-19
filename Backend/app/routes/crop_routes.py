# The route file will handle the API endpoint for the frontend.
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from app.schemas.crop_schema import CropIdentificationResponse
from app.services.crop_service import create_identification
import base64

router = APIRouter()

# Existing route for crop identification
@router.post("/identify", response_model=CropIdentificationResponse)
async def identify_crop(
    files: List[UploadFile] = File(...),
    latitude: Optional[float] = Form(None),
    longitude: Optional[float] = Form(None),
    similar_images: Optional[bool] = Form(True),
    details: Optional[str] = Form("type,common_names,eppo_code,wiki_url,taxonomy"),
    language: Optional[str] = Form("en"),
    async_mode: Optional[bool] = Form(False),
):
    try:
        encoded_images = []
        for file in files:
            content = await file.read()
            encoded_image = base64.b64encode(content).decode("utf-8")
            encoded_images.append(encoded_image)

        payload = {
            "images": encoded_images,
            "latitude": latitude,
            "longitude": longitude,
            "similar_images": similar_images,
            "details": details,
            "language": language,
            "async": async_mode
        }

        result = create_identification(payload)
        return {"identification_result": result}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

