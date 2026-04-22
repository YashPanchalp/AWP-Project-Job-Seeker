# 📁 Project File Structure & Navigation Guide

## Complete Directory Tree

```
job-seeker-app (Root)
│
├── 📄 README.md                          (Main Documentation - READ THIS FIRST!)
├── 📄 QUICK_START.md                     (5-minute Setup Guide)
├── 📄 SETUP_CHECKLIST.md                 (Step-by-step Verification)
├── 📄 COMPLETE_BUILD_SUMMARY.md          (What's Included - THIS FILE)
├── 📄 SAMPLE_DATA.md                     (Database Seeding Instructions)
│
└── 📁 backend/                           (Node.js/Express Server)
    │
    ├── 📄 server.js                      (Main Server Entry Point)
    ├── 📄 package.json                   (Dependencies & Scripts)
    ├── 📄 .env                           (Environment Configuration)
    ├── 📁 node_modules/                  (After npm install)
    │
    ├── 📁 config/
    │   └── 📄 database.js                (MongoDB Connection)
    │
    ├── 📁 middleware/
    │   ├── 📄 auth.js                    (JWT Verification)
    │   └── 📄 adminAuth.js               (Admin Role Check)
    │
    ├── 📁 models/                        (Mongoose Schemas)
    │   ├── 📄 User.js                    (User Schema)
    │   ├── 📄 Job.js                     (Job Posting Schema)
    │   └── 📄 Application.js             (Job Application Schema)
    │
    ├── 📁 controllers/                   (Business Logic)
    │   ├── 📄 authController.js          (Register/Login)
    │   ├── 📄 jobController.js           (Job Management)
    │   ├── 📄 applicationController.js   (Application Handling)
    │   └── 📄 profileController.js       (User Profiles)
    │
    └── 📁 routes/                        (API Endpoints)
        ├── 📄 auth.js                    (Auth Routes)
        ├── 📄 jobs.js                    (Job Routes)
        ├── 📄 applications.js            (Application Routes)
        └── 📄 profile.js                 (Profile Routes)
│
└── 📁 frontend/                          (AngularJS Client)
    │
    ├── 📄 index.html                     (Main HTML File)
    │
    ├── 📁 js/                            (JavaScript)
    │   ├── 📄 app.js                     (AngularJS App & Routes)
    │   │
    │   ├── 📁 services/                  (API Communication)
    │   │   ├── 📄 auth.service.js        (Auth API)
    │   │   ├── 📄 job.service.js         (Job API)
    │   │   ├── 📄 application.service.js (Application API)
    │   │   └── 📄 profile.service.js     (Profile API)
    │   │
    │   └── 📁 controllers/               (Page Logic)
    │       ├── 📄 auth.controller.js     (Login/Register)
    │       ├── 📄 job.controller.js      (Job Pages)
    │       ├── 📄 application.controller.js (Application Pages)
    │       ├── 📄 profile.controller.js  (Profile Page)
    │       ├── 📄 admin.controller.js    (Admin Pages)
    │       └── 📄 applicants.controller.js (Applicants Page)
    │
    ├── 📁 views/                         (HTML Templates)
    │   │
    │   ├── 📁 auth/                      (Authentication Pages)
    │   │   ├── 📄 login.html
    │   │   └── 📄 register.html
    │   │
    │   ├── 📁 jobseeker/                 (Job Seeker Pages)
    │   │   ├── 📄 job-listings.html      (Browse Jobs)
    │   │   ├── 📄 job-detail.html        (Job Details)
    │   │   ├── 📄 apply-job.html         (Application Form)
    │   │   ├── 📄 my-applications.html   (Track Applications)
    │   │   └── 📄 profile.html           (User Profile)
    │   │
    │   └── 📁 admin/                     (Admin Pages)
    │       ├── 📄 dashboard.html         (Admin Dashboard)
    │       ├── 📄 post-job.html          (Post New Job)
    │       ├── 📄 edit-job.html          (Edit Job)
    │       └── 📄 applicants.html        (View Applicants)
    │
    └── 📁 css/
        └── 📄 style.css                  (Global Styles)
```

---

## 📊 File Statistics

### Backend Files
```
Controllers:    4 files  (auth, job, application, profile)
Models:         3 files  (User, Job, Application)
Routes:         4 files  (auth, jobs, applications, profile)
Middleware:     2 files  (auth, adminAuth)
Config:         1 file   (database)
Main:           2 files  (server.js, package.json, .env)
─────────────────────────
Total:         16 Files
```

### Frontend Files
```
App:            1 file   (app.js)
Services:       4 files  (auth, job, application, profile)
Controllers:    6 files  (auth, job, application, profile, admin, applicants)
Views:         13 files  (auth, jobseeker, admin)
CSS:            1 file   (style.css)
HTML:           1 file   (index.html)
─────────────────────────
Total:         26 Files
```

### Documentation
```
Main:           1 file   (README.md)
Quick Start:    1 file   (QUICK_START.md)
Setup:          1 file   (SETUP_CHECKLIST.md)
Summary:        1 file   (COMPLETE_BUILD_SUMMARY.md)
Sample Data:    1 file   (SAMPLE_DATA.md)
─────────────────────────
Total:          5 Files
```

**GRAND TOTAL: 47 Files**

---

## 🗺️ Navigation Guide

### To Understand the Application
1. Start with: **README.md**
2. Then read: **COMPLETE_BUILD_SUMMARY.md**
3. For setup: **QUICK_START.md**

### To Set Up the Application
1. Follow: **QUICK_START.md**
2. Verify with: **SETUP_CHECKLIST.md**
3. Reference: **SAMPLE_DATA.md** for test data

