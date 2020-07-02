import React, { useState, useEffect, useRef } from "react";
import Gear from "./Gear";
import "./App.css";

function App() {
  useEffect(() => {
    document.querySelector("body").classList.add("work");
  }, []);

  // const timeWork = 25 * 60;
  // const timeBreak = 5 * 60;
  const timeWork = 2;
  const timeBreak = 10;
  const bodyClass = document.querySelector("body").classList;

  const [title, setTitle] = useState("start the timer");
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [time, setTime] = useState(timeWork);
  const [totalSessions, setTotalSessions] = useState(0);
  const intervalRef = useRef(null);

  const padStart = (time) => time.toString().padStart(2, 0);
  const minutes = padStart(Math.floor(time / 60));
  const seconds = padStart(time - minutes * 60);

  const startTimer = () => {
    if (intervalRef.current !== null) return;
    setTitle(() => "work time");
    bodyClass.remove("break");
    bodyClass.add("work");
    intervalRef.current = setInterval(() => {
      setTime((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        stopTimer();
        setTime(timeBreak);
        setTitle(() => "have a break");
        setIsWorkTime(false);
        setTotalSessions((prev) => prev + 1);
        bodyClass.remove("work");
        bodyClass.add("break");
        return 0;
      });
    }, 1000);
  };

  const startBreak = () => {
    if (intervalRef.current !== null) return;
    setTitle(() => "break time");
    bodyClass.remove("work");
    bodyClass.add("break");
    intervalRef.current = setInterval(() => {
      setTime((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        stopTimer();
        setTime(timeWork);
        setTitle(() => "back to work");
        setIsWorkTime(true);
        bodyClass.remove("break");
        bodyClass.add("work");
        return 0;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle(() => "keep going");
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle(() => "start the timer");
    setTime(timeWork);
    setIsWorkTime(true);
    bodyClass.remove("break");
    bodyClass.add("work");
  };

  const buttons = document.querySelectorAll("footer button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  return (
    <main>
      <header>
        <span>{totalSessions}</span>
        <h1>{title}</h1>
        <button>
          <Gear />
        </button>
      </header>

      <time>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </time>

      <footer>
        <button onClick={isWorkTime ? startTimer : startBreak}>start</button>
        <button onClick={pauseTimer}>pause</button>
        <button onClick={stopTimer}>stop</button>
      </footer>
    </main>
  );
}

export default App;
