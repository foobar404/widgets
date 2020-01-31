import React, { useState } from 'react';
import { useLocalStorage } from "../../../hooks";
import { css } from "emotion";

import ReactPlayer from 'react-player';

const style = css`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    input{
        width: 80%;
        height:40px;
        background:black;
        border:none;
        color:white
    }
    

    &>div{
        width:80% !important;
        height:80% !important;
    }
`

export default function MediaPlayer() {

    const [url, setUrl] = useLocalStorage('https://www.youtube.com/watch?v=nr0ftlna-OE', "mediaPlayerURL");

    function handleChange(e) {
        setUrl(e.target.value);
    }

    return (
        <div className={style}>
            <input type="text" onChange={e => handleChange(e)} value={url} />
            <ReactPlayer url={url} />
        </div>
    )
}
