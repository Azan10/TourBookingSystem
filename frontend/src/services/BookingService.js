import { readAllModel } from "./HandlerFactory"

export const getBookings=(url)=>
{
    return readAllModel(url)
}