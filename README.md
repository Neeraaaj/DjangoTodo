# Todo List Application

This is a simple Todo List application built with Python (Django) as the backend and React as the frontend.

## Features

- Add new todos with descriptions.
- Mark todos as completed or not completed.
- Delete todos.
- Edit existing todos.
- View a list of todos.

## Technologies Used

- **Backend:** Python, Django
- **Frontend:** React
- **Database:** SQLite (Default for Django)

## Setup Instructions

### Backend (Django)

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Create a virtual environment:

    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:

    - On Windows:

        ```bash
        .\venv\Scripts\activate
        ```

    - On Unix or MacOS:

        ```bash
        source venv/bin/activate
        ```

4. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5. Apply migrations:

    ```bash
    python manage.py migrate
    ```

6. Run the development server:

    ```bash
    python manage.py runserver
    ```

### Frontend (React)

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm start
    ```

4. Open your browser and visit `http://localhost:3000` to view the Todo List application.

## Contributing

Feel free to contribute by opening issues, suggesting enhancements, or submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

