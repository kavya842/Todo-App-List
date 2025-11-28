# Todo App

A simple to-do list application built with Node.js, Express, and vanilla JavaScript.

## Features

- Add new todos
- View all todos
- Delete todos

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```

## Usage

Start the server:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

Open your browser and go to `http://localhost:3000`

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Add a new todo
- `DELETE /api/todos/:id` - Delete a todo by ID
