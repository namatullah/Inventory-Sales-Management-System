# Inventory & Sales Management System

A full-stack **Inventory & Sales Management System** built using the **MERN stack**.  
This project helps businesses manage products, categories, users, and sales transactions with proper authentication and role-based access control.

---

## Tech Stack

### Frontend
- React (TypeScript)
- Material UI (MUI)
- Axios
- React Router DOM

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication

---

### Authentication & Authorization
- User login & registration
- JWT-based authentication
- Role-based access control:
  - **Admin**
  - **Staff**
- Admin registration requires a secret **Admin Invite Token** you can set yours in .env file

---

### User Management (Admin Only)
- Admins can view the **user list**
- Promote or demote users between **admin** and **staff**
- Delete users
- Only accessible to users with **role: admin**

---

### Product Management
- Create, update, delete products
- Track SKU, stock, stock unit, and price
- Products linked to categories

---

### Category Management
- Unique product categories
- Category-based product organization

---

### Sales Management
- Record product sales
- Multiple items per sale
- Automatic total amount calculation
- Tracks:
  - Sold products
  - Quantity
  - Price at sale
  - User who performed the sale
