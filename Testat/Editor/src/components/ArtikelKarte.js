import React from "react";

export default function ArtikelKarte({ artikel, beiLoeschen }) {
    const loeschenGeklickt = () => {
        beiLoeschen(artikel);
    };

    return <div className="Row KarteRow Spacer">
        <div className="Head">
            <h1 className="Title">
                {artikel.Titel}
                <div className="Badge">#{artikel.Id}</div>
            </h1>
            <div className="Description Emphasis">{artikel.Text}</div>
        </div>
        <div className="ButtonBar">
            <button className="Button" onClick={loeschenGeklickt}>Löschen</button>
        </div>
    </div>;
}
