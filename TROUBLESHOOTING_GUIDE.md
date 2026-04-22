# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### ❌ Backend Won't Start

#### Issue: "Error: listen EADDRINUSE :::5000"
**Problem:** Port 5000 is already in use

**Solutions:**
```bash
# Option 1: Kill the process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Option 2: Change port in backend/.env
PORT=3000

# Option 3: Kill the process (Mac/Linux)
lsof -i :5000
kill -9 <PID>
```

---

#### Issue: "Cannot find module 'express'"
**Problem:** Dependencies not installed

**Solution:**
```bash
cd backend
npm install
```

---

#### Issue: "MongooseError: Cannot connect to MongoDB"
**Problem:** MongoDB not running or wrong connection string

**Solutions:**
```bash
# Option 1: Start MongoDB
mongod

# Option 2: Verify connection string in .env
MONGODB_URI=mongodb://localhost:27017/job-seeker-app

# Option 3: Use MongoDB Atlas (cloud)
# Get your connection string from https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/job-seeker-app

# Option 4: Check if mongod service is running
# Windows: Check Services or use
net start MongoDB
```

---

#### Issue: "SyntaxError: Unexpected token" in .env file
**Problem:** Invalid .env format

**Solution:**
```env
# Correct format (no quotes needed unless value has spaces)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-seeker-app
JWT_SECRET=my_secret_key_123
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
NODE_ENV=development
```

---

### ❌ Frontend Won't Load

#### Issue: Blank white page / Nothing loads
**Problem:** Frontend server not running or files not found

**Solutions:**
```bash
# Check browser console (F12) for errors
# Verify frontend server is running:

# Option 1: Python server
cd frontend
python -m http.server 8000

# Option 2: Node.js server
cd frontend
npx http-server

# Option 3: VS Code Live Server
# Install "Live Server" extension
# Right-click index.html → "Open with Live Server"
```

---

#### Issue: "CORS error: No 'Access-Control-Allow-Origin' header"
**Problem:** Frontend and backend on different ports, CORS not configured

**Solutions:**
```bash
# Solution 1: Ensure backend is running on port 5000
cd backend && npm run dev

# Solution 2: Verify CORS is enabled in backend/server.js
# Should have: app.use(cors());

# Solution 3: Check API URL in frontend services
# frontend/js/services/*.service.js should have:
// const API_URL = 'http://localhost:5000/api';

# Solution 4: If still failing, add to backend/server.js:
app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true
}));
```

---

#### Issue: "Failed to load resource: 404 Not Found" in Network tab
**Problem:** Files not being served correctly

**Solutions:**
1. Verify frontend directory structure:
   - index.html in frontend/
   - js/ folder with files
   - css/ folder with style.css
   - views/ folder with HTML templates

2. Check paths are correct in index.html:
```html
<script src="js/app.js"></script>
<link rel="stylesheet" href="css/style.css">
```

3. Clear browser cache:
   - Press Ctrl+F5 (hard refresh)
   - Or Ctrl+Shift+Delete (open cache clearing)

---

### ❌ Login/Registration Issues

#### Issue: "Login failed" or "Network Error"
**Problem:** Backend not responding or API URL wrong

**Solutions:**
```bash
# 1. Verify backend is running
# Open another terminal: curl http://localhost:5000/health
# Should return: {"message":"Server is running"}

# 2. Check API URL in frontend services
# Edit: frontend/js/services/auth.service.js
// const API_URL = 'http://localhost:5000/api';

# 3. Check browser console (F12) for detailed error

# 4. Restart backend
npm run dev
```

---

#### Issue: "Invalid email or password" (but email/password are correct)
**Problem:** MongoDB connection issue or data not saving

**Solutions:**
1. Check MongoDB is running: `mongod`
2. Verify connection string in .env
3. Check that users were actually saved:
```bash
mongosh
use job-seeker-app
db.users.find()
```
4. If no users, data isn't saving. Check:
   - MongoDB connection
   - Backend logs for errors
   - Database permissions

---

#### Issue: "Token is not valid" after login
**Problem:** JWT secret mismatch or token expired

**Solutions:**
```bash
# 1. Clear localStorage
# In browser console (F12):
localStorage.clear()

# 2. Login again

# 3. If still failing, check JWT_SECRET in .env:
JWT_SECRET=your_secret_key_here

# Make sure it's set and consistent
```

---

### ❌ API Response Issues

#### Issue: "404 Not Found" on API calls
**Problem:** Wrong endpoint URL or backend not running

