from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base

# Import models (important for table creation)
from models.user_model import User
from models.scraper_model import ScraperData
from models.video_model import VideoData
from models.task_model import Task
from models.community_model import CommunityPost, CommunityComment

# Import routes
from routes.auth_routes import router as auth_router

# ------------------------
# Create tables
# ------------------------
Base.metadata.create_all(bind=engine)

# ------------------------
# Initialize app
# ------------------------
app = FastAPI(
    title="Interview Preparation Platform",
    version="1.0.0"
)

# ------------------------
# CORS CONFIG (THIS FIXES YOUR ISSUE)
# ------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # For development (later restrict)
    allow_credentials=True,
    allow_methods=["*"],   # Allow POST, GET, OPTIONS etc
    allow_headers=["*"],
)

# ------------------------
# Routes
# ------------------------

app.include_router(auth_router)

# ------------------------
# Root
# ------------------------

@app.get("/")
def root():
    return {"status": "running"}
