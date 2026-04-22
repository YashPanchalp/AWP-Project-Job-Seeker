const fs = require('fs');
const path = require('path');

const cssContent = \/* ===================================
   LINKEDIN-INSPIRED GLOBAL STYLES
   =================================== */
:root {
  --li-blue: #0a66c2;
  --li-blue-hover: #004182;
  --li-bg: #f3f2ef;
  --li-white: #ffffff;
  --li-text-dark: #000000e6;
  --li-text-muted: #00000099;
  --li-border: #00000014;
  --li-border-hover: #00000040;
  --li-shadow: 0 0 0 1px var(--li-border), 0 2px 3px rgba(0,0,0,0.08);
  --font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  background-color: var(--li-bg);
  color: var(--li-text-dark);
  line-height: 1.5;
  min-height: 100vh;
}

.container {
  max-width: 1128px;
  margin: 0 auto;
  padding: 0 16px;
}

/* ===================================
   NAVBAR STYLES (Header)
   =================================== */
.navbar {
  background-color: var(--li-white);
  border-bottom: 1px solid var(--li-border);
  position: sticky;
  top: 0;
  z-index: 100;
  height: 52px;
  display: flex;
  align-items: center;
}

.navbar-container {
  max-width: 1128px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;
}

.navbar-brand {
  font-size: 24px;
  font-weight: 700;
  color: var(--li-blue);
  text-decoration: none;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.navbar-brand::before {
  content: 'in';
  background-color: var(--li-blue);
  color: white;
  border-radius: 4px;
  padding: 0 4px;
  font-size: 20px;
}

.navbar-nav {
  display: flex;
  gap: 20px;
  align-items: center;
  list-style: none;
}

.navbar-nav a {
  color: var(--li-text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.2s ease;
}

.navbar-nav a:hover {
  color: var(--li-text-dark);
}

.navbar-nav .auth-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 1px solid var(--li-border);
  padding-left: 20px;
}

/* Buttons */
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: var(--li-blue);
  color: var(--li-white);
}

.btn-primary:hover {
  background-color: var(--li-blue-hover);
  color: var(--li-white);
}

.btn-secondary {
  background-color: transparent;
  color: var(--li-text-dark);
  border-color: var(--li-text-dark);
}

.btn-secondary:hover {
  background-color: rgba(0,0,0,0.04);
  border-color: var(--li-text-dark);
}

.btn-outline {
  background-color: transparent;
  color: var(--li-blue);
  border-color: var(--li-blue);
  border-width: 1px;
}
.btn-outline:hover {
  background-color: rgba(10, 102, 194, 0.1);
  box-shadow: inset 0 0 0 1px var(--li-blue);
}

.btn-lg {
  padding: 14px 32px;
  font-size: 18px;
}

/* Forms */
.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: var(--li-text-muted);
}

input, textarea, select {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--li-text-dark);
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
  transition: border-color 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--li-blue);
  box-shadow: inset 0 0 0 1px var(--li-blue);
}

/* Cards */
.card {
  background-color: var(--li-white);
  border-radius: 8px;
  box-shadow: var(--li-shadow);
  padding: 24px;
  margin-bottom: 24px;
}

/* Home Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;
  gap: 40px;
  background-color: var(--li-bg);
}

.hero-text {
  flex: 1;
}

.hero-text h1 {
  font-size: 56px;
  font-weight: 200;
  color: #8f5849;
  line-height: 1.2;
  margin-bottom: 24px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.hero-visual img {
  max-width: 100%;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

/* Home Explore Section */
.explore-section {
  background-color: var(--li-white);
  padding: 60px 0;
  margin: 0 calc(-50vw + 50%);
}

.explore-container {
  max-width: 1128px;
  margin: 0 auto;
  padding: 0 16px;
}

.explore-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.explore-card {
  background-color: var(--li-bg);
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.explore-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--li-shadow);
  background-color: var(--li-white);
}

.explore-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--li-text-dark);
}

/* Auth Pages */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 52px);
  padding: 40px 16px;
}

.auth-card {
  background-color: var(--li-white);
  border-radius: 8px;
  box-shadow: var(--li-shadow);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.auth-header {
  text-align: left;
  margin-bottom: 24px;
}

.auth-header h1 {
  font-size: 32px;
  font-weight: 600;
  color: var(--li-text-dark);
}

.auth-header p {
  color: var(--li-text-muted);
  margin-top: 4px;
}

.auth-footer {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
}

.auth-footer a {
  color: var(--li-blue);
  font-weight: 600;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.job-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.job-card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--li-blue);
  margin-bottom: 4px;
}

.job-card-company {
  font-size: 16px;
  color: var(--li-text-dark);
  margin-bottom: 4px;
}

.job-card-meta {
  font-size: 14px;
  color: var(--li-text-muted);
  margin-bottom: 12px;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #e8f5e9;
  color: #1b5e20;
  font-size: 12px;
  font-weight: 600;
}
\;

fs.writeFileSync(path.join(__dirname, 'css/style.css'), cssContent);
console.log('style.css explicitly updated');
