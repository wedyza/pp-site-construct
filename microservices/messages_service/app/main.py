# type: ignore

from fastapi import (
    FastAPI,
    Depends,
    WebSocket,
    WebSocketDisconnect,
    Response,
    HTTPException,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .oauth2 import require_user
from .database import get_db, Message, Base_var, engine
from sqlalchemy.sql import text
from .models import User, CreateMessage, SuccessSchema, MessageResponse
from sqlalchemy import and_
from .utils import ConnectionManager
from fastapi.openapi.utils import get_openapi
from .database_functions import checkout_user
import datetime
import json
from typing import List

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="WebSocket API",
        version="1.0.0",
        description="This is a simple WebSocket API",
        routes=app.routes,
    )
    openapi_schema["paths"]["/api/v1/messages/connect"] = {
        "get": {
            "summary": "WebSocket connection to messages",
            "description": "Connect to the WebSocket server. Send a message and receive a response.",
            "responses": {
                "101": {
                    "description": "Switching Protocols - The client is switching protocols as requested by the server.",
                }
            },
        }
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app = FastAPI(
    docs_url="/api/v1/messages/docs", openapi_url="/api/v1/messages/openapijson"
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_API_URL = "/api/v1/"

manager = ConnectionManager()


Base_var.metadata.create_all(bind=engine)
print('created')

@app.websocket("/api/v1/messages/connect/")
async def websocket_endpoint(
    websocket: WebSocket, user_id: int = Depends(require_user)
):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_message(data, target_id, user_id)
    except WebSocketDisconnect:
        manager.disconnect(user_id)


@app.get("/api/v1/messages/{receiver_id}/")
async def get_messages(
    receiver_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(require_user),
) -> List[MessageResponse]:
    if not checkout_user(receiver_id) or receiver_id == user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Receiver is invalid."
        )

    messages = (
        db.query(Message)
        .filter(and_(Message.sender_id) == user_id, Message.receiver_id == receiver_id)
        .all()
    )

    return messages


@app.post("/api/v1/messages/{receiver_id}/")
async def post_message(
    receiver_id: int,
    payload: CreateMessage,
    db: Session = Depends(get_db),
    user_id: int = Depends(require_user),
) -> SuccessSchema:
    if not checkout_user(receiver_id) or receiver_id == user_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Receiver is invalid."
        )

    message = Message()
    message.body = payload.body
    message.sender_id = user_id
    message.receiver_id = receiver_id
    message.created_at = datetime.datetime.now()

    db.add(message)
    db.commit()
    db.refresh(message)

    await manager.send_message(message, message.receiver_id, message.sender_id)
    return Response(json.dumps({"success": True}))


@app.get("/api/v1/messages/unreaded")
async def count_unreaded_messages(
    db: Session = Depends(get_db), user_id: int = Depends(require_user)
) -> int:
    return (
        db.query(Message)
        .filter(and_(Message.receiver_id == user_id, Message.readed == False))
        .count()
    )


@app.get("/api/v1/messages/{id}/read")
async def read_message(
    id: int, db: Session = Depends(get_db), user_id: int = Depends(require_user)
) -> SuccessSchema:
    message = db.query(Message).filter(Message.id == id).first()

    if message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message with id = {id} not found",
        )

    if message.sender_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not the owner of message",
        )

    message.readed = True

    db.commit()
    db.refresh(message)

    return Response(json.dumps({"success": True}))


@app.delete("/api/v1/messages/{id}/")
async def delete_message(
    id: int, db: Session = Depends(get_db), user_id: int = Depends(require_user)
) -> SuccessSchema:
    message = db.query(Message).filter(Message.id == id).first()

    if message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message with id = {id} not found",
        )

    if message.sender_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not the owner of message",
        )

    db.delete(message)
    db.commit()

    return Response(json.dumps({"success": True}))


app.openapi = custom_openapi
