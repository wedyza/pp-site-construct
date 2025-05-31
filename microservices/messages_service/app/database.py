# type: ignore

from sqlalchemy import create_engine, Integer, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import TIMESTAMP, Column, ForeignKey, String, Boolean, text

# SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOSTNAME}:{settings.DATABASE_PORT}/{settings.POSTGRES_DB}"
SQLALCHEMY_DATABASE_URL = "sqlite:///./messages.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base_var = declarative_base()


class Message(Base_var):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False)
    body = Column(Text, nullable=False)
    readed = Column(Boolean, default=False)
    sender_id = Column(Integer, nullable=False)
    receiver_id = Column(Integer, nullable=False)


Base_var.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
