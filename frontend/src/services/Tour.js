import { readAllModel, readModel } from "./HandlerFactory";


export const getTours = (URL, searchQuery, selectedValue) => {
    console.log(selectedValue)
    if (selectedValue && searchQuery) {
      URL = `${URL}?tourName=${searchQuery}&sort=${selectedValue}`;
    } else if (selectedValue) {
        console.log('value selected')
      URL = `${URL}?sort=${selectedValue}`;
    } else if (searchQuery) {
      URL = `${URL}?tourName=${searchQuery}`;
    }
    console.log(URL);
    return readAllModel(URL);
  };


export const getTour=(url,id)=>
{
  console.log("just checking")
   return readModel(url,id)
}


  
  
