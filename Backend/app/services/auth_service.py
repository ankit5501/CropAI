from app.database.mongodb import user_collection
from app.core.security import hash_password, verify_password, create_access_token
from app.schemas.user_schema import UserCreateSchema as UserCreate, UserLoginSchema as UserLogin
from fastapi import HTTPException
from authlib.integrations.base_client.errors import OAuthError
from app.core.oauth import oauth
from datetime import datetime, timezone
from fastapi.responses import RedirectResponse
from urllib.parse import urlencode

class AuthService:
    @staticmethod
    async def signup(user: UserCreate):
        existing_user = await user_collection.find_one({"username": user.username})
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        hashed = hash_password(user.password)
        user_dict = {
            "username": user.username,
            "email": user.email,
            "password": hashed,
            "farm": None,       # optional, can be updated later from dashboard
            "soil_data": None,  # optional, can be updated later from dashboard
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        result = await user_collection.insert_one(user_dict)
        return {
            "id": str(result.inserted_id),
            "username": user.username,
            "email": user.email,
            "farm": None,
            "soil_data": None
        }

    @staticmethod
    async def login(user: UserLogin):
        db_user = await user_collection.find_one({"username": user.username})
        if not db_user or not verify_password(user.password, db_user.get("password")):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        token = create_access_token({"sub": user.username})
        return {"access_token": token, "token_type": "bearer"}

    @staticmethod
    async def google_login(request):
        redirect_uri = "http://localhost:8000/auth/google/callback"
        return await oauth.google.authorize_redirect(request, redirect_uri)

    @staticmethod
    async def google_callback(request):
        try:
            token = await oauth.google.authorize_access_token(request)
            resp = await oauth.google.get('userinfo', token=token)
            user_info = resp.json()
        except OAuthError:
            raise HTTPException(status_code=400, detail="Google login failed")

        existing_user = await user_collection.find_one({"email": user_info["email"]})
        if not existing_user:
            new_user = {
                "username": user_info.get("name"),
                "email": user_info.get("email"),
                "password": None,
                "farm": None,
                "soil_data": None,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            }
            await user_collection.insert_one(new_user)

        jwt_token = create_access_token({"sub": user_info["email"]})

        # Redirect to frontend dashboard with token in query params
        redirect_url = f"http://localhost:5173/dashboard?{urlencode({'token': jwt_token})}"
        return RedirectResponse(url=redirect_url)