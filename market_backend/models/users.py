from sqlalchemy.orm import Mapped

from models.base import DBModel


class User(DBModel):
    __tablename__ = "users"
    email: Mapped[str]
    password: Mapped[str]
