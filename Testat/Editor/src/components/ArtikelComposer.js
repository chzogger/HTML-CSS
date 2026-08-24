import React from "react";

export default function ArtikelComposer({ alleArtikel, beiAbbrechen, beiSpeichern }) {
    const [artikelTitel, setArtikelTitel] = React.useState("");
    const [artikelText, setArtikelText] = React.useState("");

    const formularVollstaendig = artikelTitel && artikelText;

    const naechsteId = () => {
        const ids = alleArtikel.map((a) => Number(a.Id) || 0);
        return ids.length === 0 ? 1 : Math.max(...ids) + 1;
    };

    const saveGeklickt = () => {
        const summary =
            artikelText.length > 80 ? artikelText.substring(0, 80) + "..." : artikelText;

        const neuerArtikel = {
            Id: naechsteId(),
            Titel: artikelTitel,
            Summary: summary,
            Text: artikelText
        };

        beiSpeichern(neuerArtikel);
    };

    return (
        <div className="Row ArtikelComposer Spacer">
            <div className="Head">
                <h1 className="Title">
                    <input
                        className="Title"
                        autoFocus
                        name="titel"
                        type="text"
                        value={artikelTitel}
                        onChange={(e) => setArtikelTitel(e.target.value)}
                        placeholder="Der Titel des Artikels."
                    />
                </h1>
                <textarea
                    className="Description"
                    name="text"
                    value={artikelText}
                    onChange={(e) => setArtikelText(e.target.value)}
                    placeholder="Der Text des Artikels."
                    rows={4}
                />
            </div>

            <div className="ButtonBar">
                <button className="Button" onClick={saveGeklickt} disabled={!formularVollstaendig}>
                    Speichern
                </button>
                <button className="Button" onClick={beiAbbrechen}>Abbrechen</button>
            </div>
        </div>
    );
}
