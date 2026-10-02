import axios from "axios";

const api = axios.create({
  baseURL: "http://movie-ticket-booking-backend-kuxe-onrender.com/api/"
});

export default api;