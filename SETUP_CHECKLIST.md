# 📋 Installation & Setup Checklist

## ✅ Pre-Installation

- [ ] Node.js installed (v14+)
- [ ] npm installed
- [ ] MongoDB installed or Atlas account created
- [ ] Code editor ready (VS Code recommended)
- [ ] Internet connection available

---

## ✅ Backend Setup

### 1. Navigate to Backend Directory
```bash
cd "c:\Users\776ya\Home\Desktop\awp project\backend"
```

### 2. Install Dependencies
```bash
npm install
```
- [ ] All packages installed successfully
- [ ] node_modules folder created
- [ ] package-lock.json generated

### 3. Configure Environment Variables
Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-seeker-app
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
NODE_ENV=development
```

Checklist:
- [ ] .env file edited
- [ ] PORT set to 5000
- [ ] MONGODB_URI configured
- [ ] JWT_SECRET set to unique value
- [ ] NODE_ENV set to development

### 4. Start MongoDB
**Option A: Local MongoDB**
```bash
mongod
```
- [ ] MongoDB service started
- [ ] Connected on port 27017

**Option B: MongoDB Atlas**
- [ ] Account created on Atlas
- [ ] Cluster created
- [ ] Connection string copied
- [ ] .env MONGODB_URI updated with Atlas string

### 5. Start Backend Server
```bash
npm run dev
```

Expected output:
```
Server running on port 5000
Environment: development
MongoDB Connected: localhost
```

- [ ] Server started successfully
- [ ] MongoDB connection confirmed
- [ ] No error messages in console

### 6. Test Backend (Optional)
Open another terminal and test:
```bash
curl http://localhost:5000/health
```
Expected response:
```json
{"message":"Server is running"}
```

- [ ] Health check passed
- [ ] Backend is functional

---

## ✅ Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd "c:\Users\776ya\Home\Desktop\awp project\frontend"
```

### 2. Verify API Configuration
Check that services are configured for correct backend:
- [ ] `js/services/auth.service.js` - API_URL = 'http://localhost:5000/api'
- [ ] `js/services/job.service.js` - API_URL = 'http://localhost:5000/api'
- [ ] `js/services/application.service.js` - API_URL = 'http://localhost:5000/api'
- [ ] `js/services/profile.service.js` - API_URL = 'http://localhost:5000/api'

### 3. Choose Your Server Method

#### Option A: Python HTTP Server
```bash
python -m http.server 8000
```
Then visit: http://localhost:8000
- [ ] Server started
- [ ] No errors in terminal
- [ ] Accessible in browser

#### Option B: Node.js HTTP Server
```bash
npx http-server
```
Then visit: http://localhost:8080
- [ ] Server started
- [ ] Output shows server address
- [ ] Accessible in browser

#### Option C: VS Code Live Server
- [ ] Install "Live Server" extension
- [ ] Right-click index.html
- [ ] Select "Open with Live Server"
- [ ] Page opens automatically
- [ ] No CORS errors in browser console

---

## ✅ Verify Application Works

### 1. Browser Check
- [ ] Application loads without errors
- [ ] Navigation bar visible
- [ ] Navbar shows "Login" and "Register" links
- [ ] No console errors (F12)
- [ ] No network errors (F12 → Network tab)

### 2. Test Registration
1. Click "Register"
2. Fill in form:
   - [ ] Name: Enter your name
   - [ ] Email: Enter valid email
   - [ ] Password: At least 6 characters
   - [ ] Confirm Password: Must match
   - [ ] Role: Select "Job Seeker"
3. Click "Register"
4. Verify:
   - [ ] Success message appears
   - [ ] Redirected to jobs page
   - [ ] Navbar shows user name
   - [ ] No error messages

### 3. Test Job Seeker Features
1. Browse Jobs:
   - [ ] Jobs page loads
   - [ ] Jobs displayed in cards
   - [ ] Filters visible (role, company, skills, location)
   - [ ] Filter button works

2. View Job Details:
   - [ ] Click on a job card
   - [ ] Details page loads
   - [ ] All job information visible
   - [ ] "Apply Now" button present

3. Apply for Job:
   - [ ] Click "Apply Now"
   - [ ] Application form loads
   - [ ] Profile data auto-filled
   - [ ] Can add cover letter
   - [ ] Submit button works
   - [ ] Success message shown
   - [ ] Redirected to applications

4. Check Applications:
   - [ ] Click "My Applications"
   - [ ] Table shows applied jobs
   - [ ] Status badge visible
   - [ ] Applied jobs listed

5. Update Profile:
   - [ ] Click "My Profile"
   - [ ] Profile information displayed
   - [ ] Edit button available
   - [ ] Can edit information
   - [ ] Can add/remove skills
   - [ ] Save works
   - [ ] Changes persist on reload

