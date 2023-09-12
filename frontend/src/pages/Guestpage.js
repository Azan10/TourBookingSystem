import TailwindButton2 from "../components/TailwindButton2";
import TailwindButton3 from "../components/TailwindButton3";
import { useNavigate } from "react-router-dom";

function Guestpage() {

    const navigate=useNavigate()

    const handleLogin=()=>
    {
         navigate("/signin")
    }

    const handleLogout=()=>
    {
        navigate("/signup")
    }  




    return (

      
       
        <div 
        
            style={{ backgroundImage: `url('/images/main.png')` }}
            className="bg-cover bg-no-repeat bg-center h-screen grid grid-cols-1 justify-center items-center flex flex-col grid-rows-3 w-full absolute">

<div className="flex flex-col items-center relative top-20 ">
    <h1 className=" font-bold text-center text-white text-2xl pb-16 mb-2">UK Hiking & walking Trips</h1>
    <h1 className="font-bold text-center text-white text-4xl pb-16 mb-2">FOR THE ADVENTURER</h1>
    <h1 className="font-bold text-white text-center text-2xl">Book with us now!</h1>
</div>

               <div className="flex relative bottom-30  rows-span-3 row-start-3">
                <div className=" w-1/2 ">
                <TailwindButton3 label={"login"} onClick={handleLogin}/>
                </div>
                <div className="w-1/2 ">
                <TailwindButton3 label={"Signup"} onClick={handleLogout}/>
                </div>
                </div>
            
        </div>
    );
}

export default Guestpage;







