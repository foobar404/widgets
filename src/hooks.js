import React, { useState } from 'react';

export function useCheckStorage(initalValue, name) {
    return (localStorage[name] && localStorage[name] != "undefined") ? JSON.parse(localStorage[name]) : initalValue;
}

export function useLocalStorage(initalValue, name) {

    const [value, setValue] = useState(useCheckStorage(initalValue, name));

    function handleUpdate(newValue) {
        localStorage.setItem(name, JSON.stringify(newValue));
        setValue(newValue)
    }

    return [value, handleUpdate];

}
