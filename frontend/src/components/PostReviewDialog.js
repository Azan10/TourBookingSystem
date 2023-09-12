import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ControlledRating from './ControlledRating';
import { useState } from 'react';
import { createReview } from '../services/Review';

function PostReviewDialog({ closeDialog, open, tourID }) {
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(0); // Assuming rating is a number
  
    const URL = `http://localhost:3000/tour/${tourID}/reviews`;

    const handleClose = () => {
        closeDialog();
    };

    const handleReviewText = (e) => {
        setReviewText(e.target.value);
    };

    const handleReviewRating = (value) => {
        setReviewRating(value);
    };

    const handleSubmit = async () => {
        const data = {
            ReviewText: reviewText,
            ReviewRating: reviewRating
        };

        const response = await createReview(URL, data);
        closeDialog();
    };

    return (
        <div className="bg-red-100">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Post a Review</DialogTitle>
                <DialogContent className="m-10">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="review"
                        label="Your Review"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleReviewText}
                    />
                    <div className=" pt-5">
                        <ControlledRating handleReviewRating={handleReviewRating} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Post Review</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PostReviewDialog;