### To Modify the Application

#### Add a New API Endpoint
1. Create controller method in `backend/controllers/`
2. Create route in `backend/routes/`
3. Create service in `frontend/js/services/`
4. Use in controller in `frontend/js/controllers/`

#### Add a New Database Field
1. Update `backend/models/` schema
2. Update form in `frontend/views/`
3. Update controller in `frontend/js/controllers/`

#### Modify Styling
1. Edit: `frontend/css/style.css`
2. All styles in one file for easy customization

#### Add a New Page
1. Create view in `frontend/views/`
2. Create controller in `frontend/js/controllers/`
3. Add route in `frontend/js/app.js`

---

## 🔍 Finding Things Quickly

### I need to...

**Change the login logic:**
→ `backend/controllers/authController.js`
→ `frontend/js/controllers/auth.controller.js`

**Add/remove job fields:**
→ `backend/models/Job.js`
→ `frontend/views/admin/post-job.html`
→ `frontend/js/controllers/admin.controller.js`

**Change the color scheme:**
→ `frontend/css/style.css` (search for colors)

**Add a new API endpoint:**
→ `backend/routes/` (create route)
→ `backend/controllers/` (add controller method)
→ `frontend/js/services/` (add service call)

**Fix database connection:**
→ `backend/.env` (check MONGODB_URI)
→ `backend/config/database.js` (connection logic)

**Change API base URL:**
→ `frontend/js/services/` (all 4 service files)

**Debug the backend:**
→ `backend/server.js` (main server)
→ Check logs in terminal

**Debug the frontend:**
→ Browser Console (F12)
→ Network tab (API calls)

---

## 📱 Page Mapping

### Job Seeker User Flow
```
/login
    ↓
/jobs (Dashboard)
    ├→ /jobs/:id (View Details)
    │   └→ /apply/:jobId (Apply)
    ├→ /my-applications (Track)
    └→ /profile (Edit Profile)
```

### Admin User Flow
```
/login
    ↓
/admin/dashboard
    ├→ /admin/post-job (Create)
    ├→ /admin/jobs/:id/edit (Modify)
    └→ /admin/jobs/:id/applicants (Review)
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      BROWSER (Frontend)                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ HTML Views (frontend/views/)                               │ │
│  │ ↓                                                           │ │
│  │ Controllers (frontend/js/controllers/)                     │ │
│  │ ↓                                                           │ │
│  │ Services (frontend/js/services/)                           │ │
│  │ HTTP Requests ↔ AngularJS HTTP Interceptor               │ │
│  └────────────────────────────────────────────────────────────┘ │
│           ↕ HTTP (REST API calls) ↕                             │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                  NODE.js/EXPRESS SERVER                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Routes (backend/routes/)                                   │ │
│  │ ↓                                                           │ │
│  │ Middleware (backend/middleware/)                           │ │
│  │ ↓                                                           │ │
│  │ Controllers (backend/controllers/)                         │ │
│  │ ↓                                                           │ │
│  │ Models (backend/models/)                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│           ↕ Database Operations ↕                               │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      MONGODB DATABASE                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Collections:                                               │ │
│  │ • users (login, profiles)                                 │ │
│  │ • jobs (job postings)                                     │ │
│  │ • applications (job applications)                         │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💾 Important Files Reference

| File | Purpose | Edit When |
|------|---------|-----------|
| `backend/.env` | Config | Change ports, database URL |
| `backend/server.js` | Main server | Add new routes, middleware |
| `backend/models/User.js` | User schema | Add user fields |
| `frontend/js/app.js` | Routes, app config | Add new pages/routes |
| `frontend/css/style.css` | Styling | Change colors, layout |
| `frontend/index.html` | HTML layout | Change navbar, scripts |

---

## 🎯 Quick Commands

```bash
# Start backend
cd backend && npm run dev

# Start frontend (Python)
cd frontend && python -m http.server 8000

# Start frontend (Node)
cd frontend && npx http-server

# Install backend dependencies
cd backend && npm install

# Access application
http://localhost:8000 (or 8080 with http-server)

# Access API
http://localhost:5000/api/

# Check health
curl http://localhost:5000/health

# MongoDB shell
mongosh
use job-seeker-app
db.users.find()
```

---

## 📚 Learning Path

### For Beginners
1. Read README.md
2. Follow QUICK_START.md
3. Play with the UI
4. Check browser console (F12)
5. Read SAMPLE_DATA.md

### For Developers
1. Review backend/server.js
2. Understand models in backend/models/
3. Check controllers in backend/controllers/
4. Review frontend app structure
5. Study service layer for API calls

### For DevOps
1. Check backend/.env
2. Review database configuration
3. Understand deployment needs
4. Check error handling
5. Review security features

---

## ✨ Key Features Location

| Feature | Files |
|---------|-------|
| JWT Auth | authController.js, auth.js middleware |
| Password Hashing | authController.js (bcryptjs) |
| Role-based Access | adminAuth.js, routes |
| Job Posting | jobController.js, post-job.html |
| Job Application | applicationController.js, apply-job.html |
| Profile Management | profileController.js, profile.html |
| Form Validation | All controllers, all views |
| Responsive Design | style.css (CSS Grid) |
| Error Handling | All controllers, services |
| Loading States | All controllers, all views |

---

## 🚀 Ready to Use!

All files are organized and ready. Start with:
1. **QUICK_START.md** - Get running in 5 minutes
2. **README.md** - Full documentation
3. **SETUP_CHECKLIST.md** - Verify everything works

---

*Last Updated: April 22, 2026*
*Status: Complete and Production-Ready ✅*
