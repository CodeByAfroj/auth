# 🛡️ Auth Service

A production-ready authentication microservice built with **Node.js**, **Express**, and **MongoDB**.  
Supports Email/Password login, OTP-based login, and Google OAuth with JWT and refresh token mechanisms.

---

## 🚀 Features

- ✅ Email/Password Signup and Login
- 🔐 Secure OTP Login (via Email)
- 🌐 Google OAuth Login
- 🔁 JWT + Refresh Token
- 🍪 Secure Cookies for token storage
- 🌍 CORS-configured API
- 📦 Production-Ready Structure

---

## 🗂️ Project Structure

```
auth/
├── index.js
├── package.json
├── .env
├──src/
  ├── config/
  ├── controllers/
  ├── middlewares/
  ├── models/
  ├── routes/
  ├── services/
  ├── utils/
```

---

## 🔧 .env Configuration

Create a `.env` file at the root:

```env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/authDB

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

# Email (Nodemailer)
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password

# OAuth - Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Tokens
ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d

# Server
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

---

## ▶️ How to Run Locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## 📬 API Endpoints

### 📧 Email/Password Auth

- `POST /auth/register` – Register user
- `POST /auth/login` – Login with email/password

### 🔐 OTP Auth

- `POST /auth/send-otp` – Send OTP to email
- `POST /auth/verify-otp` – Verify OTP

### 🌐 Google OAuth

- `GET /auth/google` – Start Google login
- `GET /auth/google/callback` – Google redirect handler

### 🔁 Tokens

- `POST /auth/refresh-token` – Get new access token
- `POST /auth/logout` – Clear cookies, invalidate refresh token

---

## 🔐 Cookies Used

- `accessToken` – Short-lived JWT (15 min)
- `refreshToken` – Long-lived JWT (7 days)

---

## 🧪 Test Auth in Postman

1. **Register/Login** – Use JSON body
2. **Cookies** – Postman will store tokens in Cookies tab
3. **Secure Routes** – Attach `Authorization: Bearer <token>` header

---

## 🛠️ Production Deployment (Render / Railway)

1. Push code to GitHub
2. Use Render.com or Railway.app to deploy
3. Set environment variables in dashboard
4. Use Node version `18.x` in `package.json`:

```json
"engines": {
  "node": "18.x"
}
```

---

## 📄 License

MIT – Use freely, modify, or resell with attribution.

---

## 👨‍💻 Author

Made with ❤️ by [Afroj](https://github.com/CodeByAfroj)
