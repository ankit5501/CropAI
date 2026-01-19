import requests
import joblib
import os
import numpy as np
from app.core.config import settings



# Existing function for crop identification
def create_identification(payload: dict) -> dict:
    url = f"{settings.CROP_HEALTH_API_URL}/identification"
    headers = {
        "Api-Key": settings.CROP_HEALTH_API_KEY,
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()

def get_identification(access_token: str, details="type,common_names", language="en") -> dict:
    url = f"{settings.CROP_HEALTH_API_URL}/identification/{access_token}"
    params = {"details": details, "language": language}
    headers = {"Api-Key": settings.CROP_HEALTH_API_KEY}
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

