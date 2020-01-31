import BabyYoda from "./components/BabyYoda";
import Clock from "./components/Clock";
import GoogleSearch from './components/GoogleSearch';
import MediaPlayer from "./components/MediaPlayer";
import Notepad from "./components/Notepad";
import Todo from "./components/Todo";

export const dataMap = {
    BabyYoda,
    Clock,
    GoogleSearch,
    MediaPlayer,
    Notepad,
    Todo
}

export default [
    { c: "BabyYoda", h: 3, w: 2, description: "baby yoda star wars" },
    { c: "Clock", h: 2, w: 4, description: "digital clock" },
    { c: "GoogleSearch", h: 3, w: 4, description: "google search" },
    { c: "MediaPlayer", h: 5, w: 4, description: "media player youtube twitch soundcloud" },
    { c: "Notepad", h: 3, w: 4, description: "notepad notes post-it postit notebook" },
    { c: "Todo", h: 7, w: 4, description: "todo checklist trello tasks" }
]