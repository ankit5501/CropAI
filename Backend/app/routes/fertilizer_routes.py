# app/routes/fertilizer_routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.fertilizer_service import get_fertilizer_recommendation

class FertilizerPredictionRequest(BaseModel):
    soil_type: str
    crop_type: str
    temperature: float
    humidity: float
    moisture: float
    nitrogen: float
    phosphorus: float
    potassium: float

fertilizer_router = APIRouter()


@fertilizer_router.post("/recommend_fertilizer")
async def recommend_fertilizer(request: FertilizerPredictionRequest):
    """
    Recommends a suitable fertilizer based on soil, crop, and environmental/nutrient inputs.
    """
    try:
        input_data = request.model_dump()  # converts Pydantic model to dict
        result = get_fertilizer_recommendation(input_data)

        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])

        return {"recommendation_result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
