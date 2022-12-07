import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

import YoutubePlayer from './YoutubePlayer'
import CommentList from './CommentList'

export default function FunctionSelector() {
    const { store } = useContext(GlobalStoreContext);

    if (store.functionSelector === "player")
        return <YoutubePlayer />
    else if (store.functionSelector === "comment")
        return <CommentList />
}