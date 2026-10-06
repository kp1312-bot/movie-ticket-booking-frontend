import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Shows from "./pages/Shows";
import Seats from "./pages/Seats";
import MyBookings from "./pages/MyBookings";
import BookingSummary from "./pages/BookingSuccess";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment from "./pages/Payment";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"


function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/signin"
                    element={<Signin />}
                />

                <Route
                    path="/shows/:movieId"
                    element={<Shows />}
                />

                <Route
                    path="/seats/:showId"
                    element={<Seats />}
                />

                <Route
                    path="/my-bookings"
                    element={<MyBookings />}
                />
                <Route path="/booking-summary" element={<BookingSummary/>}/>

                <Route path="/booking-confirmation" element={<BookingConfirmation/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/forgot-password"element={<ForgotPassword />}/>

                <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />}/>

                

            </Routes>

        </BrowserRouter>
    );
}

export default App;