from uuid import UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Column, ForeignKey, JSON

from models.base import DBModel


class Cart(DBModel):
    __tablename__ = "carts"

    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"))
    items = Column(JSON, nullable=True)
