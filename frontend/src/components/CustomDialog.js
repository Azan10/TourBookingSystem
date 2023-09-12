import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ControlledRating from './ControlledRating';

function CustomDialog({ handleEditClose, open, handleEditConfirm }) {
  const [reviewData, setReviewData] = useState({
    ReviewText: "",
    ReviewRating: 0
  });

  const handleReviewText = (event) => {
    setReviewData(prevData => ({
      ...prevData,
      ReviewText: event.target.value
    }));
  };

  const handleReviewRating = (value) => {
    console.log(value)
    setReviewData(prevData => ({
      ...prevData,
      ReviewRating: value
    }));
  };

  return (
    <div className="">
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the fields to edit reviews
          </DialogContentText>
          <div className="mt-2">
            <TextField
              autoFocus
              margin="dense"
              label="Review Text"
              type="text"
              fullWidth
              variant="standard"
              required
              value={reviewData.ReviewText}
              onChange={handleReviewText}
            />
          </div>
          <ControlledRating 
            handleReviewRating={handleReviewRating} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={() => handleEditConfirm(reviewData)}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialog;



