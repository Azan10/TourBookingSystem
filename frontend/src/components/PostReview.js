
import { useState } from "react";
import PostReviewDialog from "./PostReviewDialog";

function PostReview({ imageURL,tourID }) {
    const [open, setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
    }

    return (
        <div className="flex relative  w-full mt-3 ">
            <div className="rounded w-20 h-30">
                <img className="rounded-full" src={imageURL} />
            </div>
            <div className="w-full">
                {/* Made the input read-only to indicate it's clickable */}
                <input onClick={openDialog} type="text" readOnly className="cursor-pointer  rounded-full pl-3 mt-4 ml-4 focus:border-blue-500 pr-20 w-full py-3 border" placeholder="Post Review" />
            </div>
            <PostReviewDialog  closeDialog={closeDialog} open={open} tourID={tourID} />
        </div>
    );
}

export default PostReview;
