
function Form({ inputConfigs }) {
  return (
        <>
          {inputConfigs.map((value, key) => (
              <input 
                  key={value.name}
                  type={value.type} 
                  className={value.className} 
                  placeholder={value.placeholder} 
                  name={value.name} 
                  onChange={value.onChange}
                  required
                  minLength={value.minLength}
                  pattern={value.pattern}
                  
              />
            
          ))}
          </>
           
         
  );
}

export default Form;

  
  