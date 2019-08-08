import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";

import Landing from "./pages/Landing";
import Ladder from "./pages/Ladder";
import Navbar from "./components/Navbar";
import CharacterProfile from "./pages/CharacterProfile";
import About from "./pages/About";

function App() {
    const [region, setRegion] = useState("eu");

    return (
        <div className="App">
            <Navbar region={region} setRegion={setRegion} />
            <Switch>
                <Route
                    path={process.env.PUBLIC_URL + "/"}
                    exact
                    component={props => <Landing {...props} region={region} />}
                />
                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/ladder"}
                    component={props => <Ladder {...props} region={region} />}
                />
                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/profile"}
                    component={props => (
                        <CharacterProfile {...props} region={region} />
                    )}
                />
                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/about"}
                    component={props => <About />}
                />
            </Switch>
        </div>
    );
}

export default App;
