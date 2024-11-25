# User Authentication System

This is a full-stack user authentication system built with Node.js, Express.js, MongoDB, and React.js. It supports user registration, login, JWT-based authentication, token refresh, and logout functionalities.

## Features

- User Registration and Login
- JWT-based Access and Refresh Tokens
- Token Refreshing Mechanism
- Logout with Refresh Token Invalidation
- User CRUD Operations (Update, Delete)
- Frontend built with React Router for navigation
- Secure storage of tokens in local storage

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT)
- **Frontend**: React.js, React Router, Axios
- **Other Tools**: Body-parser, Cors, Prop-types

---


### Prerequisites

Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB (Local or Cloud, e.g., MongoDB Atlas)
- npm or yarn
- React (v18 or later)

---

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <repository_folder>

---

### API Endpoints
## Authentication Endpoints
- POST /register: Register a new user
- POST /login: Login user and receive access/refresh tokens
- POST /token: Refresh the access token using the refresh token
- POST /logout: Logout the user and invalidate the refresh token

## User Management Endpoints
- GET /details: Get details of all users
- PUT /details/:id: Update user details by ID
- DELETE /details/:id: Delete user by ID

### Key Dependencies

## Backend
- express: Web framework
- mongoose: MongoDB object modeling
- jsonwebtoken: Token generation and validation
- cors: Cross-Origin Resource Sharing
- body-parser: Parsing request bodies

## Frontend
- react: Component-based UI library
- axios: HTTP requests
- react-router-dom: Client-side routing