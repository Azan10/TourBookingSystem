function DropDown({selectedValue,setSelectedValue})
{
    
 
  const handleDropdown=(event)=>
    {
    
        setSelectedValue(event.target.value)
    }
  return(
     <select className="w-36" defaultValue="" onChange={handleDropdown}>
        <option value="" disabled>Sort by</option>
        <option value="">Default</option>
        <option value="Price">Price</option>
        <option value="Rating">Rating</option>
     </select>
  )
}

export default DropDown