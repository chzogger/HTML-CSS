import React from "react";
import ArtikelListe from "./ArtikelListe";
import InaktiverArtikelComposer from "./InaktiverArtikelComposer";
import ArtikelComposer from "./ArtikelComposer";

const BACKEND_URL = "http://localhost:5000/articles";

export default function ArtikelController() {
    const [alleArtikel, setAlleArtikel] = React.useState([]);
    const [composerAktiv, setComposerAktiv] = React.useState(false);

    const ladeArtikel = () => {
        fetch(BACKEND_URL)
            .then((response) => response.json())
            .then((json) => {
                setAlleArtikel(json);
            });
    };

    React.useEffect(ladeArtikel, []);

    const zeigeComposer = () => {
        setComposerAktiv(true);
    };

    const versteckeComposer = () => {
        setComposerAktiv(false);
    };

    const neuenArtikelSpeichern = (neuerArtikel) => {
        const kompletteListe = [...alleArtikel, neuerArtikel];
        setAlleArtikel(kompletteListe);
        setComposerAktiv(false);
        fetch(BACKEND_URL, {
            method: "POST",
            body: JSON.stringify(kompletteListe)
        });
    };

    const artikelLoeschen = (artikel) => {
        const kompletteListe = alleArtikel.filter((a) => a.Id !== artikel.Id);
        setAlleArtikel(kompletteListe);
        fetch(BACKEND_URL, {
            method: "POST",
            body: JSON.stringify(kompletteListe)
        });
    };

    return <div>
        <ArtikelListe alleArtikel={alleArtikel} beiLoeschen={artikelLoeschen} />
        {composerAktiv ? <ArtikelComposer
            alleArtikel={alleArtikel}
            beiAbbrechen={versteckeComposer}
            beiSpeichern={neuenArtikelSpeichern}

        /> : <InaktiverArtikelComposer beiClick={zeigeComposer}

        />

        }
    </div>

}
