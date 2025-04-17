# Firebase Google Authentication with React

This project demonstrates how to implement Google authentication using Firebase in a React application.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a Firebase project at https://console.firebase.google.com/
4. Enable Google Authentication in your Firebase project:
   - Go to Authentication > Sign-in method
   - Enable Google as a sign-in provider
5. Copy your Firebase configuration:
   - Go to Project settings > General
   - Scroll down to "Your apps" section
   - Find your Web app configuration
6. Create a `.env` file at the root of the project with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=YOUR_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_APP_ID
   ```
7. Start the development server:
   ```
   npm run dev
   ```

## Features

- Google authentication using Firebase
- User authentication state management with React Context
- Login and logout functionality
- Display of user profile information

## Project Structure

- `src/firebase.js` - Firebase configuration
- `src/contexts/AuthContext.jsx` - Authentication context provider
- `src/App.jsx` - Main application component
