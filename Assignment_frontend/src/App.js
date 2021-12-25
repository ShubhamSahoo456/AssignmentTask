import React from "react";
import { Route , BrowserRouter} from "react-router-dom";
import Register from "./Screens/Signup";
import Signin from "./Screens/Signin";
import Dashboard from "./Screens/Dashboard";
import Navbar from "./Components/Navbar";
import Error from "./Screens/Error";
import './index.css'


const App = () => {

    return(
        <>
        <BrowserRouter>
            <Navbar />
            <Route exact path="/" component={Register}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route component={Error}/>
        </BrowserRouter>
        </>
    )
}

export default App