# app/services/fertilizer_service.py
import joblib
import os
import numpy as np

# Construct path to ML_Models folder under app
model_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ML_Models")

# Load the model and encoders at import
try:
    fertilizer_model = joblib.load(os.path.join(model_dir, "Fertilizer_recommend_model.joblib"))
    soiltype_encoder = joblib.load(os.path.join(model_dir, "soiltype_encoder.joblib"))
    croptype_encoder = joblib.load(os.path.join(model_dir, "croptype_encoder.joblib"))
    fertname_encoder = joblib.load(os.path.join(model_dir, "fertname_encoder.joblib"))
    print("Fertilizer model and encoders loaded successfully ✅")
except FileNotFoundError as e:
    raise RuntimeError(f"Model or encoder file not found: {e}")
except Exception as e:
    raise RuntimeError(f"Error loading model or encoders: {e}")


def get_fertilizer_recommendation(input_data: dict):
    """
    Predict fertilizer based on soil type, crop type, and nutrient/environmental inputs.
    Expects input_data dict with keys:
    'soil_type', 'crop_type', 'temperature', 'humidity', 'moisture', 'nitrogen', 'phosphorus', 'potassium'
    """
    try:
        # Extract inputs with correct keys
        soil_type = input_data.get("soil_type")
        crop_type = input_data.get("crop_type")
        temperature = input_data.get("temperature")
        humidity = input_data.get("humidity")
        moisture = input_data.get("moisture")
        N = input_data.get("nitrogen")
        P = input_data.get("phosphorus")
        K = input_data.get("potassium")

        # Encode categorical features
        soil_encoded = soiltype_encoder.transform([soil_type])[0]
        crop_encoded = croptype_encoder.transform([crop_type])[0]

        # Prepare model input
        model_input = np.array([[temperature, humidity, moisture, soil_encoded, crop_encoded, N, P, K]])

        # Predict fertilizer
        fert_pred_encoded = fertilizer_model.predict(model_input)

        # Decode predicted fertilizer name
        fert_pred = fertname_encoder.inverse_transform(fert_pred_encoded)[0]

        return {"fertilizer_name": fert_pred}

    except Exception as e:
        return {"error": f"Prediction failed: {e}"}
