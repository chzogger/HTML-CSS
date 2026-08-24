import React from "react";
import ArtikelController from "./components/ArtikelController";

export default function App() {
    return <div className="Background">
        <div className="Header">
            <div className="Title">News-Redaktionstool</div>
        </div>
        <div className="Main">
            <ArtikelController />
        </div>
    </div>
}
