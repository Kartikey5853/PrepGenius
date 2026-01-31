from sqlalchemy import Column, Integer, String, ForeignKey, Text
from database import Base


# ------------------------
# COMMUNITY POSTS TABLE
# ------------------------

class CommunityPost(Base):
    __tablename__ = "community_posts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))  # who created post

    title = Column(String)          # Post title
    content = Column(Text)         # Post body

    upvotes = Column(Integer, default=0)   # total upvotes


# ------------------------
# COMMUNITY COMMENTS TABLE
# ------------------------

class CommunityComment(Base):
    __tablename__ = "community_comments"

    id = Column(Integer, primary_key=True, index=True)

    post_id = Column(Integer, ForeignKey("community_posts.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    comment_text = Column(Text)
