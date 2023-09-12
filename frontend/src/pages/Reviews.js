import React, { useState, useEffect } from 'react';
import { deleteReview, readReviews, updateReview } from '../services/Review';
import Usernav from '../components/Usernav';
import Searchbar from '../components/Searchbar';
import DeleteIcon from '../components/DeleteIcon';
import EditIcon from '../components/EditIconWrapper';
import ConfirmationDialog from "../components/Alert"; // Adjust the import path
import Ratingicon from '../components/Ratingicon';
import CustomDialog from '../components/CustomDialog';
import EmptyData from '../components/EmptyData';
import LoadingScreen from '../components/LoadingScreen';

function Reviews() {
  const [reviews, setReviews] = useState(null);
  const URL = "http://localhost:3000/user/reviews";
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [isEditing,setIsEditing]=useState(false)
  const [editedReviewId,setEditedReviewId]=useState("")
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readReviews(URL);
        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
  }, [selectedReviewId,editedReviewId]);

  const handleDeleteClick = (id) => {

    setSelectedReviewId(id);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    setSelectedReviewId(null);
  };

  const handleDeleteConfirm = async() => {
    await deleteReview(URL,selectedReviewId)
    setSelectedReviewId(null)
    setAlertOpen(false);
  };


  const handleEditClick = (id) => {
    setIsEditing(true);
    setEditedReviewId(id);
  };

  const handleEditClose = () => {
    setIsEditing(false);
    setEditedReviewId(null);
  };

  const handleEditConfirm=async(reviewData)=>
  {
    console.log(reviewData)
    await updateReview(URL,editedReviewId,reviewData)
    setEditedReviewId(null)
    setIsEditing(false)
  
  }

return (
    <div className="flex "
      style={{ backgroundImage:  `url('/images/dashboard.jpg')`, zIndex: -1 }}>
        <div className="bg-black">
      <Usernav />
      </div>
      <div className="flex flex-col  w-full">
       
        {!reviews ? (
          <LoadingScreen/>
        ) :
        reviews.length===0 ? (
        <EmptyData Message="No Reviews Posted"/>
        ): (

          reviews.map((value, key) => (
            <div key={key} className="  bg-gray-300 p-10 border border-black pl-30 relative">
              <div className="flex ">
                <p className="font-bold">{value.Tour.Name}:</p>
               
                <p className="ml-2">{value.ReviewText}</p>
             
              </div>
            
              <div className="mt-2 absolute  bottom-0 ">
                <Ratingicon value={value.ReviewRating}/>
              </div>
              <div className="absolute bottom-1 right-4 ">
                <EditIcon onClick={()=>handleEditClick(value._id)} style={{ cursor: 'pointer' }} />
                <DeleteIcon onClick={() => handleDeleteClick(value._id)} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          ))
        )}
      </div>
      {alertOpen && (
        <ConfirmationDialog
          open={alertOpen}
          onClose={handleAlertClose}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {isEditing &&(
       <CustomDialog
       open={isEditing}
       handleEditClose={handleEditClose}
       handleEditConfirm={handleEditConfirm}
       />
      )}
    </div>
  );
}

export default Reviews;






