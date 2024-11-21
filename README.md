MERN Task Manager
A simple task management application built with the **MERN** stack (MongoDB, Express, React, Node.js). This project allows users to create, update, and delete tasks, and marks tasks as completed or pending.
Features
- Create new tasks with titles and descriptions
- Mark tasks as completed or pending
- Edit task details (title, description, completed status)
- Delete tasks
- Fully RESTful API for managing tasks (Backend in Node.js and Express)
- Frontend built using React
Tech Stack
- **Frontend**: React, Axios (for API requests)
- **Backend**: Node.js, Express, Mongoose (for MongoDB integration)
- **Database**: MongoDB (MongoDB Atlas)
Installation
### 1. Clone the repository:
```bash
git clone https://github.com/your-username/mern-task-manager.git
cd mern-task-manager
```

### 2. Set up the backend:
- Go to the `backend` directory:
```bash
cd backend
```
- Install backend dependencies:
```bash
npm install
```
- Set up environment variables:
  - Create a `.env` file in the `backend` folder and add your MongoDB connection string:
  ```plaintext
  MONGO_URI=your_mongodb_connection_string
  ```
- Start the backend server:
```bash
npm run dev
```

### 3. Set up the frontend:
- Go to the `frontend` directory:
```bash
cd frontend
```
- Install frontend dependencies:
```bash
npm install
```
- Start the frontend development server:
```bash
npm start
```

### 4. Access the app:
Open your browser and go to `http://localhost:3000` to interact with the Task Manager.
API Endpoints
The backend exposes the following routes for managing tasks:

- **GET** `/api/tasks`: Get all tasks
- **POST** `/api/tasks`: Create a new task
- **PUT** `/api/tasks/:id`: Update a task by ID
- **DELETE** `/api/tasks/:id`: Delete a task by ID
  
Contributing
Feel free to fork the repository, open issues, or submit pull requests. Any contributions are welcome!

Acknowledgments
Thanks to the creators of the MERN stack for making it easy to build full-stack applications.
MongoDB Atlas for hosting the database.
![image](https://github.com/user-attachments/assets/e6f4b781-6a68-4660-b10b-afda813d62fd)
