import widgets from "./components/widgets/data";
import { useCheckStorage } from "./hooks";

export const initialState = {
    widgets: widgets,
    activeWidgets: useCheckStorage([], "activeWidgets"),
    toolboxWidgets: widgets,
    globalBackground: `url(https://source.unsplash.com/random) 100% / cover no-repeat fixed`
};

function save(data, name) {
    localStorage.setItem(name, JSON.stringify(data));
    return data;
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_WIDGET":
            save([...state.activeWidgets, action.payload], "activeWidgets");

            return {
                ...state,
                activeWidgets: [...state.activeWidgets, action.payload]
            }

        case "REMOVE_WIDGET":
            save(state.activeWidgets.filter((w, i) => i != action.payload), "activeWidgets");

            return {
                ...state,
                activeWidgets: state.activeWidgets.filter((w, i) => i != action.payload)
            }

        case "FILTER_TOOLBOX_WIDGETS":
            let filtered = state.widgets.filter(w => {
                return w.description.includes(action.payload);
            })
            return {
                ...state,
                toolboxWidgets: filtered
            }
        case "UPDATE_BACKGROUND":
            return {
                ...state,
                globalBackground: action.payload
            }
        default:
            return { ...state }
    }

}