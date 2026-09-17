# Placement Management System

A web-based application for managing student placement data — Students, Companies, and Placements — built with Django REST Framework on the backend and vanilla JavaScript on the frontend.

## Features

- Full CRUD (Create, Read, Update, Delete) for Students, Companies, and Placements
- REST API built with Django REST Framework
- Frontend fetches and displays data live from the API using JavaScript `fetch()`
- Placement form uses dropdowns (populated from live API data) to link a Student and Company by name instead of raw IDs
- SQLite database, no external services required

## Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Backend    | Python, Django, Django REST Framework |
| Database   | SQLite                               |
| Frontend   | HTML, CSS, JavaScript (fetch API)    |
| Dev Tool   | Visual Studio Code                   |

## Project Structure


PlacementManagementSystem/
└── backend/
├── manage.py
├── db.sqlite3
├── backend/
│ ├── settings.py
│ ├── urls.py
│ ├── asgi.py
│ └── wsgi.py
└── placement/
├── migrations/
├── static/placement/
│ ├── app.js
│ └── style.css
├── templates/
│ └── index.html
├── models.py
├── serializers.py
├── views.py
├── urls.py
└── admin.py


## Setup Instructions

1. **Clone or download the project**, then navigate to the backend folder:
```bash
   cd PlacementManagementSystem/backend
```

2. **Create and activate a virtual environment**
```bash
   python -m venv venv
   venv\Scripts\Activate.ps1        # Windows PowerShell
   # source venv/bin/activate       # macOS/Linux
```

3. **Install dependencies**
```bash
   pip install django djangorestframework
```

4. **Apply migrations**
```bash
   python manage.py migrate
```

5. **Run the development server**
```bash
   python manage.py runserver
```

6. **Open the app** in your browser:

http://127.0.0.1:8000/


## API Endpoints

| Endpoint                    | Method | Description              |
|------------------------------|--------|---------------------------|
| `/api/students/`             | GET    | List all students         |
| `/api/students/`             | POST   | Create a new student       |
| `/api/students/<id>/`        | GET    | Retrieve one student       |
| `/api/students/<id>/`        | PUT    | Update a student           |
| `/api/students/<id>/`        | DELETE | Delete a student           |
| `/api/companies/`            | GET / POST | List / create companies |
| `/api/companies/<id>/`       | GET / PUT / DELETE | Manage one company |
| `/api/placements/`           | GET / POST | List / create placements |
| `/api/placements/<id>/`      | GET / PUT / DELETE | Manage one placement |

## Data Models

**Student:** Name, Email, Phone, Department, Year, CGPA, Skills

**Company:** Company Name, Location, Job Role, Package, Eligibility CGPA

**Placement:** Placement Date, Status, Student (FK), Company (FK)

## Notes

- `DEBUG = True` and open `ALLOWED_HOSTS` in `settings.py` are configured for **local development only**. Update these before any public deployment.
- CSRF/authentication is disabled on the DRF API (`DEFAULT_AUTHENTICATION_CLASSES: []`) to simplify local testing from the JavaScript frontend. Re-enable proper authentication before deploying beyond localhost.

## Future Improvements

- Search/filter on each table
- Pagination for large datasets
- User authentication (admin login to manage records)
- Export data to CSV/PDF