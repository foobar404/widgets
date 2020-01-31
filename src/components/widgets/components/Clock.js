import React, { useState, useEffect } from 'react';
import { useLocalStorage } from "../../../hooks";
import { FaMoon, FaSun } from "react-icons/fa"
import { css } from "emotion";

const style = css`
    height:100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    time{
        font-size:.5in;
        text-align:center;
    }
    button{
        border:1px solid #0001;
        border-radius:50%;
        background:none;
        height:40px;
        width:40px;

        svg{
            height:90%;
            width:90%;
        }
    }
`

export default function Clock(props) {
    const [time, setTime] = useState("0:0:0");
    const [dark, setDark] = useLocalStorage("true", "clockDarkMode");

    useEffect(() => {
        setInterval(() => {
            let today = new Date();
            let h = today.getHours() % 12 || 12;
            let m = today.getMinutes();
            let s = today.getSeconds();
            m = (m < 10) ? `0${m}` : m;
            s = (s < 10) ? `0${s}` : s;

            setTime(`${h}:${m}:${s}`);
        }, 1000)
    }, [])

    function handleClick() {
        setDark(!dark)
    }

    let color = { color: dark ? "#000" : "#fff" };

    return (
        <div className={style} >
            <time style={color}>{time}</time>
            <button onClick={handleClick}>
                {dark ? <FaMoon style={color} /> : <FaSun style={color} />}
            </button>
        </div>
    )
}
