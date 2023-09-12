import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Guestpage from "./pages/Guestpage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import Reviews from "./pages/Reviews";
import TourDetail from './pages/TourDetail';
import ErrorPage from './pages/ErrorPage';
import SuccessPage from './pages/SuccessPage';





function App() {
  return (
  
    <Routes>
      <Route path="/" element={<Guestpage />}/>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tourDetails/:id" element={<TourDetail/>} />
      <Route path="/bookings" element={<Booking />} />
      <Route path="/Reviews" element={<Reviews />} />
      <Route path="/success" element={<SuccessPage/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    
     
    </Routes>
 
  
  );
}

export default App;

