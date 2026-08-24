import React from "react";
import ArtikelKarte from "./ArtikelKarte";

export default function ArtikelListe({ alleArtikel, beiLoeschen }) {
    if (alleArtikel.length === 0) {
        return <div className="Row ListRow">
            <p>Noch keine Artikel vorhanden.</p>
        </div>
    }

    return <div>
        {
            alleArtikel.map(
                (artikel) => {
                    return <ArtikelKarte artikel={artikel}
                        key={artikel.Id}
                        beiLoeschen={beiLoeschen} />
                }
            )
        }
    </div>
}
