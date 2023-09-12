import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function Ratingicon({value}) {
 

    return (
        <>
            <Rating 
                name="read-only" 
                value={value} 
                readOnly 
                icon={<StarIcon fontSize="inherit" />}
            />
        </>
    );
}

export default Ratingicon;

