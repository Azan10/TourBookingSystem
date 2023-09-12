import {useState} from 'react';
import TailwindSubmitbutton from "../components/TailwindSubmitbutton"
import Form from '../components/Form';
import { signIn } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



function Signin() {

    const [enteredCredentials,setEnteredCredentials]=useState({
      Email:"",Password:""
    })
    const [errorMessage,setErrorMessage]=useState("")
    const URL="http://localhost:3000/login"
    const navigate=useNavigate()


    const handleInputChange=(name)=>(event)=>
    {
        setEnteredCredentials({...enteredCredentials,[name]:event.target.value})
    }
    const inputConfigs=[
        {name:"Email" , className:"block border border-grey-light w-full p-3 rounded mb-4" ,type:"email" ,placeholder:"Email" ,onChange:handleInputChange("Email")},
        {name:"Password",className:"block border border-grey-light w-full p-3 rounded mb-4",type:"password",placeholder:"Password" ,onChange: handleInputChange("Password")}
    ]

    const handleFormSubmit=async(event)=>
    {
        event.preventDefault()
       const response=await signIn(URL,enteredCredentials)
       if(response.token){
       const token=response.token
        localStorage.setItem("token",token)
        navigate("/dashboard")
       }
       else{
         setErrorMessage(response)
       }

    }
    
  

 
    return (
        <div className="bg-red-100 min-h-screen flex flex-col bg-cover "
        style={{ backgroundImage: `url('/images/formimage.jpg')` }}
        >
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-gray-300 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-4 text-3xl text-center">Sign in</h1>
                    {errorMessage && (
                        <div className="flex  w-full">
                            <ErrorOutlineIcon className="text-center text-red-500 ml-11" />
                            <p className="text-center pb-3 pl-2 text-red-500">{errorMessage}</p>
                        </div>
                    )}
                    <form onSubmit={handleFormSubmit}>
                
                   <Form inputConfigs={inputConfigs}/>
                   
                   <TailwindSubmitbutton label={"Login"}/>
                   </form>
                </div>
            </div>
        </div>
    );
}

export default Signin;