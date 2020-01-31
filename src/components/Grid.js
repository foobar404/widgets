import React, { useContext } from 'react';
import { dataMap } from "./widgets/data";
import { useLocalStorage } from "../hooks";
import { FaTrashAlt } from 'react-icons/fa';
import { Context } from "../App"
import { css } from 'emotion';

import GridLayout from 'react-grid-layout';

// import { WidthProvider, Responsive } from "react-grid-layout";
// const GridLayout = WidthProvider(Responsive);

const style = css`
    height:100% !important;
    width:100%;
    z-index:1;

    .widgetBox{
        overflow: hidden;
        position: relative;
        transition:.35s ease;

        &:hover{
            border:2px solid #006bff85;
            border-radius:10px;
            /* padding:30px; */
        }

        &:hover > .trash{
            opacity:1;
        }

        .trash{
            color:crimson;
            opacity:0;
            position: absolute;
            top:10px;
            right:10px;
            cursor: pointer;
            height:25px;
            width:25px;

            svg{
                height: 100%;
                width: 100%;
            }
        }
    }
`

export default function Grid() {
    const [layout, setLayout] = useLocalStorage({}, "grid-layout");
    const { state, dispatch } = useContext(Context);
    const widgets = state.activeWidgets.map((obj, i) => {
        const Widget = dataMap[obj.c];
        return (
            <div className="widgetBox" key={i} data-grid={{ x: 0, y: 0, w: obj.w, h: obj.h }}>
                <Widget />
                <i className="trash" onClick={e => handleDelete(i)}><FaTrashAlt /></i>
            </div>
        )
    })

    function handleDelete(index) {
        dispatch({
            type: "REMOVE_WIDGET",
            payload: index
        })
    }

    function onLayoutChange(gridLayout) {
        setLayout(gridLayout);
    }


    return (
        <GridLayout className={style} col={12} rowHeight={30} width={1200} height={2200} compactType={null}
            draggableCancel="input,textarea,button"
            onLayoutChange={(l) => onLayoutChange(l)}
            layout={layout}
        >
            {widgets}
        </GridLayout >
    )
}
