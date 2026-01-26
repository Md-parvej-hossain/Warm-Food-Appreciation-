# A Full-Stack Food Ordering Web Application
# ❤️  Warm Food 🍲 

## 📌 Overview  
**Warm Food** is a full-stack food ordering web application that provides users with a smooth and secure experience for browsing restaurants, ordering food, and tracking orders.  
It features role-based dashboards (Admin, Rider, User), secure authentication using Firebase and JWT, and a scalable backend built with Node.js and MongoDB.

<p align="center">
  <img 
    src="https://github.com/Md-parvej-hossain/Warm-Food-Appreciation-/blob/main/woarm%20Food.png?raw=true" 
    alt="Warm Food Banner" 
    width="800"
  />
</p>

---

## 📖 Introduction
**Warm Food** is a full-stack food ordering web application that provides users with a smooth and secure experience for browsing restaurants, ordering food, and tracking orders.  
It features role-based dashboards (Admin, Rider, User), secure authentication using Firebase and JWT, and a scalable backend built with Node.js and MongoDB.

🔗 **Live Website:**  
https://auth-itegration-6dfcc.web.app

---

## 📑 Table of Contents
- Introduction
- Features
- Tech Stack
- Project Structure
- Installation
- Environment Variables
- Usage
- Authentication & Security
- API Overview
- Dependencies
- Future Improvements
- Contributors
- License

---

## ✨ Features
- User authentication (Login & Register)
- Role-based access (Admin, Rider, User)
- JWT-based authorization
- Protected routes
- Food browsing & ordering
- Payment integration
- Order tracking
- Admin analytics dashboard
- Responsive UI
- RESTful API
- Firebase hosting

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Firebase Authentication
- Firebase Hosting
- Tailwind CSS
- DaisyUI
- TanStack Query
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- MVC Architecture

### Authentication & Security
- Firebase Authentication
- JWT token verification
- Role-based route protection

---

## 📂 Project Structure

```bash
warm-food/
├── server/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── users.controller.js
│   │   ├── foods.controller.js
│   │   └── payment.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── foods.routes.js
│   │   └── payment.routes.js
│   ├── middlewares/
│   │   ├── verifyToken.js
│   │   ├── verifyAdmin.js
│   │   └── verifyRider.js
│   ├── models/
│   │   └── dbCollectionModel.js
│   ├── views/
│   │   └── index.html
│   ├── vercel.json
│   ├── package.json
│   └── .gitignore
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── routes/
│   │   ├── layouts/
│   │   ├── providers/
│   │   ├── firebase/
│   │   ├── utils/
│   │   └── main.jsx
│   ├── public/
│   ├── firebase.json
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
