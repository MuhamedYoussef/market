from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import User, Product, Cart
from schema import ProductResponse, UserIn, UserOut, CartIn, CartOut
from dependencies import DBSession, authenticate_user, pwd_context, create_access_token, get_user

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.post("/signup")
async def signup(db: DBSession, data: UserIn):
    user = db.query(User).where(User.email == data.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(data.password)
    user = User(email=data.email, password=hashed_password)
    db.add(user)
    db.commit()

    token = create_access_token(data={"user_id": str(user.id)})
    return {"id": user.id, "email": user.email, "token": token}


@app.post("/login", response_model=UserOut)
async def login(db: DBSession, user: Annotated[User, Depends(authenticate_user)]):
    token = create_access_token(data={"user_id": str(user.id)})
    return {"id": user.id, "email": user.email, "token": token}


@app.get("/me", response_model=UserOut, response_model_exclude_unset=True)
async def me(user: Annotated[User, Depends(get_user)]):
    return user


@app.get("/products", response_model=list[ProductResponse])
async def products(db: DBSession, user: Annotated[User, Depends(get_user)]):
    # db.add(Product(name="office", description="office desc", price=100, stock=10))
    # db.commit()
    return db.query(Product).all()


@app.get("/cart", response_model=CartOut)
async def cart(db: DBSession, user: Annotated[User, Depends(get_user)]):
    cart = db.query(Cart).where(Cart.user_id == user.id).first()
    if not cart:
        cart = Cart(user_id=user.id)
        db.add(cart)
        db.commit()
    return cart


@app.post("/cart", response_model=CartOut)
async def cart(db: DBSession, user: Annotated[User, Depends(get_user)], cart_data: CartIn):
    cart = db.query(Cart).where(Cart.user_id == user.id).first()
    if not cart:
        cart = Cart(user_id=user.id)
        db.add(cart)

    cart.items = cart_data.items
    db.commit()
    return cart
