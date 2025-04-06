StanbicX Twitter OTP Authentication App

This project is a React + Node.js full-stack application for authenticating users via Twitter OAuth, sending them an OTP via Twitter DM, and granting access to a dashboard upon successful verification.

 🚀 Features

- Twitter OAuth 1.0a login
- One-Time Password (OTP) sent via Twitter DM
- OTP verification
- Dashboard access upon successful login
- MySQL database integration
- Session and state management

 🧰 Tech Stack

 Frontend
- ReactJS (Bootstrapped with Create React App)
- Bootstrap (for UI)
- Axios (for API calls)

 Backend
- Node.js
- Express
- Passport.js (`passport-twitter` strategy)
- MySQL (via `mysql2` or `sequelize`)
- `dotenv`, `cors`, `express-session`, `body-parser`


 🗂 Project Structure

stanbicx-twitter-auth/
│
├── stanbicx-front/       # React frontend
└── stanbicx-back/           # Node.js backend

Clone the Repository & Setup Database (from file stanbicx.sql)

git clone https://github.com/AkshaySharma97/UNIQCRYPTO-Test-4-Twitter-Api.git

 🔧 Twitter Developer Setup

1. Go to [https://developer.twitter.com](https://developer.twitter.com)
2. Create a Twitter Developer App
3. Under App > User Authentication Settings:
   - Enable OAuth 1.0a
   - Callback URL: `http://localhost:5000/auth/twitter/callback`
   - Website URL: `http://localhost:3000`
4. Copy your:
   - API Key → `TWITTER_CONSUMER_KEY`
   - API Secret → `TWITTER_CONSUMER_SECRET`


 🛠️ Backend Setup

 Prerequisites

- Node.js & npm
- MySQL

 1. Configure `.env`

Inside `stanbicx-back/.env`:

PORT=5000
CLIENT_URL=http://localhost:3000

TWITTER_CONSUMER_KEY=twitter_consumer_key
TWITTER_CONSUMER_SECRET=twitter_consumer_secret
TWITTER_ACCESS_TOKEN=twitter_access_token
TWITTER_ACCESS_SECRET=twitter_access_secret
TWITTER_CALLBACK_URL=http://localhost:5000/auth/twitter/callback
CLIENT_URL=http://localhost:3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysql_password
DB_NAME=stanbicx_db

Inside `stanbicx-back/.env`:

REACT_APP_BACKEND_URL=http://localhost:5000

 2. Install dependencies

cd stanbicx-back
npm install

 3. Start backend server

npm start

Server runs at: `http://localhost:5000`

 🖥️ Frontend Setup

cd stanbicx-frontend
npm install
npm start

Runs at: `http://localhost:3000`


 💾 MySQL Database Setup

1. Create MySQL database: or directly import sql file

CREATE DATABASE stanbicx_db;

2. Create user table for OTP (example):

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  twitter_id VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  otp_code VARCHAR(6),
  otp_expires_at DATETIME
);

 ✅ How It Works

1. User clicks Login with Twitter (opens Twitter OAuth flow).
2. After login, backend receives user info and generates an OTP.
3. OTP is sent to user's Twitter DM.
4. User enters OTP on frontend.
5. Backend verifies OTP and returns success.
6. User is redirected to Dashboard.

 🛠 Local Development URLs

| Service     | URL                         |
|-------------|-----------------------------|
| Frontend    | http://localhost:3000       |
| Backend     | http://localhost:5000       |
| Twitter Callback | http://localhost:5000/auth/twitter/callback |
