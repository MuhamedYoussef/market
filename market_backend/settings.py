from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str


settings = Settings(_env_file=".env", _env_file_encoding="utf-8")
