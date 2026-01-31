from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class VideoData(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    title = Column(String)
    link = Column(String)
    platform = Column(String)