**Solutions:**
```bash
# 1. Verify backend is running
npm run dev

# 2. Check correct endpoint:
POST   /api/auth/login
GET    /api/jobs
POST   /api/applications/apply
GET    /api/profile

# 3. Check in browser Network tab (F12):
# - Status should be 200, 201, or 4xx
# - NOT 404 (except intentionally)
# - Check "Response" tab for error message

# 4. Test with curl:
curl -X GET http://localhost:5000/api/jobs
```

---

#### Issue: "500 Internal Server Error"
**Problem:** Server-side error in controller or database

**Solutions:**
1. Check backend terminal for error messages
2. Enable detailed logging:
```javascript
// In backend/server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```
3. Check the error message in browser Network tab → Response
4. Common causes:
   - Database query error
   - Validation error
   - Missing required fields
   - Database connection issue

---

#### Issue: "Field is required" but I filled it
**Problem:** Server-side validation failing

**Solutions:**
1. Check browser console for the actual error message
2. Verify all required fields are filled
3. Check field names match backend expectations
4. In backend controller, look for validation logic

---

### ❌ Database Issues

#### Issue: "MongoValidationError" or duplicate key error
**Problem:** Duplicate email or invalid data

**Solutions:**
```bash
# For duplicate key error:
# The email must be unique. Check:

# 1. Clear test data:
mongosh
use job-seeker-app
db.users.deleteMany({})
db.jobs.deleteMany({})
db.applications.deleteMany({})

# 2. Try registering with different email
# user1@example.com, user2@example.com, etc.

# 3. Or reset with sample data from SAMPLE_DATA.md
```

---

#### Issue: Data not saving to database
**Problem:** Database connection or write permissions

**Solutions:**
1. Verify MongoDB is running: `mongod`
2. Check MONGODB_URI in .env is correct
3. Test connection:
```bash
mongosh
# Should connect successfully
show databases
# Should show "job-seeker-app"
```
4. Check MongoDB user permissions (if using auth)
5. Try simpler test data first

---

### ❌ Styling/UI Issues

#### Issue: Page looks unstyled (no colors, weird layout)
**Problem:** CSS not loading

**Solutions:**
1. Check Network tab (F12) for style.css
   - Should load with 200 status
   - Size should be reasonable (not 0 bytes)

2. Verify style.css exists:
   - `frontend/css/style.css` should exist

3. Check index.html has CSS link:
```html
<link rel="stylesheet" href="css/style.css">
```

4. Hard refresh browser (Ctrl+F5)

5. Clear browser cache (Ctrl+Shift+Delete)

---

#### Issue: Mobile view looks broken
**Problem:** Responsive design CSS issue

**Solutions:**
1. Check browser zoom is 100%
2. Use browser DevTools device emulator (F12 → Toggle device toolbar)
3. Check viewport meta tag in index.html:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
4. Test in different browsers

---

### ❌ AngularJS Issues

#### Issue: "AngularJS is not defined"
**Problem:** AngularJS library not loaded

**Solutions:**
1. Verify AngularJS is loaded in index.html:
```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>
```

2. Check Network tab for these scripts:
   - Should load from CDN
   - Status should be 200

3. Check script order in index.html:
   - Angular scripts first
   - Then app.js
   - Then services
   - Then controllers

---

#### Issue: Routes not working / Page not changing
**Problem:** AngularJS routing not configured correctly

**Solutions:**
1. Check app.js has routes defined:
```javascript
.when('/jobs', {
  templateUrl: 'views/jobseeker/job-listings.html',
  controller: 'JobListingsController'
})
```

