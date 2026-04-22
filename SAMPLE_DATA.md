// Sample Data for Job Seeker Application
// To use this data:
// 1. Connect to MongoDB
// 2. Create database: use job-seeker-app
// 3. Copy and paste these commands in MongoDB shell

// ============================================
// CREATE DATABASE AND COLLECTIONS
// ============================================
use job-seeker-app

// ============================================
// SAMPLE USERS DATA
// ============================================
// Password: password123 (hashed with bcryptjs)
// Note: In real application, use actual hashed passwords

db.users.insertMany([
  {
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$10$abcdefghijklmnopqrstuvwxyz", // hashed password123
    role: "jobseeker",
    qualification: "Bachelor's in Computer Science",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    experience: "3 years as a Full Stack Developer",
    phone: "555-1234",
    location: "New York, USA",
    resume: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2a$10$abcdefghijklmnopqrstuvwxyz",
    role: "jobseeker",
    qualification: "Master's in Software Engineering",
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    experience: "5 years as a Backend Developer",
    phone: "555-5678",
    location: "San Francisco, USA",
    resume: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$abcdefghijklmnopqrstuvwxyz",
    role: "admin",
    qualification: "",
    skills: [],
    experience: "",
    phone: "",
    location: "",
    resume: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Tech Company Admin",
    email: "tech@example.com",
    password: "$2a$10$abcdefghijklmnopqrstuvwxyz",
    role: "admin",
    qualification: "",
    skills: [],
    experience: "",
    phone: "",
    location: "",
    resume: "",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// ============================================
// SAMPLE JOBS DATA
// ============================================

// Get admin user IDs first:
// db.users.findOne({email: "admin@example.com"})._id
// db.users.findOne({email: "tech@example.com"})._id

db.jobs.insertMany([
  {
    title: "Senior Software Engineer",
    companyName: "Google",
    description: "We are looking for a Senior Software Engineer to join our team. You will work on challenging problems and collaborate with talented engineers worldwide.",
    skillsRequired: ["JavaScript", "Python", "System Design", "Cloud Architecture"],
    location: "Mountain View, California",
    salary: "$200,000 - $300,000",
    jobType: "Full-time",
    createdBy: ObjectId("ADMIN_ID_HERE"),
    extraFields: {},
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Full Stack Developer",
    companyName: "Airbnb",
    description: "Join our platform team and help build experiences that inspire people to explore the world. We need experienced full-stack developers.",
    skillsRequired: ["React", "Node.js", "MongoDB", "CSS"],
    location: "San Francisco, California",
    salary: "$150,000 - $250,000",
    jobType: "Full-time",
    createdBy: ObjectId("ADMIN_ID_HERE"),
    extraFields: {},
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Backend Developer",
    companyName: "Amazon",
    description: "Build scalable backend systems for millions of users. Work with microservices, cloud infrastructure, and big data technologies.",
    skillsRequired: ["Java", "AWS", "SQL", "Distributed Systems"],
    location: "Seattle, Washington",
    salary: "$180,000 - $270,000",
    jobType: "Full-time",
    createdBy: ObjectId("ADMIN_ID_HERE"),
    extraFields: {},
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Frontend Engineer",
    companyName: "Meta",
    description: "Help us build the next generation of social experiences. We are looking for talented frontend engineers.",
    skillsRequired: ["React", "TypeScript", "CSS", "GraphQL"],
    location: "Menlo Park, California",
    salary: "$170,000 - $260,000",
    jobType: "Full-time",
    createdBy: ObjectId("ADMIN_ID_HERE"),
    extraFields: {},
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Data Scientist",
    companyName: "Apple",
    description: "Work with cutting-edge technologies to extract insights from massive datasets and build intelligent systems.",
    skillsRequired: ["Python", "Machine Learning", "Statistics", "Big Data"],
    location: "Cupertino, California",
    salary: "$190,000 - $280,000",
    jobType: "Full-time",
    createdBy: ObjectId("TECH_ADMIN_ID_HERE"),
    extraFields: {},
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "DevOps Engineer",
    companyName: "Microsoft",
    description: "Design and maintain robust infrastructure and deployment systems. Work with cloud platforms and containerization.",
    skillsRequired: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    location: "Redmond, Washington",
    salary: "$160,000 - $240,000",
    jobType: "Full-time",
    createdBy: ObjectId("TECH_ADMIN_ID_HERE"),
    extraFields: {},
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// ============================================
// SAMPLE APPLICATIONS DATA
// ============================================
// Get user IDs from db.users.find()
// Get job IDs from db.jobs.find()

db.applications.insertMany([
  {
    userId: ObjectId("JOHN_USER_ID"),
    jobId: ObjectId("GOOGLE_JOB_ID"),
    status: "Applied",
    appliedData: {
      name: "John Doe",
      email: "john@example.com",
      phone: "555-1234",
      qualification: "Bachelor's in Computer Science",
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
      experience: "3 years as a Full Stack Developer",
      location: "New York, USA",
      extraData: {}
    },
    coverLetter: "I am very interested in this position. With my 3 years of experience in full stack development, I believe I can contribute significantly to your team.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: ObjectId("JANE_USER_ID"),
    jobId: ObjectId("AMAZON_JOB_ID"),
    status: "Shortlisted",
    appliedData: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
      qualification: "Master's in Software Engineering",
      skills: ["Python", "Django", "PostgreSQL", "AWS"],
      experience: "5 years as a Backend Developer",
      location: "San Francisco, USA",
      extraData: {}
    },
    coverLetter: "I am excited about the opportunity to work on scalable systems at Amazon. My background in backend development and AWS makes me a great fit for this role.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// ============================================
// VERIFICATION COMMANDS
// ============================================
// Run these to verify data was inserted:

// db.users.find().pretty()
// db.jobs.find().pretty()
// db.applications.find().pretty()
// db.users.countDocuments()
// db.jobs.countDocuments()
// db.applications.countDocuments()

// ============================================
// NOTES
// ============================================
/*
1. Replace ADMIN_ID_HERE and TECH_ADMIN_ID_HERE with actual ObjectIds
   - Get them from: db.users.find({role: "admin"})
   
2. Replace USER_IDs and JOB_IDs with actual ObjectIds when inserting applications
   
3. These are sample passwords - in production, use actual bcryptjs hashed passwords
   
4. To hash a password in Node.js:
   const bcrypt = require('bcryptjs');
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash('password123', salt);
   
5. The samples here contain test data to quickly populate the database
   for development and testing purposes.
*/
