import motor.motor_asyncio
from app.core.config import settings

client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URL)
db = client.CropAI

user_collection = db.get_collection("users")
soil_collection = db.get_collection("soil_data")

