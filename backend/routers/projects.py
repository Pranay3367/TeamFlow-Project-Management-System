from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.post("/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate,
                   db: Session = Depends(get_db)):
    return crud.create_project(db, project)


@router.get("/", response_model=list[schemas.ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return crud.get_projects(db)


@router.put("/{project_id}",
            response_model=schemas.ProjectResponse)
def update_project(project_id: int,
                   project: schemas.ProjectUpdate,
                   db: Session = Depends(get_db)):

    updated = crud.update_project(db, project_id, project)

    if not updated:
        raise HTTPException(status_code=404,
                            detail="Project not found")

    return updated


@router.delete("/{project_id}")
def delete_project(project_id: int,
                   db: Session = Depends(get_db)):

    deleted = crud.delete_project(db, project_id)

    if not deleted:
        raise HTTPException(status_code=404,
                            detail="Project not found")

    return deleted