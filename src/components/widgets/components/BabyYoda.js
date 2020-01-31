import React from 'react'
import yoda from "../../../media/yoda.png";
import { css } from "emotion";

const style = css`  
    height:100%;
    width:100%;
    object-fit:contain;
`

export default function BabyYoda() {
    return (
        <img className={style} src={yoda} alt="baby yoda" onDragStart={(e) => e.preventDefault()} />
    )
}
