from typing import List

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import engine, get_db
from .models import Base, Article
from .schemas import ArticleResponse

# テーブル作成
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS設定（フロントエンドからのアクセス許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/articles", response_model=List[ArticleResponse])
def get_articles(db: Session = Depends(get_db)):
    """記事一覧を取得"""
    articles = db.query(Article).order_by(Article.created_at.desc()).all()
    return articles


# 初期データ投入用（開発用）
# Todo: あとで削除する
@app.post("/articles/seed")
def seed_articles(db: Session = Depends(get_db)):
    """サンプルデータを投入"""
    sample_articles = [
        Article(title="はじめての記事", content="これは最初の記事の内容です。"),
        Article(title="FastAPIについて", content="FastAPIは高速なPython Webフレームワークです。"),
        Article(title="SQLAlchemyの使い方", content="SQLAlchemyはPythonのORMライブラリです。"),
    ]
    db.add_all(sample_articles)
    db.commit()
    return {"message": "サンプルデータを投入しました"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}