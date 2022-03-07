import React from "react";

export default function Card({ img, name, genres }) {
    return (
        <div className="videogames-card">
            <div className="container-img-vg">
                <img src={img} alt="Image not found"></img>
            </div>
            <div className="videogames-name">
                <div className="div-name">
                    <h3>{name}</h3>
                </div>
                <div className="div-genres">
                    <span>Genres:</span>
                    <div>{genres && genres.map((g, index) => {
                        if (index === genres.length - 1) {
                            return <span key={g.id}>{g.name}</span>
                        }
                        return <span key={g.id}>{g.name}{", "}</span>
                    })}</div>
                </div>
            </div>
        </div>
    )
}