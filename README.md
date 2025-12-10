🚀 Codveda Full-Stack Internship Project
Product Inventory Management System

A complete MERN Stack CRUD Application built for the Codveda Full-Stack Internship.
This application allows users to add, edit, delete, search, and manage product inventory with a modern UI and smooth animations.

✅ Live Demo
🔗 Frontend (Vercel Deployment):

👉 https://codveda-fullstack-internship.vercel.app/

🔗 Backend (Render Deployment):

👉 https://codveda-backend.onrender.com/api/products

📸 Screenshots
🏠 Dashboard (Product List)
<img src="./images/dashboard-products.png" width="700">
➕ Add Product
<img src="./images/add-product-modal.png" width="700">
✏️ Edit Product
<img src="./images/edit-product-modal.png" width="700">
🛠️ Tech Stack
⭐ Frontend

React.js

Axios

React Router

Framer Motion

Toast Notifications

Modern UI CSS

⭐ Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

CORS / REST APIs

⭐ Deployment

Vercel (Frontend)

Render (Backend)

📂 Folder Structure
codveda-fullstack-internship/
│── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── controllers/
│
│── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│
│── README.md

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/products/	Get all products
GET	/api/products/:id	Get product by ID
POST	/api/products/	Add product
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product
🔧 Frontend – API Setup (api.js)
The frontend uses an Axios wrapper. Example matches the repository `frontend/src/services/api.js` exports.

import axios from "axios";

// Production Render backend URL (includes /api/products)
const API = axios.create({
  baseURL: "https://codveda-backend.onrender.com/api/products",
});

// Local development example (if you run backend locally)
// const API = axios.create({ baseURL: "http://localhost:5000/api/products" });

// Get all products
export const getProducts = () => API.get("/");

// Add product
export const createProduct = (data) => API.post("/", data);

// Get a single product
export const getProduct = (id) => API.get(`/${id}`);

// Update product
export const updateProduct = (id, data) => API.put(`/${id}`, data);

// Delete product
export const deleteProduct = (id) => API.delete(`/${id}`);

🚀 How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/ShaikhUzair7777/codveda-fullstack-internship.git
cd codveda-fullstack-internship

2️⃣ Backend Setup
cd backend
npm install
npm start


Backend runs on:
👉 http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs on:
👉 http://localhost:3000

🧪 Features Implemented

✔ Add new products
✔ Edit existing products
✔ Delete products
✔ Animated product cards
✔ Search products
✔ Toast notifications
✔ Responsive modern UI
✔ Deployed frontend + backend
✔ Clean folder structure
✔ Professional README

🎯 Project Completed for Codveda Internship

This project successfully fulfills all required internship tasks:

✔ Backend CRUD API
✔ MongoDB connectivity
✔ React Frontend
✔ Full UI/UX design
✔ Integrated API
✔ Deployment to Vercel + Render
✔ README with screenshots

👨‍💻 Developed By

Shaikh Uzair
B.Tech IT | Web Developer
