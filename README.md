# Maintenance Tracker App

<br>

A simple full-stack app to manage maintenance tasks for equipment (service, breakdowns, repairs).

<br>

## Live

- Frontend: https://maintenance-tracker-app-zeta.vercel.app/
- Backend: https://maintenance-tracker-app-rq42.onrender.com/tasks

<br>

## Tech Stack

- Frontend: JavaScript, HTML, CSS, Webpack  
- Backend: Node.js, Express  
- Database: MongoDB Atlas  
- Deployment: Vercel + Render  

<br>

## Features

- Add, edit, delete tasks  
- Track status (open / in-progress / done)  
- Set priority and type  
- Add notes  

<br>

## Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/buildwithseb/maintenance-tracker-app.git
cd maintenance-tracker-app
```

<br>

### 2. Set Up the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Configure the `.env` file with your MongoDB Atlas connection string:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
FRONTEND_URL=http://localhost:8081
```

> This project uses MongoDB Atlas. You will need a MongoDB Atlas cluster, database user, and connection string.

Start the backend:

```bash
npm start
```

The API will run at `http://localhost:3000`.

<br>

### 3. Set Up the Frontend

Open a new terminal from the project root:

```bash
cd frontend
npm install
cp .env.example .env
```

Configure the frontend `.env`:

```env
API_URL=http://localhost:3000
```

Then start the development server:

```bash
npm run build:dev
```

The application will run at `http://localhost:8081`.

<br>

## Challenges & Learnings

Through this project, I gained practical experience with:

- Configuring CORS between separately deployed frontend and backend applications
- Structuring a full-stack application with separate frontend and backend services
- Managing environment variables across development and production environments
- Connecting a Node.js/Express backend to MongoDB Atlas
- Debugging REST API requests and asynchronous JavaScript

<br>

## Future Improvements

- User authentication and accounts
- Search and filtering
- Improved UI/UX and form validation
- Mobile responsiveness

<br>

## Author

**Sebastien Champeau**

GitHub: [github.com/buildwithseb](https://github.com/buildwithseb)
	
