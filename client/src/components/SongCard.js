import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AuthContext from '../auth';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        if (store.currentList.ownerEmail === auth.user.email) event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        if (store.currentList.ownerEmail === auth.user.email) event.preventDefault();
    }

    function handleDragEnter(event) {
        if (store.currentList.ownerEmail === auth.user.email) {
            event.preventDefault();
            setDraggedTo(true);
        }
    }

    function handleDragLeave(event) {
        if (store.currentList.ownerEmail === auth.user.email) {event.preventDefault();
        setDraggedTo(false);}
    }

    function handleDrop(event) {
        if (store.currentList.ownerEmail === auth.user.email) {event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);}
    }
    function handleRemoveSong(event) {
        if (store.currentList.ownerEmail === auth.user.email) store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2 && store.currentList.ownerEmail === auth.user.email) {
            console.log("double clicked");
            store.showEditSongModal(index, song);
        }
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <Button
                sx={{transform:"translate(-5%, -5%)", width:"5px", height:"30px"}}
                variant="contained"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleRemoveSong} disabled = {store.currentList.published}>{"\u2715"}
                </Button>
        </div>
    );
}

export default SongCard;