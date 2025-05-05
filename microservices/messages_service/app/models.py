from pydantic import BaseModel
from datetime import datetime

class CreateMessage(BaseModel):
    body: str

class MessageResponse(BaseModel):
    sender_id: int
    receiver_id: int
    body: str
    created_at: datetime
    readed: bool

class User(BaseModel):
    name: str
    sex: str
    email: str
    user_type: str
    otp: int | None
    otp_expires: datetime | None


class SuccessSchema(BaseModel):
    success: bool
    deatil: str | None