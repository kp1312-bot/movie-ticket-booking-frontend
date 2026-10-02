import axios from "axios";

const api = axios.create({
 baseURL: "https://movie-ticket-booking-backend-kuxe.onrender.com/api/"
});

export default api;