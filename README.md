# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


🎬 Movie Ticket Booking System – React Frontend

A responsive Movie Ticket Booking System frontend built using React.js. The application allows users to browse movies, view available shows, select seats, and proceed through the booking flow.

🚀 Features

- 🔐 User Signup and Signin
- 🎬 Browse Movies
- 🕒 View Available Shows
- 💺 Interactive Seat Selection
- 🎟️ Movie Ticket Booking
- 💳 Payment / Booking Flow
- ❌ Booking Cancellation
- 🔄 Automatic Seat Availability Handling
- 📱 Responsive User Interface
- 🔗 REST API Integration with Django Backend

🛠️ Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router
- Vite
- REST API
- Git & GitHub

📂 Project Structure

Movie_Tricket/
├── public/
├── src/
│   ├── Components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

🔄 Application Flow

Home
  ↓
Select Movie
  ↓
View Shows
  ↓
Select Seats
  ↓
Booking
  ↓
Payment
  ↓
Booking Confirmation

🔗 Backend

This React frontend communicates with a Django REST Framework backend.

Backend Repository:
https://github.com/kp1312-bot/movie-ticket-booking

⚙️ Installation

Clone the repository:

git clone https://github.com/kp1312-bot/movie-ticket-booking-frontend.git

Open the project:

cd movie-ticket-booking-frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The application will run on the local Vite development server.

📸 Screenshots

Screenshots will be added soon.

🎯 Learning Outcomes

This project helped me gain practical experience with:

- React components and state management
- React Router navigation
- Axios API integration
- REST API consumption
- Form handling
- Seat selection logic
- Frontend and backend integration
- Git and GitHub

👨‍💻 Developer

Krishna Pal

BBA-CA Graduate | Python Full Stack Developer Fresher

GitHub:
https://github.com/kp1312-bot

📌 Future Improvements

- Online payment gateway integration
- Deployment to production
- Email booking confirmation
- Advanced movie search and filtering
- User booking history
- Admin dashboard