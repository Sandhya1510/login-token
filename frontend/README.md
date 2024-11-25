
# Technologies Used
Frontend:
React
React Router
Axios
CSS for styling

Backend:
Node.js
Express.js
MongoDB (Mongoose)
JWT for authentication
CORS for cross-origin requests

## Installation Guide
Prerequisites
Node.js installed on your system.
MongoDB set up locally or through a cloud service like MongoDB Atlas.
Setup


# For the backend:
```javascript
cd backend
npm install
````

# For the frontend:
```javascript
cd frontend
npm install
```
## Set up environment variables:

Create a .env file in the backend directory and add the following:
makefile
```javascript
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-secret-key>
```
## Start the application:

# Start the backend:

cd backend
node index.js

# Start the frontend:

cd frontend
npm start

## Access the application:

Open http://localhost:3000 in your browser.

## API Endpoints
# Public Routes
POST /register: Register a new user.
Body: { email, password }
POST /login: Login with an email and password.
Body: { email, password }
Response: { token }
Protected Routes
GET /details: Fetch all 