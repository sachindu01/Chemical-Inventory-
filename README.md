# Chemical Inventory Management System

A comprehensive MERN stack application for managing chemical inventory, tracking usage, and handling funding requests. This system serves both regular users (Staff/Researchers) and Administrators (Department Heads/Inventory Officers).

## 🚀 Features

### 📦 Inventory Management
- **View Inventory**: Browse and search through the chemical database.
- **Request Chemicals**: Add chemicals to a cart and submit inventory requests.
- **Product Details**: View detailed information about each chemical, including images and availability.

### 💰 Funding Requests
- **Submit Requests**: Staff can submit funding requests for new hardware, chemicals, or software.
- **Track Status**: Monitor the approval status of submitted requests.
- **PDF Generation**: Generate and download PDF receipts/summaries for requests.

### 🛡️ Admin Dashboard
- **Analytics**: Overview of total chemicals, total funds, and pending requests.
- **User Management**: Manage staff and assign roles.
- **Inventory Control**: Add, update, and remove chemicals from the system.
- **Request Approval**: Review and approve/reject inventory and funding requests.
- **Authentication**: Secure login for Admin, HOD, and Inventory Officers.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Cloud Storage**: Cloudinary (for images)
- **Authentication**: JWT & Bcrypt
- **Reporting**: jsPDF

## 📂 Project Structure

```text
.
├── admin/          # Admin Dashboard (React + Vite)
├── backend/        # Express Server & API
├── frontend/       # User Frontend (React + Vite)
└── package.json    # Root configuration
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repository
```bash
git clone <repository-url>
cd chemical-inventory
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the template and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   > See [`.env.example`](backend/.env.example) for the required variables.
4. Start the server:
   ```bash
   npm run server
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
   > See [`.env.example`](frontend/.env.example) for the required variables.
4. Start the development server:
   ```bash
   npm run dev
   ```

### 4. Admin Setup
1. Navigate to the admin directory:
   ```bash
   cd ../admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
   > See [`.env.example`](admin/.env.example) for the required variables.
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 License
Distributed under the ISC License.
