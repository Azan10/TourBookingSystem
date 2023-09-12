import React, { useState } from 'react'; 
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

function ControlledRating({ handleReviewRating }) {
  const [realValue, setRealValue] = useState(0);

  return (
    <div>
      <Typography component="legend"></Typography>
      <Rating
        name="simple-controlled"
        value={realValue}
        onChange={(event, newValue) => {
          setRealValue(newValue);
          handleReviewRating(newValue);
        }}
      />
    </div>
  );
}

export default ControlledRating;


