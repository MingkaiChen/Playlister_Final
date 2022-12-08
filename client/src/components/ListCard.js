import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import AuthContext from '../auth';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PublishIcon from '@mui/icons-material/Publish';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            // store.setCurrentList(id);
        }
    }

    function handleLoadListandSet(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            store.getMyLists();
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleEditList(event) {
        store.setEditList(idNamePair._id, true);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let editButton = "";

    if ((auth.user && auth.user.email === idNamePair.email) || idNamePair.published) {
        editButton =
            <IconButton
                id={"edit-list-" + idNamePair._id}
                onClick={handleEditList}
                aria-label='edit'
            >
                <VisibilityIcon style={{ fontSize: '24pt' }} />
            </IconButton>
    }

    let delButton = "";
    if (auth.user && auth.user.email === idNamePair.email) {
        delButton =
            <IconButton
                id={"delete-list-" + idNamePair._id}
                onClick={(event) => handleDeleteList(event, idNamePair._id)}
                aria-label='delete'
            >
                <DeleteIcon style={{ fontSize: '24pt' }} />
            </IconButton>
    }

    function handleLikes(event) {
        store.addLike(idNamePair._id);

    }

    function handleDislikes(event) {
        store.addDislike(idNamePair._id);
    }

    let likesbuttons = "";
    let dislikesbuttons = "";
    if (idNamePair.published) {
        likesbuttons = 
        <IconButton onClick={(event) => handleLikes(event)}>
            <ThumbUpIcon style={{ fontSize: '18pt' }} />
        </IconButton>
        dislikesbuttons =
        <IconButton onClick={(event) => { handleDislikes(event) }} >
            <ThumbDownIcon style={{ fontSize: '18pt' }} />
        </IconButton>
    }

    let publishButton = "";
    if (auth.user && auth.user.email === idNamePair.email && !idNamePair.published) {
        publishButton =
            <IconButton onClick={(event) => { store.publishList(idNamePair._id) }} >
                <PublishIcon style={{ fontSize: '22pt' }} />
            </IconButton>
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ borderRadius: "25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={{ transform: "translate(1%,0%)", width: '98%', fontSize: '48pt' }}
            button
            onClick={(event) => {
                handleLoadListandSet(event, idNamePair._id)
            }}
            onDoubleClick={idNamePair.published ? (event) => { handleEditList(event) } : (event) => { handleToggleEdit(event) } }
        >
            <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '15pt' }}>
                <b>{idNamePair.name}</b> <br />
                By: {idNamePair.owner} <br />
                {idNamePair.published ? <div>Published: {idNamePair.publishedDate.slice(0,10)}</div> : null}
            </Box>
            <Box sx={{ p: 1, fontSize: "18pt" }}>{likesbuttons}{idNamePair.published? idNamePair.likes : null}</Box>
            <Box sx={{ p: 1, fontSize: "18pt" }}>{dislikesbuttons}{idNamePair.published? idNamePair.dislikes : null}</Box> 
            <Box sx={{ p: 1 }}>
                {editButton}
            </Box>
            <Box sx={{ p: 1 }}>
                {publishButton}
            </Box>
            <Box sx={{ p: 1 }}>
                {delButton}
            </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 48 } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;