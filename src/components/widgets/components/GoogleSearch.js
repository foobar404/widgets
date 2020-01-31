import React, { useState } from 'react';
import { useLocalStorage } from "../../../hooks";
import { css } from "emotion";

const style = css`
    height:100%;
    width:100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;

    input{
        border-radius:30px;
        border:1px solid #eee;
        height:30px;
        padding:5px 10px;
        width: 90%;

        &:focus{
            outline:none;
        }

        &:hover{
            box-shadow:0 1px 6px 0 rgba(32,33,36,0.28);
            border-color:rgba(223,225,229,0);
        }
    }

    button{
        border:none;
        background:#f3f3f3;
        color:#444;
        padding:9px 14px;

        &:hover{
            border:1px solid #c6c6c6;
            cursor:pointer;
        }
    }
`

export default function GoogleSearch() {
    const [query, setQuery] = useLocalStorage("", "googleQuery");

    function handleChange(e) {
        setQuery(e.target.value)
    }

    return (
        <div className={style}>
            <input type="text" onChange={(e) => handleChange(e)} placeholder="Google Search" value={query} />
            <a href={`https://www.google.com/search?q=${query}`} target="_blank">
                <button>Google Search</button>
            </a>
        </div >
    )
}
