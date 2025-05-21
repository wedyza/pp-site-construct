from fastapi import HTTPException, status, Header
import httpx

MONOLITH_URL = "http://188.68.80.72/api/v1/"


def require_user(Authorization: str = Header()):  # authorization es che
    try:
        request = httpx.get(
            url=f"{MONOLITH_URL}users/me/", headers={"Authorization": Authorization}
        )
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Cannot reach main server",
        )
    if request.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is invalid or has expired",
        )
    return request.json()["id"]
