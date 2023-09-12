import { readAllModel, updateModel, updateWithoutId } from "./HandlerFactory"


export const getUser=(URL)=>
{
   return readAllModel(URL)
}

export const updateUser=(URL,data)=>
{
   console.log("This is going to be the data")
   console.log(data)
   return updateWithoutId(URL,data)
}
