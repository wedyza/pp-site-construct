#type: ignore
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_PORT: int
    POSTGRES_PASSWORD: str
    POSTGRES_USER: str
    POSTGRES_DB: str
    CLIENT_ORIGIN: str
    authjwt_token_location: set = {"cookies", "headers"}
    authjwt_cookie_csrf_protect: bool = True
    POSTGRES_HOSTNAME: str

    class Config:
        env_file = './.env'


settings = Settings()