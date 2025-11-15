⚡ Deadline Hell

A lightweight, fast, and fully functional web app designed to help university students survive their busiest assessment months.
Deadline Hell allows you to create, track, and visualize your assessments with a clean and simple interface.

Built by Alejandro Alonso López as a full-stack productivity tool.

------------------------------------------------
------------------------------------------------

🌐 Live Demo

Fully functional:
	•	User registration & login
	•	Add assessments
	•	Update progress bars
	•	Persistent database

  🚀 Features (Current Implementation)

✅ Add Assessments

Add a title and due date.
Stored instantly in MySQL, displayed on the dashboard.

✅ Progress Tracking

Each assessment has an interactive progress bar that updates live using a backend API.

✅ User Authentication
	•	Register
	•	Login
	•	Password hashing with bcrypt
	•	Session management
Fully working in the deployed version.

✅ Clean UI with Tailwind

Simple, fast, and mobile-friendly.

🔄 Automatic Reload

Refresh button to sync changes instantly.

------------------------------------------------
------------------------------------------------

🔧 Tech Stack

Frontend
	•	HTML
	•	TailwindCSS
	•	Vanilla JavaScript (ES Modules)
	•	LocalStorage helpers

Backend
	•	Node.js
	•	Express.js
	•	REST API architecture
	•	bcrypt secure authentication

Database
	•	MySQL
	•	Tables:
	•	users
	•	assessments

Other Tools
	•	Figma for UI planning
	•	Railway / Render (if you deployed there)
	•	GitHub for version control
	•	Organized modules & controller structure

------------------------------------------------
------------------------------------------------

📌 Features Not Implemented Yet (Future Updates)
	•	❌ Tasks page
	•	❌ Edit assessment


------------------------------------------------
------------------------------------------------

📁 Project Structure

/DeadlineHell
│
├── public/
│   ├── css/
│   ├── js/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── db.js
│   └── app.js
│
├── views/
│   ├── login.html
│   └── dashboard.html
│
└── README.md

------------------------------------------------
------------------------------------------------

📡 API Endpoints (Implemented)

POST /register

Create new account.

POST /login

Authenticate user.

POST /addAssessment

Insert new assessment.

POST /addProgress

Update progress value.
------------------------------------------------
------------------------------------------------


🔐 Authentication

Using:
	•	bcrypt hashing
	•	Express sessions
	•	Secure credential handling

------------------------------------------------
------------------------------------------------  

👤 Author

Alejandro Alonso López
Full-Stack Developer • AI & Web Development
Aberdeen, Scotland

