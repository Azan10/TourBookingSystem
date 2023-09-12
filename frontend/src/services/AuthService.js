
import axios from 'axios';

export const signUp = async (url, body) => {
   try {
      const response = await axios.post(url, body, {
         headers: {
            'Content-Type': 'application/json; charset=UTF-8'
         }
      });
      return response.data; 
   } catch (error) {
      return error.response.data.message
   }
}


export const signIn = async (url, body) => {
   try {
      const response = await axios.post(url, body, {
         headers: {
            'Content-Type': 'application/json; charset=UTF-8'
         }
      });
      return response.data; 
   } catch (error) {
       return error.response.data.message
     
   }
}







