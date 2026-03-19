# Maintenance Tracker App

A simple full-stack app to manage maintenance tasks for equipment (service, breakdowns, repairs).

---

## Live

- Frontend: https://maintenance-tracker-app-zeta.vercel.app/
- Backend: https://maintenance-tracker-app-rq42.onrender.com/tasks

---

## Tech Stack

- Frontend: JavaScript, HTML, CSS, Webpack  
- Backend: Node.js, Express  
- Database: MongoDB Atlas  
- Deployment: Vercel + Render  

---

## Features

- Add, edit, delete tasks  
- Track status (open / in-progress / done)  
- Set priority and type  
- Add notes  

---

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/maintenance-tracker-app.git
cd maintenance-tracker-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

#### Database Setup (MongoDB Atlas)

This project uses MongoDB Atlas (cloud database).

Steps:
	1.	Create a free cluster on MongoDB Atlas
	2.	Create a database user
	3.	Get your connection string

Example:

mongodb+srv://username:password@cluster.mongodb.net/maintenance-app

### Environment Variables

Rename .env.example to .env inside the /backend folder and add:

MONGODB_URI=your_mongodb_connection_string
PORT=3000
FRONTEND_URL=http://localhost:8080

### Start Backend

```bash
npm start
```
Backend runs on:
http://localhost:3000

⸻

## 3. Setup Frontend

Open a new terminal:
```bash
cd frontend
npm install
npm run build:dev
```

Frontend runs on:
http://localhost:8080

⸻


⸻

## Challenges & Learnings
	•	Handling CORS between Vercel (frontend) and Render (backend)
	•	Structuring a full-stack app (frontend + backend separation)
	•	Managing environment variables securely
	•	Connecting Node.js to MongoDB Atlas
	•	Debugging API errors and async flows

⸻

## Future Improvements
	•	Authentication (user accounts)
	•	Search & filtering
	•	Improved UI/UX
	•	Pagination
	•	Mobile responsiveness

⸻

## Author

Sébastien Champeau
	•	GitHub: https://github.com/buildwithseb
	
⸻

## Show your support

If you like this project, give it a ⭐️ on GitHub!