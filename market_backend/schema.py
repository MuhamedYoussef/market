import json
from uuid import UUID
from typing import Optional

from pydantic import BaseModel, Field, EmailStr, field_validator


class TokenData(BaseModel):
    user_id: UUID


class UserIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=5)


class UserOut(BaseModel):
    id: UUID
    email: EmailStr
    token: Optional[str] = None


class CartIn(BaseModel):
    items: Optional[dict[str, bool]] = dict()


class CartOut(BaseModel):
    id: UUID
    items: Optional[dict[str, bool]] = dict()


class ProductResponse(BaseModel):
    id: UUID
    name: str
    description: str
    price: int
    stock: int
