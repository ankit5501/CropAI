# app/routes/soil_routes.py
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.soil_schema import SoilRequest, SoilRecord
from app.services.soil_service import call_soilgrids, extract_nutrients_from_soilgrids
from app.core.security import get_current_user
from app.database.mongodb import soil_collection
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("http://127.0.0.1:8000/fertilizer/recommend_fertilizer", response_model=SoilRecord)
async def fetch_and_save_soil_data(req: SoilRequest, current_user: dict = Depends(get_current_user)):
    try:
        raw = await call_soilgrids(req.latitude, req.longitude)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"SoilGrids error: {str(e)}")

    nutrients = extract_nutrients_from_soilgrids(raw)
    record = {
        "user_id": ObjectId(current_user["id"]),
        "latitude": req.latitude,
        "longitude": req.longitude,
        "location_name": req.location_name,
        "nutrients": nutrients,
        "raw_response": raw,
        "created_at": datetime.utcnow()
    }

    result = await soil_collection.insert_one(record)
    record_id = str(result.inserted_id)

    return {
        "id": record_id,
        "user_id": current_user["id"],
        "latitude": req.latitude,
        "longitude": req.longitude,
        "location_name": req.location_name,
        "nutrients": nutrients,
        "raw_response": raw,
        "created_at": record["created_at"]
    }

@router.get("/soil/me")
async def get_my_soil_records(current_user: dict = Depends(get_current_user)):
    cursor = soil_collection.find({"user_id": ObjectId(current_user["id"])})
    res = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        doc["user_id"] = str(doc["user_id"])
        res.append(doc)
    return res
