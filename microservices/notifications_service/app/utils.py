from fastapi import WebSocket
from typing import Dict
from .database import Notification
from .models import ResponseNotification


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_message(self, notification: Notification, user_id: int):
        if user_id in self.active_connections:
            notification_json = ResponseNotification(
                id=notification.id,
                body=notification.body,
                type=notification.type,
                created_at=notification.created_at,
                user_id=notification.user_id,
            )
            await self.active_connections[user_id].send_json(
                notification_json.model_dump(mode="json")
            )
