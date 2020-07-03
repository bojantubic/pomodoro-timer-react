import React from "react";
import { Gear } from "./Icons";

export default function Header({ totalSessions, title, handleSettings }) {
  return (
    <header>
      <span>{totalSessions}</span>
      <h1>{title}</h1>
      <button onClick={() => handleSettings()}>
        <Gear />
      </button>
    </header>
  );
}
