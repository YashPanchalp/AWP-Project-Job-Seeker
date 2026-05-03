# Job Seeker Web Application

A complete full-stack web application for connecting job seekers with companies. Built with AngularJS frontend, Node.js/Express backend, and MongoDB database.

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Installation & Setup](#installation--setup)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Database Schema](#database-schema)
9. [User Roles & Features](#user-roles--features)
10. [Troubleshooting](#troubleshooting)

## ✨ Features

### Authentication & Authorization
- **JWT-based authentication** for secure login/logout
- **Role-based access control** (Job Seeker & Company Admin)
- **Password hashing** using bcryptjs
- **Session management** with localStorage

### Job Seeker Features
1. **Browse Jobs**
   - View all available job postings
   - Search and filter by role, company, skills, location
   - View detailed job information

2. **Apply for Jobs**
   - Apply with auto-filled profile information
   - Submit cover letters
   - Provide additional information as required by company

3. **Track Applications**
   - View all submitted applications
   - Track application status (Applied, Shortlisted, Rejected, Accepted)
   - See application history

4. **Manage Profile**
   - Update personal information
   - Add/edit qualifications, skills, experience
   - Save profile for quick job applications

### Company Admin Features
1. **Post Jobs**
   - Create new job listings
   - Specify required skills and job details
   - Set salary and job type

2. **Manage Jobs**
   - Edit existing job postings
   - Delete inactive jobs
   - Activate/deactivate job listings

3. **Review Applicants**
   - View all applicants for each job
   - See full applicant profiles
   - Change application status (Shortlist, Reject, Accept)

---

## 🛠 Tech Stack

### Frontend
- **AngularJS 1.8.2** - Frontend framework
- **HTML5** - Markup
- **CSS3** - Styling (Custom responsive design)
- **Vanilla JavaScript** - No additional libraries

### Backend
- **Node.js** - Runtime
- **Express.js 4.18** - Web framework
- **Mongoose 7.0** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Database
- **MongoDB** - NoSQL database

---

## 📦 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or cloud) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

### Optional
- **MongoDB Compass** for GUI database management
- **Postman** for API testing

---

## 💾 Installation & Setup

### Step 1: Clone/Extract Project
```bash
cd "c:\Users\776ya\Home\Desktop\awp project"
```

### Step 2: Setup Backend

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables
Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-seeker-app
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
NODE_ENV=development
```

**Important for Production:**
- Change `JWT_SECRET` to a strong random string
- Update `MONGODB_URI` if using remote MongoDB
- Set `NODE_ENV=production`

#### 2.3 Ensure MongoDB is Running
```bash
# On Windows (if installed locally)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI to your Atlas connection string
```

### Step 3: Setup Frontend

The frontend runs as static files. No build process required!

#### 3.1 Update API URL (if needed)
If backend is not on `localhost:5000`, update in:
- `frontend/js/services/auth.service.js`
- `frontend/js/services/job.service.js`
- `frontend/js/services/application.service.js`
- `frontend/js/services/profile.service.js`

Change:
```javascript
const API_URL = 'http://localhost:5000/api';
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
# From backend directory
cd backend

# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:
```
Server running on port 5000
Environment: development
MongoDB Connected: localhost
```

### Start Frontend

Open in web browser:
```
file:///path/to/frontend/index.html
```

Or use a simple HTTP server:

**Using Python:**
```bash
cd frontend
python -m http.server 8000
# Then visit: http://localhost:8000
```

**Using Node.js:**
```bash
cd frontend
npx http-server
# Then visit: http://localhost:8080
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
```

### Jobs
```
GET    /api/jobs               - Get all jobs (with filters)
GET    /api/jobs/:id           - Get job details
POST   /api/jobs               - Create job (admin only)
PUT    /api/jobs/:id           - Update job (admin only)
DELETE /api/jobs/:id           - Delete job (admin only)
GET    /api/jobs/admin/my-jobs/stats - Get admin's jobs with stats
```

### Applications
```
POST   /api/applications/apply                - Submit application
GET    /api/applications/my-applications      - Get user's applications
GET    /api/applications/job/:jobId/applicants - Get applicants (admin)
PUT    /api/applications/:applicationId/status - Update status (admin)
```

### Profile
```
GET    /api/profile             - Get user profile
PUT    /api/profile             - Update user profile
```

### Health Check
```
GET    /health                  - Server health check
```

---

## 💾 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (jobseeker/admin),
  qualification: String,
  skills: [String],
  experience: String,
  phone: String,
  location: String,
  resume: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  companyName: String,
  description: String,
  skillsRequired: [String],
  location: String,
  salary: String,
  jobType: String (Full-time/Part-time/Contract/Internship),
  createdBy: ObjectId (ref: User),
  extraFields: Object,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Applications Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  jobId: ObjectId (ref: Job),
  status: String (Applied/Shortlisted/Rejected/Accepted),
  appliedData: {
    name: String,
    email: String,
    phone: String,
    qualification: String,
    skills: [String],
    experience: String,
    location: String,
    extraData: Object
  },
  coverLetter: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 👥 User Roles & Features

### Job Seeker
1. Browse all job listings
2. Search and filter jobs
3. Apply for jobs
4. Track application status
5. Manage profile information
6. Update skills and experience

**Access Routes:**
- `/login` → `/jobs` → `/jobs/:id` → `/apply/:jobId`
- `/my-applications`
- `/profile`

### Company Admin
1. Post new job openings
2. Edit/delete job postings
3. View all applicants per job
4. Review applicant profiles
5. Update application status
6. Dashboard with job statistics

**Access Routes:**
- `/login` → `/admin/dashboard`
- `/admin/post-job`
- `/admin/jobs/:id/edit`
- `/admin/jobs/:id/applicants`

---

## 🧪 Testing the Application

### Test Account Credentials

#### Job Seeker Account
```
Email: jobseeker@example.com
Password: password123
(or create a new account during registration)
```

#### Admin Account
```
Email: admin@example.com
Password: password123
(or create a new account during registration)
```

### Testing Workflow

#### 1. Job Seeker Workflow
1. Register/Login as Job Seeker
2. Browse jobs on `/jobs`
3. Click on a job to view details
4. Click "Apply Now"
5. Review auto-filled profile
6. Add cover letter and submit
7. View application status on `/my-applications`
8. Update profile on `/profile`

#### 2. Admin Workflow
1. Register/Login as Company Admin
2. Go to `/admin/dashboard`
3. Post a new job
4. Edit job details
5. View applicants for a job
6. Update applicant status

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Try MongoDB Atlas for cloud database

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:**
- Ensure backend is running on port 5000
- Check CORS is enabled in `server.js`
- Update API_URL in frontend services

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or change PORT in .env
```

### Frontend Routing Issues
```
Route not working / Page not loading
```
**Solution:**
- Ensure you're using `file://` or `http://` protocol
- Don't open HTML directly in some browsers
- Use a simple HTTP server (see Running Application)

### Authentication Failures
```
Token is not valid / 401 Unauthorized
```
**Solution:**
- Clear localStorage: `localStorage.clear()`
- Login again
- Check JWT_SECRET matches between server and client

### Database Errors
```
Cannot read property 'name' of null
```
**Solution:**
- Check data in MongoDB
- Ensure models match schema
- Run database migrations if needed

---

## 📚 Additional Resources

### API Request Examples

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "role": "jobseeker"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get All Jobs:**
```bash
curl -X GET "http://localhost:5000/api/jobs?role=Engineer&location=NewYork"
```

**Apply for Job:**
```bash
curl -X POST http://localhost:5000/api/applications/apply \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "JOB_ID",
    "coverLetter": "I am interested in this position..."
  }'
```

---

## 📝 Notes

- **JWT Expiry:** Tokens expire in 7 days (configurable in `.env`)
- **Password Security:** Passwords are hashed with bcryptjs (10 rounds)
- **Database Indexes:** Compound index on (userId, jobId) prevents duplicate applications
- **CORS:** Enabled for all origins (update for production)

---

## 🤝 Support

For issues or questions:
1. Check troubleshooting section
2. Review browser console for errors
3. Check backend logs in terminal
4. Verify database connection

---

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Job Hunting!** 🚀
#   A W P - P r o j e c t - J o b - S e e k e r 
 
 
