from sqlalchemy.orm import Session
import models
import schemas
from auth import hash_password
from auth import verify_password

def login_user(db: Session, email: str, password: str):

    user = db.query(models.User).filter(
        models.User.email == email
    ).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)

    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_users(db: Session):
    return db.query(models.User).all()
def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = models.Project(
        title=project.title,
        description=project.description
    )

    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    return db_project


def get_projects(db: Session):
    return db.query(models.Project).all()


def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(
        models.Project.id == project_id
    ).first()
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def update_project(db: Session, project_id: int, project: schemas.ProjectUpdate):
    db_project = get_project(db, project_id)

    if not db_project:
        return None

    db_project.title = project.title
    db_project.description = project.description

    db.commit()
    db.refresh(db_project)

    return db_project


def delete_project(db: Session, project_id: int):
    db_project = get_project(db, project_id)

    if not db_project:
        return None

    db.delete(db_project)
    db.commit()

    return {"message": "Project deleted successfully"}
def create_task(db: Session, task: schemas.TaskCreate):
    print("Incoming Task:", task)

    db_task = models.Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        status=task.status,
        due_date=task.due_date,
        project_id=task.project_id,
        assignee_id=task.assignee_id
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    print("Saved Task:", db_task.project_id, db_task.assignee_id)

    return db_task
from sqlalchemy.orm import joinedload


def get_tasks(db: Session):

    return db.query(models.Task).options(

        joinedload(models.Task.project),

        joinedload(models.Task.assignee)

    ).all()
def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(
        models.Task.id == task_id
    ).first()
def update_task(db: Session, task_id: int, task: schemas.TaskUpdate):
    db_task = get_task(db, task_id)

    if not db_task:
        return None

    db_task.title = task.title
    db_task.description = task.description
    db_task.priority = task.priority
    db_task.status = task.status
    db_task.due_date = task.due_date
    db_task.project_id = task.project_id
    db_task.assignee_id = task.assignee_id

    db.commit()
    db.refresh(db_task)

    return db_task
def delete_task(db: Session, task_id: int):

    db_task = get_task(db, task_id)

    if not db_task:
        return None

    db.delete(db_task)
    db.commit()

    return {"message": "Task deleted successfully"}