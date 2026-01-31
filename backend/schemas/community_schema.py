from pydantic import BaseModel


# -------- POSTS --------

class CommunityPostCreate(BaseModel):
    user_id: int
    title: str
    content: str


class CommunityPostResponse(BaseModel):
    id: int
    user_id: int
    title: str
    content: str
    upvotes: int

    class Config:
        from_attributes = True


# -------- COMMENTS --------

class CommunityCommentCreate(BaseModel):
    post_id: int
    user_id: int
    comment_text: str


class CommunityCommentResponse(BaseModel):
    id: int
    post_id: int
    user_id: int
    comment_text: str

    class Config:
        from_attributes = True
