import GlobalStoreContext from "../store";
import { useContext } from "react";

import { Box } from "@mui/system";


export default function CommentList() {
    const { store } = useContext(GlobalStoreContext);

    let commentCards = "";
    if (store.currentList) {
        commentCards = store.currentList.comments.map(Pair => (
            <div className='comment-card'>
                <div>{Pair.ownerName}: </div>
                <div>{Pair.comment}</div>
            </div>
        ))
    }

    function handleEnter(event) {
        if (event.code === "Enter") {
            let text = event.target.value;
            store.addComment(store.currentList._id, text);
        }
    }

    return (
        <div className="comment-list">
            <div className='comment-card-list'>
                <div className='comment-cards'></div>
                {commentCards}
            </div>
            <Box sx={{ transform: "translate(100%, 0%" }}>
                <input type="text" placeholder="Add Comment..." onKeyPress={handleEnter} ></input>
            </Box>
        </div>
    )

}