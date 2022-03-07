import React from "react";
import { Link } from "react-router-dom"
import landingimg from "../img/landingimg.jpg"
import startbutton from "../img/startbutton.png"

export function LandingPage() {
    return (
        <div className="container-lp">
            <div className="div-lp">
                <img src={landingimg} className="Landingimg"></img>
            </div>

            <Link to="/home">
                <div className="startbutton"><img src={startbutton}></img></div>
            </Link>

        </div>
    )
}
export default LandingPage;