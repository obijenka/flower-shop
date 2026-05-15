# Flower Shop

A full-stack web application for an online flower shop, featuring user authentication, product management, and a modern React frontend with a Node.js backend.

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework for API
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Passport.js** - Authentication middleware (Google OAuth)
- **Nodemailer** - Email sending for verification
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Query** - Data fetching and caching
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **ESLint** - Code linting

### Development Tools
- **Nodemon** - Auto-restart for backend development
- **Dotenv** - Environment variable management

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the backend directory with the following variables:
```env
PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=flower_shop
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:5173
```
4. Initialize the database:
```bash
npm run init-db
```
5. Start the development server:
```bash
npm run dev
```
### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install dependencies::
```bash
npm install
```
3. Create a .env file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```
4. Start the development server:
```bash
npm run dev
```

### Project Structure
```text
flower-shop/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   └── package.json
└── README.md
```

### Future Enhancements
- Shopping cart functionality
- Order management and payment integration
- Admin panel for product management
- User reviews and ratings
- Wishlist (favorites) UI
- Unit and integration tests
- Docker containerization


