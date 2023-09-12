function TailwindButton4({ label, onClick, }) {
    return (
    <div className="w-full  flex  justify-center">
      <button onClick={onClick} className=" w-30 mt-10 bg-gray-300 z-10 px-10 py-3 text-sm text-white-600 font-semibold rounded-full border hover:text-white hover:bg-orange-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2">{label}</button>
      </div>
   
    );
  }
  
  export default TailwindButton4;