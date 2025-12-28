from pydantic import BaseModel
from datetime import datetime


class ArticleBase(BaseModel):
    title: str
    content: str


class ArticleResponse(ArticleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
