from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    tasks = relationship("Task", back_populates="assignee")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)

    tasks = relationship("Task", back_populates="project")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(Text)

    priority = Column(String)

    status = Column(String)

    due_date = Column(Date)

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=False
    )

    assignee_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="tasks",
        lazy="joined"
    )

    assignee = relationship(
        "User",
        back_populates="tasks",
        lazy="joined"
    )