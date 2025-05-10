#type: ignore
import httpx

MONOLITH_URL = "http://localhost:8000/api/v1/"

def checkout_user(user_id:int):
    request = httpx.get(url=f"{MONOLITH_URL}users/{user_id}/")
    return request.status_code == 200