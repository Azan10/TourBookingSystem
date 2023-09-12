import { useEffect, useState } from "react";
import { getBookings } from "../services/BookingService";
import Usernav from "../components/Usernav";
import moment from 'moment';
import EmptyData from "../components/EmptyData";

function Booking() {
    const [booking, setBooking] = useState(null);
    const URL = "http://localhost:3000/userBooking";

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBookings(URL);
            setBooking(response);
        };
        fetchData();
    }, []);
  
    return (
        <div className="flex">
            <div className="bg-black">
                <Usernav/>
                </div>
           
            {!booking ? (
                <p>Loading...</p>
            ) : booking.length === 0 ? (
             
                <EmptyData Message="No bookings yet"/>
            ) : (
                <div className="w-full"  style={{ backgroundImage:  `url('/images/dashboard.jpg')`, zIndex: -1 }}>
                    {booking.map((value, key) => (
                        <div key={key} className=" p-5 border mt-6 border-black bg-gray-300 ">
                            <p className="text-center font-bold mb-10">Booking ID: {value._id}</p>
                            <div className="flex ">
                                <div className="flex-1">
                                    <p>Tour : {value.Tour.Name}</p>
                                </div>
                                <div className="flex-1" >
                                    <p className="text-center">Price: $ {value.Tour.Price}</p>
                                </div>
                                <div className="flex-1  ">
                                    <p className="text-right">Date : {moment(value.date).format('Do-MMMM-YYYY')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Booking;


