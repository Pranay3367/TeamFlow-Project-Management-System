from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth import create_access_token

import crud
import schemas
from database import get_db

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)


@router.get("/", response_model=list[schemas.UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    return crud.get_users(db)
@router.post("/login",
             response_model=schemas.TokenResponse)
def login(user: schemas.LoginRequest,
          db: Session = Depends(get_db)):

    db_user = crud.login_user(
        db,
        user.email,
        user.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }