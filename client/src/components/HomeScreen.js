import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import FunctionSelector from './FunctionSelector'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard =
            <List sx={{ width: '100%', bgcolor: 'background.paper', mb: "20px" }}>
                {
                    store.idNamePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))

                }
                <Fab sx={{ transform: "translate(1150%, 10%)" }}
                    color="primary"
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
            </List>;
    }
    return (
        <div id="playlist-selector">
            {/* <div id="list-selector-heading">
                <Fab sx={{ transform: "translate(-20%, 0%)" }}
                    color="primary"
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                Your Playlists
            </div> */}
            {/* <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </Box> */}
            <Grid2 container spacing={0} sx={{ bgcolor: "background.paper" }} id="list-grids">
                <Grid2 item xs={6}>
                        {
                            listCard
                        }
                </Grid2>
                <Grid2 item xs={6}>
                        {
                            <FunctionSelector />
                        }
                </Grid2>
            </Grid2>
            <MUIDeleteModal />
        </div>
        )
}

export default HomeScreen;