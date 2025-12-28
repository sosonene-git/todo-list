from pydantic import BaseModel
from datetime import datetime


class ArticleBase(BaseModel):
    title: str
    content: str


class ArticleCreate(ArticleBase):
    pass


class ArticleResponse(ArticleBase):
    id: int
    user: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
