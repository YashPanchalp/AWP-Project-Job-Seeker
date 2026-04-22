# Quick Start Guide

## 1. Start MongoDB
Ensure MongoDB is running on your system.

## 2. Install Backend Dependencies
```bash
cd backend
npm install
```

## 3. Start Backend Server
```bash
npm run dev
```
Expected output:
```
Server running on port 5000
Environment: development
MongoDB Connected: localhost
```

## 4. Open Frontend in Browser

### Option A: Using Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `frontend/index.html`
3. Select "Open with Live Server"

### Option B: Using Python
```bash
cd frontend
python -m http.server 8000
# Visit: http://localhost:8000
```

### Option C: Using Node.js
```bash
cd frontend
npx http-server
# Visit: http://localhost:8080
```

## 5. Test the Application

### Create Test Accounts
1. Go to `/#!/register`
2. Create a Job Seeker account
3. Create an Admin account

### Job Seeker Test Flow
1. Login as Job Seeker
2. Browse jobs at `/#!/jobs`
3. Apply for a job
4. Check `/#!/my-applications`
5. Update profile at `/#!/profile`

### Admin Test Flow
1. Login as Admin
2. Go to `/#!/admin/dashboard`
3. Post a new job
4. View applicants for posted jobs

## Environment Variables (backend/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-seeker-app
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
NODE_ENV=development
```

## Default Routes

### Job Seeker
- Login: `/#!/login`
- Browse Jobs: `/#!/jobs`
- My Applications: `/#!/my-applications`
- Profile: `/#!/profile`

### Admin
- Dashboard: `/#!/admin/dashboard`
- Post Job: `/#!/admin/post-job`
- Edit Job: `/#!/admin/jobs/:id/edit`
- View Applicants: `/#!/admin/jobs/:id/applicants`

## Troubleshooting

### Port 5000 in Use
```bash
# Kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Error
- Ensure backend is running on `http://localhost:5000`
- Check frontend API_URL matches

### MongoDB Connection Error
- Ensure MongoDB service is running
- Check MONGODB_URI in `.env`

## Next Steps
- Read `README.md` for comprehensive documentation
- Test all features
- Customize styling in `frontend/css/style.css`
- Add more fields to jobs or applications as needed
