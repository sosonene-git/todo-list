from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# DB接続URL（SQLiteを使用）
SQLALCHEMY_DATABASE_URL = "sqlite:///./articles.db"

# DBエンジンを作成
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# セッションローカルを作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
