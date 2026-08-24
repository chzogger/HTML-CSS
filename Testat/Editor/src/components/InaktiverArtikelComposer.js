import React from "react";

export default function InaktiverArtikelComposer({ beiClick }) {
    return (
        <div className="Row ListRow Spacer" onClick={beiClick}>
            <h1 className="Title">
                <span className="Emphasis">Neuen <b>Artikel</b> erstellen</span>
                <div className="Badge">Neuer Artikel</div>
            </h1>
            <p>Klick hier für einen neuen Artikel.</p>
        </div>
    );
}
