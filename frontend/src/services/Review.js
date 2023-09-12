import { createModel, deleteModel, readAllModel, updateModel } from "./HandlerFactory"
export const createReview=(URL,data)=>
{
   console.log("jK")
   console.log(data)
    return createModel(URL,data)
}

export const readReviews=(URL)=>
{
   return  readAllModel(URL)
}


export const updateReview=(URL,id,data)=>
{
   return updateModel(URL,id,data)
}


export const deleteReview=(url,id)=>
{
   console.log(url)
   console.log(id)
     return deleteModel(url,id)
}