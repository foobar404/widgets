import React, { useState } from 'react';
import { useLocalStorage } from "../../../hooks";
import { FaTrashAlt } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md"
import { css } from "emotion";

const style = css`
    height:100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .todo{
        position: relative;
        height:80%;
        width:80%;
        backdrop-filter:blur(10px);
        overflow:hidden;

        header{
            width:100%;
            height:30%;
            
            h1{
                text-align: center;
                color:#000;
                font-weight:800;
            }

            .inputBox{
                width: 100%;
                height:60px;
                display: flex;
                justify-content: center;
                align-items: center;
                background:white;

                input{
                    width: 80%;
                    height:45px;
                    background:white;
                    border-radius:10px;
                    border:none;
                    box-shadow:inset 2px 0px 3px 1px #00000040;
                    padding-left:20px;
                }
            }
        }

        .items{
            height:65%;
            width:100%;
            overflow-y: auto;
            display: flex;
            flex-direction:column;
            align-items:center;

            .todoItem{
                height:45px;
                width: 90%;
                padding:5px 10px;
                background:white;
                border-radius:8px;
                margin-bottom:15px;

                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .todoItem:last-child{
                margin-bottom:50px;
            }
        }

        

        .buttonBox{
            position:absolute;
            bottom:0;
            left:0;
            width:100%;
            height:auto;
            display: flex;
            justify-content: center;
            align-items: center;
            background:linear-gradient(45deg, black, transparent);

            button{
                height:45px;
                width:45px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 15px;
                border:none;
                color:white;
                border-radius:50%;
            }

            .add{
                background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);

                svg{
                    height:80%;
                    width:80%;
                }
            }

            .clear{
                background-image: linear-gradient(to top, #09203f 0%, #537895 100%);

                svg{
                    height:60%;
                    width:60%;
                }
            }
        }
    }
`

export default function Todo() {
    const [text, setText] = useState("");
    const [todoItems, setTodoItems] = useLocalStorage([], "todoItems");

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleCheck(index) {
        setTodoItems(items => {
            return items.map((item, i) => {
                return (i == index) ? { ...item, checked: !item.checked } : item
            })
        });
    }

    function handleAdd() {
        setTodoItems([
            ...todoItems,
            { checked: false, text }
        ])
        wipeText();
    }

    function handleClear() {
        setTodoItems(items => {
            return items.filter(item => {
                return !item.checked
            })
        })
    }

    function wipeText() {
        setText("");
    }

    return (
        <div className={style}>
            <div className="todo">
                <header>
                    <h1>TODO</h1>
                    <div className="inputBox">
                        <input type="text" onChange={e => handleChange(e)} placeholder="remember to buy..." value={text} />
                    </div>
                </header>

                <div className="items">

                    {todoItems.map((item, i) => {
                        return (
                            <div className="todoItem" key={i}>
                                <p>{item.text}</p>
                                <input type="checkbox" onChange={_ => handleCheck(i)} checked={item.checked} />
                            </div>
                        )
                    })}

                </div>

                <div className="buttonBox">
                    <button className="clear" onClick={handleClear}><FaTrashAlt></FaTrashAlt></button>
                    <button className="add" onClick={handleAdd}><MdPlaylistAdd></MdPlaylistAdd></button>
                </div>

                <div className="fade"></div>

            </div>
        </div>
    )
}
