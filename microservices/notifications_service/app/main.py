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
from .database import get_db, Notification, NotificationType, Base_var, engine
from sqlalchemy import and_
from .utils import ConnectionManager
from fastapi.openapi.utils import get_openapi
import datetime
import json
from typing import List
from .models import CreateNotification, ResponseNotification, SuccessSchema
from .oauth2 import require_user


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
    # app.openapi_schema["servers"] = [{"url": "/api/v1/messages/"}]
    return app.openapi_schema


app = FastAPI(
    docs_url="/api/v1/notifications/docs",
    openapi_url="/api/v1/notifications/openapi.json",
)

ENUM_TABLE = {
    "Возврат": NotificationType.REFUND,
    "Новый заказ": NotificationType.NEW_ORDER,
    "Изменился статус заказа": NotificationType.ORDER_STATUS_CHANGED,
}

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

manager = ConnectionManager()

# Base_var.metadata.create_all(bind=engine)
# print('created')


@app.websocket("/api/v1/notifications/connect/")
async def websocket_endpoint(
    websocket: WebSocket, user_id: int = Depends(require_user)
):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_message(data, user_id)
    except WebSocketDisconnect:
        manager.disconnect(user_id)


@app.post("/api/v1/notifications/", description="Для создания на бэке уведомлений")
async def create_notification(
    payload: CreateNotification, db: Session = Depends(get_db)
):
    notification = Notification()
    notification.user_id = payload.user_id
    notification.body = payload.body
    notification.created_at = datetime.datetime.now()
    notification.type = ENUM_TABLE[payload.type]

    db.add(notification)
    db.commit()
    db.refresh(notification)

    await manager.send_message(notification, payload.user_id)

    return Response(json.dumps({"success": True}), status_code=status.HTTP_200_OK)


@app.get("/api/v1/notifications/{id}/read/")
async def read_notification(
    id: int, db: Session = Depends(get_db), user_id: int = Depends(require_user)
) -> SuccessSchema:
    notification = db.query(Notification).filter(Notification.id == id).first()

    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="notification not found"
        )

    if notification.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not owner of this notification",
        )

    notification.readed = True

    db.commit()
    db.refresh(notification)

    return Response(json.dumps({"success": True}), status_code=status.HTTP_200_OK)


@app.get("/api/v1/notifications/")
async def list_notifications(
    db: Session = Depends(get_db), user_id: int = Depends(require_user)
) -> List[ResponseNotification]:
    return db.query(Notification).filter(Notification.user_id == user_id).all()


@app.get("/api/v1/notifications/unreaded")
async def list_unreaded_notifications(
    db: Session = Depends(get_db), user_id: int = Depends(require_user)
) -> int:
    return (
        db.query(Notification)
        .filter(and_(Notification.user_id == user_id, Notification.readed == False))
        .count()
    )

tzinfo = datetime.timezone(datetime.timedelta(hours=5))
@app.get("/api/v1/notifications/test")
async def test(db: Session = Depends(get_db)):

    notification = Notification()
    notification.user_id = 1
    notification.body = "test"
    notification.created_at = datetime.datetime.now(tz=tzinfo)
    notification.type = ENUM_TABLE["Возврат"]

    db.add(notification)
    db.commit()
    db.refresh(notification)
    return "all is ok"


app.openapi = custom_openapi
