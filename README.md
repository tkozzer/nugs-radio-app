# Nugs Radio App

This project is a web application for streaming free Nugs radio, built with a Vue.js frontend and an Express.js backend. It provides access to multiple radio streams, including Phish and other options available on Nugs.

## Project Structure

The project is divided into two main parts:

- `frontend/`: Vue 3 application
- `backend/`: Express.js server

## Frontend

The frontend is a Vue 3 application built with Vite.

### Technologies Used

- Vue 3
- Vite
- Pinia (for state management)
- Tailwind CSS
- VueUse
- ESLint
- TypeScript

### Setup and Running

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

5. Preview the production build:
   ```
   npm run preview
   ```

## Backend

The backend is an Express.js server that handles API requests and serves the frontend in production.

### Technologies Used

- Express.js
- Cors
- Node.js

### Setup and Running

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

## Development

To run both frontend and backend concurrently in development mode:

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

The backend will proxy requests to the Vite dev server for the frontend in development mode.

## Production

For production deployment:

1. Build the frontend:
   ```
   cd frontend
   npm run build
   ```

2. Start the backend server:
   ```
   cd backend
   npm start
   ```

The backend server will serve the built frontend files from the `frontend/dist` directory.

## API Endpoints

- `/api/current-song`: Get current playing song information
  - Query parameter:
    - `id` (optional): Specifies the stream ID. 
      - `1`: nugs.net
      - `2`: LivePhish (default)
      - `4`: Pearl Jam
  - Returns: Current song information in plain text format

## Features

- Multiple radio stream options from Nugs, including Phish and others
- Real-time song information display
- Easy switching between different radio streams
- Dark mode support

## Environment Variables

- `PORT`: The port on which the backend server runs (default: 3000)
- `PROD_URL`: The production URL for CORS configuration
- `NODE_ENV`: Set to 'production' for production mode

## Notes

- This app is a wrapper for the free Nugs radio streams and does not provide access to premium content.
- The project uses Tailwind CSS for styling.
- In development mode, the backend proxies requests to the Vite dev server for the frontend.

## Disclaimer

This application is not affiliated with or endorsed by Nugs.net. It is an independent project that utilizes publicly available free streams provided by Nugs.net.
