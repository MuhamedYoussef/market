from sqlalchemy.orm import Mapped

from models.base import DBModel


class Product(DBModel):
    __tablename__ = "products"

    name: Mapped[str]
    description: Mapped[str]
    price: Mapped[int]
    stock: Mapped[int]
