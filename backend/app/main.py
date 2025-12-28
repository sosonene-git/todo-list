from typing import List

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import engine, get_db, SessionLocal
from .models import Base, Article
from .schemas import ArticleResponse

# テーブル作成
Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    try:
        if db.query(Article).count() == 0:
            sample_articles = [
                Article(title="はじめての記事", content="これは最初の記事の内容です。", user="yamada"),
                Article(title="FastAPIについて", content="FastAPIは高速なPython Webフレームワークです。", user="tanaka"),
                Article(title="SQLAlchemyの使い方", content="SQLAlchemyはPythonのORMライブラリです。", user="sato"),
            ]
            db.add_all(sample_articles)
            db.commit()
    finally:
        db.close()

seed_db()

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
# Todo: あとで
@app.post("/articles/seed")
def seed_articles(db: Session = Depends(get_db)):
    """サンプルデータを投入"""
    sample_articles = [
        Article(id=1, title="はじめての記事", content="これは最初の記事の内容です。", user="yamada"),
        Article(id=2, title="FastAPIについて", content="FastAPIは高速なPython Webフレームワークです。", user="tanaka"),
        Article(id=3, title="SQLAlchemyの使い方", content="SQLAlchemyはPythonのORMライブラリです。", user="sato"),
    ]
    db.add_all(sample_articles)
    db.commit()
    return {"message": "サンプルデータを投入しました"}


@app.get("/articles/{article_id}", response_model=ArticleResponse)
def get_article(article_id: int, db: Session = Depends(get_db)):
    """記事詳細を取得"""
    article = db.query(Article).filter(Article.id == article_id).first()
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return article