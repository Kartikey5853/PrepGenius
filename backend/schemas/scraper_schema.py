from pydantic import BaseModel


class ScraperCreate(BaseModel):
    user_id: int
    job_interest: str
    source: str        # reddit, linkedin, interview, glassdoor
    title: str
    content: str
    link: str | None = None


class ScraperResponse(BaseModel):
    id: int
    user_id: int
    job_interest: str
    source: str
    title: str
    content: str
    link: str | None

    class Config:
        from_attributes = True
