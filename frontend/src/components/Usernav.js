import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState,useEffect} from "react";
import { getUser } from "../services/User";
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from "./FormDialog";
import axios from "axios";
import { Navigate } from "react-router-dom";



function Usernav({getImageURL}) {

  const [currentUser,setCurrentUser]=useState('')
  const [dialogStatus,setDialogStatus]=useState(false)
  const navigate=useNavigate()

  const url="http://localhost:3000/me"

  useEffect(()=>
  {
     const fetchData=async()=>
     {
         const response=await getUser(url)
         setCurrentUser(response)
         if(getImageURL && currentUser.imageURL )
         {
          console.log("you will hit this route ok")
            getImageURL(currentUser.imageURL)
         }
     }
     fetchData()
  
  },[dialogStatus,getImageURL])
   
  const openDialog=()=>
  {
    setDialogStatus(true)
  }

  const closeDialog=()=>
  {
    setDialogStatus(false)
  }

  const handleLogout=()=>
  {
    console.log("logout icon pressed")
    localStorage.clear()
    navigate("/",{replace:true})
    
    
  }

  



  return (
    
    <div className="min-h-screen flex     ">
     
        <div className="flex flex-col w-full sm:w-full justify-between  sm:p-8 bg-rounded-tr-lg  ">
    
            {/* This is the section for the image and the user.Fullname */}
            <div className="flex flex-col  items-center text-white mb-4"> {/* added margin-bottom for a little spacing */}
                <div className="flex    ">
                    <div className="w-24 sm:w-40 h-24 sm:h-40 overflow-hidden ml-2 rounded-full">
                        <img className="w-full h-full rounded-full object-cover" src={currentUser.imageURL} />
                    </div>
                    <EditIcon className="cursor-pointer" onClick={openDialog} />
                    <FormDialog dialogStatus={dialogStatus} closeDialog={closeDialog} />
                </div>
                <p className="mt-2  mb-2 text-sm sm:text-base text-center">{currentUser.Fullname}</p>
            </div>
          

            {/* Dashboard Navigation */}
            <div className="pb-8 sm:pb-16 text-white h-1 text-center flex flex-col items-center ">
                <Link to="/dashboard"><DashboardIcon className="w-4 sm:w-auto h-4 sm:h-auto" /></Link>
                <Link to="/dashboard" className="text-sm sm:text-base">Dashboard</Link>
            </div>

            {/* Bookings Navigation */}
            <div className="pb-8 sm:pb-16 h-1 text-center text-white  flex flex-col items-center ">
                <Link to="/bookings"><BookIcon className="w-4 sm:w-auto h-4 sm:h-auto" /></Link>
                <Link to="/bookings" className="text-sm sm:text-base">Bookings</Link>
            </div>

            {/* Reviews Navigation (assuming you have this) */}
            <div className="pb-8 sm:pb-16 h-2 text-center flex flex-col text-white items-center  ">
                <Link to="/reviews"><ReviewsIcon className="w-4 sm:w-auto h-4 sm:h-auto" /></Link> 
                <Link to="/reviews" className="text-sm sm:text-base">Reviews</Link>
            </div>

            {/* Sign Out */}
            <div className="text-center flex h-2 mb-9 flex-col text-white items-center ">
                <LogoutIcon className="cursor-pointer" onClick={handleLogout} />
                <p>Sign out</p>
            </div>

        </div>
    </div>
);



}

export default Usernav;

 