6. Logout:
   - [ ] Click "Logout" button
   - [ ] Redirected to login
   - [ ] Navbar no longer shows user info

### 4. Test Admin Features
1. Register Admin Account:
   - [ ] New registration with role = "Company Admin"
   - [ ] Success message
   - [ ] Login successful

2. Admin Dashboard:
   - [ ] Navbar shows different links
   - [ ] Dashboard shows job stats
   - [ ] "Post New Job" button visible

3. Post Job:
   - [ ] Click "Post New Job"
   - [ ] Form loads with all fields
   - [ ] Can add skills
   - [ ] Submit works
   - [ ] Job appears on dashboard
   - [ ] Applicants count shows

4. Edit Job:
   - [ ] Click "Edit" on a job
   - [ ] Form pre-filled with data
   - [ ] Can modify fields
   - [ ] Save updates job
   - [ ] Changes reflected on dashboard

5. View Applicants:
   - [ ] Click "View Applicants"
   - [ ] Applicants list displayed
   - [ ] Profile information visible
   - [ ] Status dropdown works
   - [ ] Can shortlist/reject applicants
   - [ ] Status updates immediately

6. Delete Job:
   - [ ] Click "Delete" on a job
   - [ ] Confirm dialog appears
   - [ ] Job removed from list
   - [ ] Applicants no longer view-able

---

## ✅ Database Verification

### Check Database is Created
```bash
# In MongoDB shell or MongoDB Compass
use job-seeker-app
db.users.find()
db.jobs.find()
db.applications.find()
```

- [ ] Database "job-seeker-app" created
- [ ] Collections exist:
  - [ ] users
  - [ ] jobs
  - [ ] applications
- [ ] Documents created during testing

---

## ✅ Optional: Populate Sample Data

1. Copy commands from `SAMPLE_DATA.md`
2. Paste into MongoDB shell
3. Verify data inserted:
   - [ ] Sample users in database
   - [ ] Sample jobs in database
   - [ ] Sample applications in database

---

## ✅ Common Issues & Solutions

### Backend Issues
- [ ] Port 5000 in use?
  - Change PORT in .env or kill process
- [ ] MongoDB not running?
  - Start mongod or use Atlas
- [ ] CORS errors?
  - Ensure CORS enabled in server.js
  - Frontend and backend on correct ports

### Frontend Issues
- [ ] Blank page loads?
  - Check console for errors
  - Verify files are loading (Network tab)
  - Check that backend is running
- [ ] Login fails?
  - Verify backend is running
  - Check API URL in services
  - Check MongoDB connection
- [ ] 404 errors?
  - Verify backend routes are correct
  - Check .env configuration
  - Restart backend server

### General Issues
- [ ] "Cannot find module" error
  - Run `npm install` in backend directory
- [ ] Files not updating
  - Hard refresh (Ctrl+F5) in browser
  - Clear browser cache
- [ ] Styling looks wrong
  - Verify style.css is linked in index.html
  - Check browser console for CSS errors

---

## ✅ Performance Verification

### Check Frontend Performance
1. Open Chrome DevTools (F12)
2. Network Tab:
   - [ ] All files load successfully
   - [ ] No 404 errors
   - [ ] Response times reasonable

3. Console Tab:
   - [ ] No JavaScript errors
   - [ ] No warning messages
   - [ ] API calls successful (200 status)

---

## ✅ Security Checklist

- [ ] Passwords are hashed (bcryptjs)
- [ ] JWT tokens used for auth
- [ ] CORS properly configured
- [ ] No sensitive data in localStorage (except token)
- [ ] Passwords not logged or exposed
- [ ] Admin routes protected
- [ ] User can only see own data

---

## ✅ Final Verification

- [ ] Backend running on port 5000
- [ ] Frontend accessible in browser
- [ ] Database connected
- [ ] All features tested
- [ ] No console errors
- [ ] Ready for production

---

## 🎯 You're All Set!

If all checkboxes are checked, your Job Seeker Web Application is:
- ✅ Fully installed
- ✅ Properly configured
- ✅ Successfully tested
- ✅ Ready to use

## 📚 Next Steps

1. **Explore Features** - Try all user functions
2. **Read Documentation** - See README.md for details
3. **Customize** - Modify styling and add features
4. **Integrate** - Connect to your systems
5. **Deploy** - Move to production

---

## 📞 Quick Reference

**Backend Start:**
```bash
cd backend && npm run dev
```

**Frontend Start (Python):**
```bash
cd frontend && python -m http.server 8000
```

**Frontend Start (Node):**
```bash
cd frontend && npx http-server
```

**MongoDB Start:**
```bash
mongod
```

**Check Health:**
```bash
curl http://localhost:5000/health
```

---

**Status: ✅ READY TO USE**

*Last Updated: April 22, 2026*
