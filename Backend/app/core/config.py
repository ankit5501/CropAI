from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CropAI"
    # Mongo & Auth
    MONGO_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Google OAuth
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_REDIRECT_URI: str

    # Crop Health API
    CROP_HEALTH_API_KEY: str
    CROP_HEALTH_API_URL: str = "https://crop.kindwise.com/api/v1"

    # SoilGrids API
    SOILGRIDS_URL: str = "https://rest.soilgrids.org/query"

    class Config:
        env_file = ".env"

settings = Settings()

