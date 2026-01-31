from pydantic import BaseModel


class VideoCreate(BaseModel):
    user_id: int
    title: str
    link: str
    platform: str


class VideoResponse(BaseModel):
    id: int
    user_id: int
    title: str
    link: str
    platform: str

    class Config:
        from_attributes = True
