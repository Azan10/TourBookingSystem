

function TailwindButton({ label, onClick }) {
  return (

    <button onClick={onClick} className=" bg-orange-300 z-10 px-8 py-2 text-sm text-white-600 font-semibold rounded-full border border-orange-400 hover:text-white hover:bg-orange-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2">{label}</button>
  
 
  );
}

export default TailwindButton;


