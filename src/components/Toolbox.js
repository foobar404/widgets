import React, { useState, useContext } from 'react';
import { dataMap } from "./widgets/data";
import { Context } from "../App"
import { css } from "emotion";
import axios from "axios";

import { FiGrid } from 'react-icons/fi';
import { CirclePicker } from 'react-color';

const style = css`
    z-index:100;
    position:fixed;
    top:0;
    right:0;

    display: flex;
    align-items: center;
    justify-content: center;

    width:300px;
    height:60px;

    &>button{
        display: flex;
        cursor: pointer;
        justify-content: space-between;
        align-items: center;
        border-radius:30px;
        border:none;
        height:70%;
        width: 100%;
        border:1px solid #4b4bff;
        background: linear-gradient(27deg, #00c6fb 0%, #005bea 100%);

        &:hover i,&:hover span svg{
            color:white;
        }

        i{
            white-space:pre;
            margin-right:10px;
            color:#333;
            font-weight:700;
            transition:.35s ease;
        }

        span{
            border-radius:50%;
            height:30px;
            width:30px;

            display: flex;
            justify-content: center;
            align-items: center;

            background:#4b4bff;
            box-shadow:-2px 1px 8px 0px #00000096;

            svg{
                color:#333;
                transition:.35s ease;
            }
            
        }

        &:focus{
            outline:none;
        }
    }

    section{
        position:fixed;
        top:60px;
        right:0;
        width:40vw;
        max-width:400px;
        backdrop-filter:blur(10px);
        border-radius:18px;
        overflow:hidden;
    }

    #widgetPopup{
        height:80vh;
        
        .Search{
            height:40px;
            width:100%;
            border:none;
            background:black;
            color:white;
            padding-left:20px;

            &:focus{
                outline:none;
            }
        }

        #widgetBox{
            height:calc(100% - 40px);
            width:100%;
            overflow-y:auto;
            overflow-x:hidden;

            display: flex;
            flex-wrap:wrap;
            justify-content: center;
            align-content:flex-start;

            .widget{
                border-radius:12px;
                cursor: pointer;
                background:#ffffff54;
                margin: 10px 0;
                padding: 10px;
            }

          
        }
    }

    #backgroundPopup{
        min-height:300px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        form{
            display: flex;
            flex-direction:column;
            justify-content: center;

            input[type=text]{
                height:40px;
                width:100%;
                border:none;
                background:black;
                color:white;
                padding-left:20px;
            }

            label{
                padding:10px 0;
                background:#111;
                color:white;
                margin-top: 10px;
                font-weight:700;
            }
        }
        .circle-picker{
            margin-top: 30px;
            padding:0 0 10px 10px;
        } 
    
    }
`


export default function Toolbox(props) {
    const { state, dispatch } = useContext(Context);
    const widgets = state.toolboxWidgets;
    const [displayVar, setDisplayVar] = useState({
        background: "none",
        widgets: "none"
    });
    const COLORS = ["#001f3f", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970",
        "#2ECC40", "#01FF70", "#FFDC00", "#FF851B", "#FF4136", "#85144b", "#F012BE", "#B10DC9", "#111111", "#AAAAAA", "#DDDDDD"]

    function handleClick(key) {
        setDisplayVar({
            ...displayVar,
            [key]: (displayVar[key] == "none") ? "" : "none"
        })
    }

    function callAddWidget(widget) {
        dispatch({
            type: "ADD_WIDGET",
            payload: widget
        })
    }

    function handleChange(type, e) {
        switch (type) {
            case "random":
                dispatch({
                    type: "UPDATE_BACKGROUND",
                    payload: "url(https://source.unsplash.com/random) 100% / cover no-repeat fixed"
                })
                break;
            case "bing":
                dispatch({
                    type: "UPDATE_BACKGROUND",
                    payload: "url(https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN) 100% / cover no-repeat fixed"
                })
                break;
            case "grayscale":
                dispatch({
                    type: "UPDATE_BACKGROUND",
                    payload: "url(https://picsum.photos/2000/3000?grayscale) 100% / cover no-repeat fixed"
                })
                break;
            case "url":
                dispatch({
                    type: "UPDATE_BACKGROUND",
                    payload: `url(${e.target.value}) 100% / cover no-repeat fixed`
                })
                break;
            case "color":
                dispatch({
                    type: "UPDATE_BACKGROUND",
                    payload: e.hex
                })
                break;
        }
    }

    return (
        <nav className={style}>

            <button onClick={() => handleClick("background")}>
                Background
            </button>

            <section id="backgroundPopup" style={{ display: displayVar.background }}>
                <form onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder="enter image url for background" onChange={e => handleChange("url", e)} />

                    <label htmlFor="">Random</label>
                    <input type="radio" name="background" value="random" onChange={_ => handleChange("random")} />

                    <label htmlFor="">Random Grayscale</label>
                    <input type="radio" name="background" value="grayscale" onChange={_ => handleChange("grayscale")} />

                    <label htmlFor="">Bing Daily Image</label>
                    <input type="radio" name="background" value="bing" onChange={_ => handleChange("bing")} />

                </form>

                <CirclePicker colors={COLORS} onChangeComplete={c => handleChange("color", c)} />
            </section>

            <button onClick={() => handleClick("widgets")}>
                <i>View All Widgets</i>
                <span><FiGrid></FiGrid></span>
            </button>

            <section id="widgetPopup" style={{ display: displayVar.widgets }} >
                <Search />
                <div id="widgetBox">
                    {widgets.map((obj, i) => {
                        const { h, w, c } = obj;
                        const Widget = dataMap[c];
                        return (
                            <div className={`widget`}
                                key={i}
                                onClick={_ => callAddWidget(obj)}
                                style={{ height: `${h * 50}px`, width: `${w * 25}%` }}
                            >
                                {< Widget />}
                            </div>
                        )
                    })}
                </div>
            </section>

        </nav >
    )
}


function Search(props) {

    const { dispatch } = useContext(Context);

    function handleChange(e) {
        dispatch({
            type: "FILTER_TOOLBOX_WIDGETS",
            payload: e.target.value.toLowerCase()
        })
    }

    return (
        <input className="Search" onChange={e => handleChange(e)} type="search" placeholder="Search for Widget . . . " />
    )
}
