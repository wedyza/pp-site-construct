from pydantic import BaseModel
from datetime import datetime
from .database import NotificationType

class CreateNotification(BaseModel):
    body: str
    type: NotificationType
    user_id: int


class ResponseNotification(BaseModel):
    id: int
    body: str
    type: NotificationType
    user_id: int
    created_at: datetime
    readed: bool

class SuccessSchema(BaseModel):
    success: bool
    deatil: str | None