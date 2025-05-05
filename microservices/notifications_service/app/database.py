#type: ignore

from sqlalchemy import create_engine, Integer, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import TIMESTAMP, Column, Boolean
from enum import Enum
from sqlalchemy import Enum as SqlEnum
SQLALCHEMY_DATABASE_URL = "sqlite:///./notifications.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base_var = declarative_base()
class NotificationType(Enum):
    COMMENT = "Отзыв"
    REFUND = "Возврат"
    CHAT = "Чат"
    NEW_ORDER = "Новый заказ"
    ITEM_APPLIED = "Товар одобрен"
    ORDER_STATUS_CHANGED = "Изменился статус заказа"
    COMMENT_REPLIED = "Получен ответ на комментарий"

class Notification(Base_var):
    __tablename__ = 'notifications'
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False)
    body = Column(Text, nullable=False)
    readed = Column(Boolean, default=False)
    user_id = Column(Integer, nullable=False)
    type = Column(SqlEnum(NotificationType), nullable=False)

Base_var.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
