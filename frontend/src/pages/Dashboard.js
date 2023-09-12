import React, { useEffect, useState } from "react";
import { getTours } from "../services/Tour";
import Usernav from "../components/Usernav";
import SearchBar from "../components/Searchbar";
import DropDown from "../components/Dropdown";
import { useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';

import TailwindButton from "../components/TailwindButton";


import LoadingScreen from "../components/LoadingScreen";

function Dashboard() {
 
    const URL = "http://localhost:3000/tour";
    const [tours, setTours] = useState([]);
    const [searchQuery,setSearchQuery]=useState("")
    const [selectedValue,setSelectedValue]=useState("")
    
    const navigate=useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTours(URL,searchQuery,selectedValue);
                setTours(response);
            } catch (error) {
                console.error("Error fetching tours:", error);
            }
        };

        fetchData();
    }, [searchQuery,selectedValue]);
 
    const handleClick=(id)=>
    {
        console.log(id)
        navigate(`/tourDetails/${id}`)
    }

    const onClick=()=>
    {
        console.log("Hello")
    }
    
        return (
            <div className="relative h-full min-h-screen">
                <div 
                    className="absolute inset-0 bg-cover bg-center z-negative" 
                    style={{ backgroundImage:  `url('/images/dashboard.jpg')`, zIndex: -1 }}
                ></div>
    
                <div className="flex flex-col justify-between items-center">
                    <div className="ml-8 pl-6">
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </div>
    
                    <div className="w-full mt-10 flex justify-end">
                        <DropDown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                    </div>
                </div>
    
                {/* Fixed navigation */}
                <div className="top-0 left-0 w-1/6 fixed bg-black h-full z-10">
                    <Usernav />
                </div>
                
                {/* Main content */}
                <div className="ml-[16%] mt-20">
                    <div className="flex flex-wrap justify-start p-4 gap-10 w-full">
                        {!tours ? (
                            <LoadingScreen />
                        ) : (
                            tours.map((value, key) => (
                                <div key={key} className="border backdrop-blur-xl bg-gradient-to-b text-white p-4 w-[300px] md:h-[360px] h-1/3 mt-10 hover:bg-gray-200 relative">
                                    <p className="text-lg font-semibold pb-5 pl-20">{value.Name}</p>
                                    <div className="h-1/2 w-full">
                                        <img className="object-cover w-full h-full" src={value.imageURL} alt={value.Name} />
                                    </div>
                                    <div className="flex md:pt-4 pb-14 pt-8">
                                        <div className="flex">
                                            <LocationOnOutlinedIcon sx={{color: "red[400]"}} />
                                            {value.Startinfo.LocationName}
                                        </div>
                                        <div className="ml-10 pl-8 flex">
                                            <CalendarTodayTwoToneIcon sx={{color: "red[400]"}} fontSize="small"/>
                                            {value.Startinfo.StartingDate}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 text-white left-6">
                                        <p>${value.Price}</p>
                                        <p>{Math.round(value.AverageRating)} rating</p>
                                    </div>
                                    <div className="absolute right-4 bottom-4 overflow-hidden">
                                        <TailwindButton label={'View details'} onClick={() => handleClick(value._id)} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
    
    export default Dashboard;
    