from fastapi import APIRouter, Body, HTTPException
from app.schemas.user_schema import UserCreateSchema as UserCreate, UserLoginSchema as UserLogin
from app.services.auth_service import AuthService
from app.core.security import create_access_token
from pydantic import BaseModel

auth_router = APIRouter()

# Signup endpoint
@auth_router.post("/signup")
async def signup(user: UserCreate):
    return await AuthService.signup(user)

# Login endpoint
@auth_router.post("/login")
async def login(user: UserLogin):
    return await AuthService.login(user)

# POST-based Google login
class GoogleTokenSchema(BaseModel):
    token: str  # The id_token from Google Identity Services

@auth_router.post("/auth/google")
async def google_login(google_token: GoogleTokenSchema):
    token = google_token.token

    try:
        # Verify Google token and get user info
        user_info = await AuthService.verify_google_token(token)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid Google token: {str(e)}")

    # Create your JWT
    jwt_token = create_access_token({"sub": user_info["email"]})

    # Return user info and JWT directly
    return {"user": user_info, "token": jwt_token}


@auth_router.get("/test")
async def test():
    return {"ok": True}

