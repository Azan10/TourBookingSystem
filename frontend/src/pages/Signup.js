import React, { useContext, useState } from 'react';
import {useNavigate} from "react-router-dom"
import TailwindSubmitbutton from "../components/TailwindSubmitbutton";
import Form from '../components/Form';
import { signUp } from '../services/AuthService';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



function Signup() {
    const URL="http://localhost:3000/signup"
    let token=""
    const navigate=useNavigate()
    const [User, setUser] = useState({
        Fullname: "", Email: "", Password: "", ConfirmPassword: ""
    });

    const [errorMessage,setErrorMessage]=useState("")

   

    const handleInputChange = (name) => (event) => {
        setUser({ ...User, [name]: event.target.value });
    };

    const inputConfigs = [
        { name: "FullName", type: "text", className: "block border border-grey-light w-full p-3 rounded mb-4", placeholder: "Full Name", onChange: handleInputChange("Fullname") },
        { name: "Email",  type: "email", className: "block border border-grey-light w-full p-3 rounded mb-4", placeholder: "Email", onChange: handleInputChange("Email") },
        { name: "Password", type: "password", className: "block border border-grey-light w-full p-3 rounded mb-4", placeholder: "Password", onChange: handleInputChange("Password"),minLength:8 },
        { name: "ConfirmPassword", type: "password", className: "block border border-grey-light w-full p-3 rounded mb-4", placeholder: "Confirm Password", onChange: handleInputChange("ConfirmPassword"), minLength:8 }
    ];

  
    const handleFormSubmit=async(event)=>
    {
        event.preventDefault()
       const response=await signUp(URL,User)
       if(response.token){
       token=response.token
       console.log(token)
        localStorage.setItem("token",token)
        navigate("/dashboard")
       }
       else{
        setErrorMessage(response)
       }

    }

 

    return (
        <div className="min-h-screen flex flex-col bg-cover h-screen"
            style={{ backgroundImage: `url('/images/formimage.jpg')` }}>
            
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-gray-200 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-6 text-3xl text-center">Sign up</h1>
                    
                    {errorMessage && (
                        <div className="flex  w-full">
                            <ErrorOutlineIcon className="text-center text-red-500 ml-11" />
                            <p className="text-center pb-3 pl-2 text-red-500">{errorMessage}</p>
                        </div>
                    )}
    
                    <form onSubmit={handleFormSubmit}>
                        <Form inputConfigs={inputConfigs} />
                        <TailwindSubmitbutton label={"submit"} />
                    </form>
    
                </div>
            </div>
        </div>
    );
    
                    }

        export default Signup


