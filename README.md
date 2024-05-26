# Todos Certs

This repository contains the source code for the Todos Certs web application. It is a todo list application built using React for the frontend and Node.js for the backend.

## Backend Setup

Before getting started, make sure you have Node.js and npm installed on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/praveensaharan/todos-cerst.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the backend project and add your Redis URL:

   ```plaintext
   REDIS_URL=rediss://xxxxxxxxxx@oregon-redis.render.com:6379
   ```

   Replace `xxxxxxxxxx` with your actual Redis URL.

5. Start the backend server:

   ```bash
   node index.js
   ```

   The backend server will run on port 3000.

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend server will run on port 5173.

## Accessing the Application

You can access the deployed version of this app at [https://todo-certs.netlify.app/](https://todo-certs.netlify.app/).

## About the Web App

### Home

Welcome to our Awesome Todo List! Log in now to start managing your tasks more effectively!

### Features

- Login and Logout: Users can log in using a username and password and log out when they're done.
- Navigation and Routing: Implemented using React Router. The application has a login page and a dashboard page.
- Todo List: Displays a list of todo items fetched from a mock API endpoint. Each todo item has a title, description, and status.
- CRUD Operations: Users can create, read, update, and delete todo items.
- Search: Allows users to search for todo items by title or description.

### Navigation

- Home: Welcome page.
- Log In: Login page.

Log in now to start managing your tasks more effectively!
