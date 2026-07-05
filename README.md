# 🚀 TeamFlow - Project Management System

## 📌 Overview

TeamFlow is a Project Management System developed using FastAPI, SQLAlchemy, SQLite, HTML, CSS, JavaScript, and Bootstrap.

The application allows users to register, log in securely, manage projects, and organize tasks through a clean and responsive web interface.

---

# ✨ Features

## Authentication
- User Registration
- Secure Login
- JWT Authentication
- Password Hashing using Bcrypt

## Dashboard
- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks
- Recent Projects
- Recent Tasks

## Project Management
- Add Project
- View Projects
- Update Project
- Delete Project

## Task Management
- Add Task
- View Tasks
- Edit Task
- Delete Task
- Search Tasks
- Filter by Status
- Filter by Priority

---

# 🛠 Technology Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib (Bcrypt)

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5

---

# 📁 Project Structure

```
TeamFlow/
│
├── backend/
│   ├── app.py
│   ├── auth.py
│   ├── crud.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── routers/
│   └── requirements.txt
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── projects.html
│   ├── tasks.html
│   ├── css/
│   └── js/
│
├── database/
│   └── teamflow.db
│
└── README.md
```

---

# 🗄 Database Design

## User

| Field | Type |
|--------|------|
| id | Integer |
| name | String |
| email | String |
| password | String |

## Project

| Field | Type |
|--------|------|
| id | Integer |
| title | String |
| description | Text |

## Task

| Field | Type |
|--------|------|
| id | Integer |
| title | String |
| description | Text |
| priority | String |
| status | String |
| due_date | Date |
| project_id | Integer |
| assignee_id | Integer |

---

# 🔗 API Endpoints

## Users

POST /users/

POST /users/login

GET /users/

---

## Projects

GET /projects/

POST /projects/

PUT /projects/{id}

DELETE /projects/{id}

---

## Tasks

GET /tasks/

POST /tasks/

PUT /tasks/{id}

DELETE /tasks/{id}

---

# ▶️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Start Backend

```bash
uvicorn app:app --reload
```

## Start Frontend

Open login.html using Live Server.

---

# 🔐 Authentication

JWT Token Authentication is used.

Passwords are encrypted using Bcrypt before storing them in the database.

---

# 🚀 Future Enhancements

- Role Based Access Control
- Email Notifications
- File Attachments
- Project Analytics Dashboard
- Charts & Reports
- Team Collaboration
- Comments on Tasks
- Task Deadlines & Reminders

---

# 👨‍💻 Developed By

**Pranay Kumar**

B.Tech CSE (Data Science)

FastAPI | SQL | Python | JavaScript | HTML | CSS | Bootstrap