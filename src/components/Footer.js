import React from "react";

export default function Footer({ isWorkTime, startTimer, startBreak, pauseTimer, stopTimer }) {
  return (
    <footer>
      <button onClick={isWorkTime ? startTimer : startBreak}>start</button>
      <button onClick={pauseTimer}>pause</button>
      <button onClick={stopTimer}>stop</button>
    </footer>
  );
}