2. Verify URLs use hash (#):
   - Correct: `http://localhost:8000/#!/jobs`
   - Wrong: `http://localhost:8000/jobs`

3. Check template files exist:
   - `views/jobseeker/job-listings.html`
   - Path must be relative to index.html

4. Check controller is defined:
   - Look in js/controllers/job.controller.js

---

#### Issue: Data not showing in view
**Problem:** Controller not loading data or binding issue

**Solutions:**
1. Check browser console for errors (F12)
2. Add debug in view:
```html
<p>{{ someVariable }}</p>
<!-- If shows {{someVariable}}, binding failed -->
```

3. Verify controller is assigned to view:
```javascript
.controller('JobListingsController', ['$scope', function($scope) {
  // $scope variables will show in view
}])
```

4. Check Network tab for API calls:
   - Verify data is being returned
   - Check status is 200
   - Check Response contains data

---

### ❌ Authentication Issues

#### Issue: Can register but can't login with same account
**Problem:** Password hashing issue or password mismatch

**Solutions:**
1. Ensure password confirmation matches exactly
2. Check for extra spaces in password
3. Verify bcryptjs is working:
```bash
# In backend logs, should see password is hashed
# Not stored as plain text
```

4. Try registering again with simple password
5. Check MongoDB has the user:
```bash
mongosh
use job-seeker-app
db.users.find({email: "yourmail@example.com"})
```

---

#### Issue: Token expires, have to login again
**Problem:** JWT_EXPIRE is set to short duration

**Solutions:**
```env
# In backend/.env, change:
JWT_EXPIRE=7d    # Was probably 1d or shorter
```

Then restart backend:
```bash
npm run dev
```

---

### ❌ Permission Issues

#### Issue: "Not authorized" or access denied
**Problem:** Missing admin role or token

**Solutions:**
1. Verify you're logged in:
   - Check navbar shows your name
   - Check localStorage has token:
   ```javascript
   // In browser console:
   localStorage.getItem('token')
   localStorage.getItem('user')
   ```

2. Check user role:
   - Admin can access `/admin/dashboard`
   - Job Seeker can access `/jobs`

3. Register/login with correct role:
   - Job Seeker role for `/jobs`
   - Admin role for `/admin/dashboard`

4. Check token hasn't expired:
   - Clear localStorage and login again

---

### ❌ Performance Issues

#### Issue: Page loading very slowly
**Problem:** Large database queries or network issues

**Solutions:**
1. Check Network tab (F12):
   - Look for slow API calls
   - Check response time

2. Verify MongoDB is responsive:
```bash
mongosh
db.users.countDocuments()
# Should return quickly
```

3. Check backend logs for slow queries
4. Verify you're not filtering huge datasets

---

#### Issue: Application becomes unresponsive
**Problem:** Too many requests or memory leak

**Solutions:**
1. Hard refresh: Ctrl+F5
2. Clear cache: Ctrl+Shift+Delete
3. Close other browser tabs
4. Restart backend server
5. Check browser console for errors

---

## 🔍 Debug Checklist

When something doesn't work:

- [ ] Check browser console (F12) for errors
- [ ] Check Network tab (F12) for API calls
  - [ ] Are requests going out?
  - [ ] What's the status code?
  - [ ] What's in the Response?
- [ ] Check backend terminal for logs
- [ ] Verify backend is running: `curl http://localhost:5000/health`
- [ ] Verify MongoDB is running: `mongod`
- [ ] Hard refresh browser: Ctrl+F5
- [ ] Clear localStorage: Open console, run `localStorage.clear()`
- [ ] Restart backend: Kill and run `npm run dev` again

---

## 📞 Getting Help

### Check These First:
1. **Browser Console** (F12) - JavaScript errors
2. **Network Tab** (F12) - API request/response
3. **Backend Terminal** - Server logs and errors
4. **README.md** - Comprehensive documentation
5. **This File** - Common issues and solutions

### Information to Include When Asking for Help:
1. Error message (exact text)
2. Where you see the error (browser console, page, backend)
3. Steps to reproduce
4. What you were trying to do
5. Backend logs output
6. Browser console error stack

---

## 📝 Error Message Glossary

| Error | Cause | Solution |
|-------|-------|----------|
| EADDRINUSE | Port in use | Kill process or change port |
| Cannot find module | Dependency missing | Run `npm install` |
| MongooseError | DB not running | Start MongoDB |
| CORS error | Different origins | Check backend/frontend ports |
| 404 Not Found | Wrong URL | Check API endpoint |
| 500 Server Error | Server bug | Check backend logs |
| Token is not valid | Token expired | Login again |
| Not authorized | Wrong role | Use correct account type |
| No Access-Control-Allow-Origin | CORS disabled | Enable in backend |
| {{variable}} shows literally | Binding failed | Check controller |

---

## 🚀 Quick Recovery

**Everything broken, start fresh:**
```bash
# 1. Kill all processes
taskkill /F /IM mongod.exe
taskkill /F /IM node.exe

# 2. Clear database (optional)
mongosh
use job-seeker-app
db.dropDatabase()
exit

# 3. Restart MongoDB
mongod

# 4. Restart backend
cd backend
npm run dev

# 5. Restart frontend
cd frontend
python -m http.server 8000

# 6. Open browser
# http://localhost:8000
# Register new account
```

---

## 📚 Additional Resources

- **Node.js Errors:** https://nodejs.org/en/docs/
- **Express.js Docs:** https://expressjs.com/
- **MongoDB:** https://docs.mongodb.com/
- **AngularJS:** https://docs.angularjs.org/
- **MDN Web Docs:** https://developer.mozilla.org/

---

**Still stuck?**
1. Read README.md carefully
2. Review SETUP_CHECKLIST.md
3. Check FILE_STRUCTURE_GUIDE.md
4. Try the "Quick Recovery" section above

**Good luck! 🚀**
