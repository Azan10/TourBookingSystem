import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { getTour } from "../services/Tour";
import Usernav from '../components/Usernav';
import { readReviews } from '../services/Review';
import Ratingicon from '../components/Ratingicon';
import TailwindButton3 from '../components/TailwindButton3';
import PostReview from '../components/PostReview';
import { bookTour } from '../services/Stripe';



function TourDetail() {
  const url = "http://localhost:3000/tour";
  const stripeURL="http://localhost:3000/checkout-session"
  const { id } = useParams();
  const reviewURL = `http://localhost:3000/tour/${id}/reviews`;
  const [tourData, setTourData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [imageURL,setImageURL]=useState()


  useEffect(() => {
    const fetchData = async () => {
      const response = await getTour(url, id);
      setTourData(response);
    };
    const fetchReviews = async () => {
      const response = await readReviews(reviewURL);
      setReviews(response);
    }
    fetchData();
    fetchReviews();
  }, [id]);

  const getImageURL=(value)=>
  {
      setImageURL(value)
  }
  console.log("just checking")

 console.log(imageURL)

 const settings = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 2, // Default to 2 slides
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
      {
          breakpoint: 1024, // This is typically the breakpoint for tablets and below
          settings: {
              slidesToShow: 1,  // Show only 1 slide for smaller screens
              slidesToScroll: 1
          }
      }
  ]
};


  const handleBuy=async()=>
  {
    console.log("button pressed")
    await bookTour(stripeURL,id)
  }
  
  console.log(tourData)

  return (
    <div className="flex md:flex-row">
      <div className="bg-black">
        <Usernav getImageURL={getImageURL} />
        </div>
        <div className="   grid grid-cols-1 md:grid-cols-2 min-h-screen relative overflow-x-hidden bg-red-100 md:grid-rows-2 "
         style={{ backgroundImage:  `url('/images/dashboard.jpg')`, }}>
        
        
            {!tourData ? (
                <p>loading</p>
            ) : (
                <>
                    <div className="mt-6 w-full h-auto flex flex-col md:w-auto">
                        <img className="w-full h-full object-cover" src={tourData.data.imageURL} alt="Tour Image"></img>
                       <div className="cursor-pointer">
                        <TailwindButton3 label={"Buy Now"} onClick={handleBuy}/>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-3  md:col-start-2 text-white md:p-0">
                        <p className="font-bold text-center p-3 ">{tourData.data.Name}</p>
                        <p className="p-10">{tourData.data.tourDescription}</p>
                        <div className="flex flex-col">
                            <div className="flex p-6 justify-between">
                                <p>${tourData.data.Price}</p>
                                <div className="flex">
                                    <Ratingicon value={tourData.data.AverageRating}/>
                                    <p>{tourData.data.AverageRating}</p>
                                </div>  
                            </div>
                            <div className="flex p-6 justify-between">
                                <div className="flex">
                                    <p>{tourData.data.NumberofBooking}</p>
                                    <PeopleIcon/>
                                </div>
                                <div className="flex">
                                    <p>{tourData.data.Startinfo.StartingDate}</p>
                                    <CalendarMonthIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {!reviews ? (
                <p>Loading</p>
            ) : (
                <div className=" w-full   md:col-span-2 md:pt-20 ml-4  ">
                    <Slider {...settings}>
                        {reviews.map((value, key) => (
                            <div key={key} className="w-full  flex">
                                <div className="md:w-3/4 md:h-1/2   bg-gray-200 mb-20  p-4 md:p-10 flex justify-center flex-col">
                                    <div className="flex relative md:ml-8  ">
                                        <img className="object-cover rounded-full w-1/4 h-1/4" src={value.User.imageURL} alt="Review User" />
                                        <p className="w-full p-2 md:p-6">"{value.ReviewText}"</p>
                                    </div>
                                    <div className="flex  justify-between  ">
                                     
                                        <p className="  md:pl-10 md:w-1/4 pr-2 text-center">{value.User.Fullname}</p>
                                      
                                        <Ratingicon value={value.ReviewRating}/>
                                     
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <footer className="absolute bottom-0 w-full">
                        <PostReview imageURL={imageURL} tourID={id} />
                    </footer>
                </div>
            )}
        </div>
    </div>
);
                        }

export default TourDetail;






        
       







