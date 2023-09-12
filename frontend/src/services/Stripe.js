import { loadStripe } from "@stripe/stripe-js";
import { readModel } from "./HandlerFactory";

const stripePromise = loadStripe("pk_test_51NnpGKKL9j6BsyVHR2yr8oxyGeDz9Dlr1l4T3xX79YWR1RqV8n4kRFic3fQXgc3qC5ayIjeQMpGAhu9HqpcE1T5Q00vc0iNzLm");

export const bookTour = async (url, tourId) => {
  try {
   
    const response = await readModel(url, tourId);
    

    const stripe = await stripePromise;


   
    await stripe.redirectToCheckout({
      sessionId: response.session.id  // Corrected the session ID path here
    });
    
   

  } catch (error) {
    console.error("Error booking the tour:", error);
  }
};


