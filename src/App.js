import React, { useState } from 'react';
import './App.css';
import MapComponent from "./views/MapComponent";
import Offline from "./views/Offline";

import logo from "./logo.png";
import settings from "./settings.svg";
import back from "./back.png";

function App() {
    const [offlineMenu, setOfflineMenu] = useState(false);

    const infoHandler = () => {
        console.log("Info button pressed");
        setOfflineMenu(true);
    };
    const backHandler = () => {
        console.log("Back button pressed");
        setOfflineMenu(false);
    };

    let menu = (
        <div className="App">
            <MapComponent/>
            <button className="Button OfflineInfoButton" onClick={infoHandler}> <img src={logo} className="Image"/> </button>
            <button className="Button SettingsButton"> <img src={settings} className="Image"/> </button>
        </div>
    );
    if (offlineMenu) {
        menu = (
            <div className="App">
                <Offline/>
                <button className="Button BackButton" onClick={backHandler}> <img src={back} className="Image"/> </button>
            </div>
        )
    }

    return menu;
}

export default App;
