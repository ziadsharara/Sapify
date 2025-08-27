# Sapify - Order & Inventory Management System

🏢 **Enterprise Order & Inventory Management** built with SAP UI5/Fiori and Node.js

## 📋 Overview

A comprehensive order and inventory management application developed during our internship.

### ✨ Key Features

- **📦 Order Management**: Complete CRUD operations for sales orders
- **📊 Inventory Tracking**: Real-time stock level monitoring
- **📈 Analytics Dashboard**: Interactive charts for sales trends
- **🔐 Role-Based Access**: JWT authentication (Admin, Manager, Employee)
- **📱 Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Technology Stack

| Component        | Technology                                |
|------------------|-------------------------------------------|
| **Frontend**     | SAP UI5 1.139+ (XML Views, MVC)           |
| **Backend**      | Node.js, Express.js, OData v4 Server      |
| **Database**     | MongoDB with Mongoose ODM                 |
| **Authentication**| JWT, bcryptjs                            |


## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas or local MongoDB
- SAP UI5 CLI

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sapify-app.git
   cd sapify
   
   cd backend
   npm install
   npm run dev

   cd frontend
   npm install
   npm run serve
   ```
## 🏗️ Project Structure
```
sapify-app/
├── backend/
│ ├── src/
│ │ ├── models/ # MongoDB Schemas
│ │ ├── routes/ # OData Routes
│ │ └── config/ # DB Config
│ └── package.json
├── frontend/
│ ├── webapp/
│ │ ├── controller/ # MVC Controllers
│ │ ├── view/ # XML Views
│ │ └── model/ # Data Models
│ └── package.json
└── README.md
```

## 👨‍💻 Development Team

**Internship Team** - Full Stack Developers 
[Ziad Sharara](https://github.com/ziadsharara)
[Fady Akram](https://github.com/fady-hub)
