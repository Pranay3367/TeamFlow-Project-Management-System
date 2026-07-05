from pydantic import BaseModel, EmailStr
from datetime import date


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True
class ProjectCreate(BaseModel):
    title: str
    description: str


class ProjectUpdate(BaseModel):
    title: str
    description: str


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        from_attributes = True
from datetime import date

class TaskCreate(BaseModel):
    title: str
    description: str
    priority: str
    status: str
    due_date: date
    project_id: int
    assignee_id: int


class TaskUpdate(BaseModel):
    title: str
    description: str
    priority: str
    status: str
    due_date: date
    project_id: int
    assignee_id: int

class ProjectMini(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True


class UserMini(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class TaskResponse(BaseModel):

    id: int

    title: str

    description: str

    priority: str

    status: str

    due_date: date

    project: ProjectMini

    assignee: UserMini

    class Config:
        from_attributes = True

    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str