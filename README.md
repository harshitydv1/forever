# Docto - Full Stack E-Commerce Application

A modern, full-stack e-commerce platform built with React, Node.js, and MongoDB. This monorepo contains the frontend customer application, admin dashboard, and backend API server.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [CI/CD](#cicd)

## 🎯 Project Overview

Docto is a full-featured e-commerce platform featuring:
- **Customer-facing frontend** for browsing products, shopping, and order management
- **Admin dashboard** for product and order management
- **RESTful backend API** for all business logic
- **Payment integration** with Stripe and Razorpay
- **Image management** via Cloudinary
- **User authentication** with JWT

## 🛠 Tech Stack

### Frontend & Admin
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Linting**: ESLint 9

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB with Mongoose 9
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Bcrypt for password hashing
- **File Upload**: Multer
- **Image Service**: Cloudinary
- **Payment**: Stripe & Razorpay
- **Development**: Nodemon
- **Environment**: dotenv

## 📁 Project Structure

```
docto/
├── admin/                    # Admin dashboard (React + Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Admin pages (Add, List, Orders)
│   │   ├── assets/          # Images and static files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js API server
│   ├── config/              # Database & Cloudinary config
│   ├── controllers/         # Business logic (user, product, cart, order)
│   ├── middleware/          # Auth, multer, admin auth
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── uploads/             # Local file uploads
│   ├── server.js
│   ├── package.json
│   └── vercel.json
│
├── frontend/                 # Customer-facing React app
│   ├── src/
│   │   ├── components/      # UI components (Hero, Cart, etc.)
│   │   ├── pages/           # Pages (Home, Product, Cart, etc.)
│   │   ├── context/         # ShopContext for state management
│   │   ├── assets/          # Images and constants
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .github/
│   ├── workflows/           # GitHub Actions CI/CD
│   │   └── ci.yml          # Automated tests and builds
│   └── scripts/             # Shared utility scripts
│       └── ci.sh           # CI script runner
│
└── README.md
```

## 📦 Prerequisites

- **Node.js** 20 or higher
- **npm** or yarn
- **MongoDB** (local or Atlas connection string)
- **Cloudinary** account (optional, for image uploads)
- **Stripe/Razorpay** accounts (optional, for payments)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd docto
```

### 2. Install Dependencies for All Apps

```bash
# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..

# Admin dependencies
cd admin
npm install
cd ..
```

### 3. Configure Environment Variables

Create `.env` files in the `backend` directory with required variables (see [Environment Variables](#environment-variables) section).

### 4. Database Setup

Ensure MongoDB is running and accessible. Update the connection string in `backend/.env`.

## 🚀 Running the Application

### Option 1: Run All Services Simultaneously

**Terminal 1 - Backend API**
```bash
cd backend
npm run server     # Runs with nodemon for auto-reload
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev       # Starts Vite dev server (http://localhost:5173)
```

**Terminal 3 - Admin Dashboard**
```bash
cd admin
npm run dev       # Starts Vite dev server (http://localhost:5174)
```

### Option 2: Production Build

```bash
# Build all applications
cd frontend && npm run build && cd ..
cd admin && npm run build && cd ..

# Run backend in production
cd backend && npm start
```

## 🔐 Environment Variables

Create a `backend/.env` file with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=<your-mongodb-connection-string>

# JWT
JWT_SECRET=<your-jwt-secret-key>

# Cloudinary (Image Management)
CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

# Payment Gateways
STRIPE_API_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>

# Frontend API URL
VITE_API_URL=http://localhost:4000/api
```

## 📡 API Endpoints

### User Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout

### Products
- `GET /api/product/list` - Get all products
- `GET /api/product/:id` - Get product details
- `POST /api/product/add` - Add product (admin only)
- `DELETE /api/product/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/update` - Update cart item quantity

### Orders
- `POST /api/order/place` - Place new order
- `GET /api/order/list` - Get user orders
- `GET /api/order/:id` - Get order details
- `POST /api/order/verify` - Verify payment

## ✨ Features

### Frontend (Customer)
- ✅ Product browsing and search
- ✅ Product filtering and sorting
- ✅ Shopping cart management
- ✅ User authentication
- ✅ Order placement and tracking
- ✅ Payment integration (Stripe/Razorpay)
- ✅ Order history and status tracking
- ✅ Responsive design (Tailwind CSS)

### Admin Dashboard
- ✅ Product management (add, edit, delete)
- ✅ Order management and status updates
- ✅ User list and management
- ✅ Sales analytics
- ✅ Inventory tracking

### Backend
- ✅ RESTful API with proper HTTP methods
- ✅ JWT-based authentication
- ✅ Role-based access control (admin/user)
- ✅ MongoDB data persistence
- ✅ Cloudinary image hosting
- ✅ Payment processing (Stripe/Razorpay)
- ✅ Error handling and validation

## 🔄 CI/CD

This project uses GitHub Actions for automated testing and building. The workflow runs on:
- Push to `main`/`master` branches
- Pull requests
- Manual trigger via `workflow_dispatch`

### What Gets Checked
- **Backend**: JavaScript syntax validation
- **Frontend**: Linting and build compilation
- **Admin**: Linting and build compilation

Run CI checks locally:
```bash
bash .github/scripts/ci.sh all          # Run all checks
bash .github/scripts/ci.sh backend      # Backend only
bash .github/scripts/ci.sh frontend     # Frontend only
bash .github/scripts/ci.sh admin        # Admin only
```

## 🐛 Troubleshooting

### MongoDB Connection Timeout
If you see connection pool errors, check:
1. MongoDB is running and accessible
2. IP address is whitelisted in Atlas (if using MongoDB Atlas)
3. Network connectivity is stable

### Port Already in Use
- Backend default port: `4000`
- Frontend default port: `5173`
- Admin default port: `5174`

Change ports in respective `vite.config.js` or run on different ports.

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

**Built with ❤️ using React, Node.js, and MongoDB**
