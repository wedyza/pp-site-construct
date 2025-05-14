from fastapi import WebSocket
from typing import Dict
from .database import Message
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id:int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_message(self, message: Message, user_to:int, user_id:int):
        msg = {
            'text': message.body,
            'sender': user_id,
            'receiver': user_to,
            'created_at': message.created_at.isoformat()
        }
        if user_to in self.active_connections:
            await self.active_connections[user_to].send_json(msg),
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_json(msg)
