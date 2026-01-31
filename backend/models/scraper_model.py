from sqlalchemy import Column, Integer, String, ForeignKey, Text
from database import Base

class ScraperData(Base):
    __tablename__ = "scraper_data"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    job_interest = Column(String)

    source = Column(String)   # "reddit", "linkedin", "interview", "glassdoor"
    content = Column(Text)
    link = Column(String)
