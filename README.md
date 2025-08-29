# GYM system management 

A cross-platform gym management application built with **React**, **Electron**, and **MongoDB**.  
The app helps manage members, subscriptions, and photos with a modern interface and persistent database.

---

## 🚀 Tech Stack

- **Frontend**: ReactJS and React Router for navigation
  Used to design and structure the app’s components with reusable UI elements.  
  React Router handles the navigation between different pages

- **Backend: Electron IPC Handlers**  
  IPC (Inter-Process Communication) is used to connect the frontend with backend processes.  
  It manages requests like database queries, photo uploads, and subscription logic.  

- **Database: MongoDB**  
  Stores all gym data, including member profiles, subscription details.  
  Provides persistent and flexible storage for scalable management.  

- **File Storage: Cloudinary**  
  Used to upload, store, and serve member profile photos.  
  Optimizes images for fast loading inside the Electron app.  

- **Desktop Runtime: Electron**  
  Packages the entire app into a desktop application.  
  Makes the React frontend and backend logic run seamlessly on Windows/Linux/Mac.

  ---

  ## 📌 Features

- ➕ Add, update, and delete gym members  
- 📷 Upload and store member photos securely with Cloudinary  
- 💳 Manage subscriptions and payments  
- 🔍 Search and filter members  
- 🖥️ Runs as a native desktop application  

---## ⚙️ Installation

## 📂 Project Structure
gym-app/

├── gym-app/ # ReactJS 

├── backend/ # IPC handlers and server logic

├── public/ # Static assets

├── electron.js # Electron main process

└── README.md

---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone https://github.com'/abderrahm4ne/gym-app.git
cd gym-app

```

### 2. create 2 config.json files


first file

```bash
cd backend
touch config.json
```

copy past inside the file

```bash
{
  "CLOUDINARY_CLOUD_NAME": "your_cloud_name",
  "CLOUDINARY_API_KEY": "your_api_key",
  "CLOUDINARY_API_SECRET": "your_api_secret"
}
```

second file 

```bash
cd ../
touch config.json
```

copy past inside

```bash
{
  "MONGO_URI": "your_mongo_connection_string",
}
```

to run app enter 

```bash
npm run build
```

to build desktop app enter

```bash
npm run make
```








