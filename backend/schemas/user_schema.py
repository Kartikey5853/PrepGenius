from pydantic import BaseModel
from typing import Optional

class RegisterRequest(BaseModel):
    user_id: str
    password: str
    name: str
    whatsapp: str


class LoginRequest(BaseModel):
    user_id: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    user_id: str
    name: str
    whatsapp: str

    class Config:
        from_attributes = True

class ProfileUpdateRequest(BaseModel):
    name: str
    password: Optional[str] = None