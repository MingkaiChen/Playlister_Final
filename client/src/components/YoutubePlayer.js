import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import YouTube from "react-youtube";

import { IconButton, Box } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

export default function YoutubePlayer() {
    const { store } = useContext(GlobalStoreContext);
    const [index, setIndex] = useState(0);
    const songTitle = "";
    const artist = "";
    const playlistName = "";
    let player;
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let size = 0;
    let playlist = [];
    let name = [];
    let art = [];

    if (store.currentList != null) {
        size = store.currentList.songs.length;
    }
    for(let i = 0 ; i < size ; i++){
        playlist[i] = store.currentList.songs[i].youTubeId;
        name[i] = store.currentList.songs[i].title;
        art[i] = store.currentList.songs[i].artist;
    }


    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        width: '100%',
        height: 400,
        playerVars: {
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[index];

        console.log("song " + song);
        
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        if (index+1 != playlist.length) {
        setIndex((index+1)% playlist.length);
        } else {
            setIndex(0);
        }
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function decSong() {
        if (index-1 < 0) {
            setIndex(playlist.length% playlist.length);
        
        } else {
            setIndex((index-1)% playlist.length);
        }
        currentSong--;
        currentSong = currentSong % playlist.length;
    }

    function handlePlay(event){
        player.playVideo();
        
    }

    function handleStop(event){
        player.stopVideo();
    }

    function handlePlayPrevious(event){
        decSong();
        loadAndPlayCurrentSong(player);
    }

    function handlePlayNext(event){
        incSong();
        loadAndPlayCurrentSong(player);
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        player = event.target;
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    if(store.currentList !== null){
    return (<div>
        <YouTube
        videoId={playlist[index]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} 
        />
            Playlist: {store.currentList.name} 
            <br></br>
            Song #: {index+1}
            <br></br>
            Title: {store.currentList.songs[index].title}
            <br></br>
            Artist: {store.currentList.songs[index].artist}
            <br></br>
            <Box sx= {{bgcolor: "darkgray", borderRadius: "25px", width : "40%", transform: "translate(55%, 0%)"}}>
            <IconButton onClick={(event) => {handlePlayPrevious(event)}}><SkipPreviousIcon/></IconButton>
            <IconButton onClick={(event) =>{handleStop(event)}}><StopIcon/></IconButton>
            <IconButton onClick={(event) => {handlePlay(event)}}><PlayArrowIcon/></IconButton>
            <IconButton onClick={(event) => {handlePlayNext(event)}}><SkipNextIcon/></IconButton>
            </Box>
        </div>)
    } else {
        return (<div>
        <YouTube
        videoId={ "dQw4w9WgXcQ" }
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} 
        />
            Playlist: None
            <br></br>
            Song #: None
            <br></br>
            Title: None
            <br></br>
            Artist: None
            <br></br>
            <Box sx= {{bgcolor: "darkgray", borderRadius: "25px", width : "30%", transform: "translate(110%, 0%)"}}>
                <IconButton onClick={(event) => {handlePlayPrevious(event)}}><SkipPreviousIcon/></IconButton>
                <IconButton onClick={(event) =>{handleStop(event)}}><StopIcon/></IconButton>
                <IconButton onClick={(event) => {handlePlay(event)}}><PlayArrowIcon/></IconButton>
                <IconButton onClick={(event) => {handlePlayNext(event)}}><SkipNextIcon/></IconButton>
            </Box>
        </div>)

    }
}