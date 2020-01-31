import React from 'react';
import { useLocalStorage } from "../../../hooks";
import { css } from "emotion";

const style = css`
    height:100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;

    textarea{
        height:80%;
        width:80%;
        resize: none;
        background:white;
        color:black;
        overflow-y:auto;
        border-radius:14px;
    }
`

export default function Notepad() {
    const [text, setText] = useLocalStorage("", "notepadText");

    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <div className={style}>
            <textarea placeholder=". . ." value={text} onChange={e => handleChange(e)}></textarea>
        </div>
    )
}
