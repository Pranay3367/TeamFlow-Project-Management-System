from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.post("/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate,
                db: Session = Depends(get_db)):
    return crud.create_task(db, task)


@router.get("/", response_model=list[schemas.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db)


@router.put("/{task_id}",
            response_model=schemas.TaskResponse)
def update_task(task_id: int,
                task: schemas.TaskUpdate,
                db: Session = Depends(get_db)):

    updated = crud.update_task(db, task_id, task)

    if not updated:
        raise HTTPException(status_code=404,
                            detail="Task not found")

    return updated


@router.delete("/{task_id}")
def delete_task(task_id: int,
                db: Session = Depends(get_db)):

    deleted = crud.delete_task(db, task_id)

    if not deleted:
        raise HTTPException(status_code=404,
                            detail="Task not found")

    return deleted