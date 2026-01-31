from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

from models.user_model import User
from schemas.user_schema import RegisterRequest, LoginRequest, TokenResponse
from dependencies import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])

# ================= CONFIG =================

SECRET_KEY = "CHANGE_THIS_TO_A_RANDOM_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Use PBKDF2 instead of bcrypt (stable on Windows)
pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)

# ================= HELPERS =================

def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)


def create_access_token(user_id: str):
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# ================= REGISTER =================

@router.post("/register", response_model=TokenResponse)
def register(request: RegisterRequest, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.user_id == request.user_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        user_id=request.user_id,
        password=hash_password(request.password),
        name=request.name,
        whatsapp=request.whatsapp
    )

    db.add(user)
    db.commit()

    token = create_access_token(user.user_id)

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ================= LOGIN =================

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.user_id == request.user_id).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user.user_id)

    return {
        "access_token": token,
        "token_type": "bearer"
    }
