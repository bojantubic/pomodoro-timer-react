import React, { useState, useEffect, useRef } from "react";
import { Gear, Checked, Unchecked } from "./SVGs";
import "./App.css";

function App() {
  useEffect(() => {
    document.querySelector("body").classList.add("work");
  }, []);

  const bodyClass = document.querySelector("body").classList;

  const [title, setTitle] = useState("start the timer");
  const [timeWork, setTimeWork] = useState(3);
  const [timeBreak, setTimeBreak] = useState(3);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [time, setTime] = useState(timeWork);
  const [totalSessions, setTotalSessions] = useState(0);
  const [activeSettings, setActiveSettings] = useState(false);
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
        setActiveSettings(false);

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
        setActiveSettings(false);

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
    setActiveSettings(false);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setTitle(() => "start the timer");
    setTime(timeWork);
    setIsWorkTime(true);
    setActiveSettings(false);

    bodyClass.remove("break");
    bodyClass.add("work");
  };

  const handleSettings = () => {
    setActiveSettings((prev) => !prev);
  };

  const handleSound = () => {
    setSoundOn((prev) => !prev);
  };

  const handleTimeWork = (e) => {
    setTimeWork(e.target.value);
  };
  const handleTimeBreak = (e) => {
    setTimeBreak(e.target.value);
  };

  const handleSettingsButton = (e) => {
    e.preventDefault();
    setTime(timeWork);
    setActiveSettings(false);
    pauseTimer();
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
        <button onClick={() => handleSettings()}>
          <Gear />
        </button>
      </header>

      {!activeSettings ? (
        <time>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </time>
      ) : (
        <form className="form">
          <div className="form__block">
            <div className="form__block--left">
              <label className="form__label" htmlFor="work">
                work
              </label>
            </div>
            <div className="form__block--right">
              <input
                value={timeWork}
                onChange={handleTimeWork}
                type="range"
                id="work"
                name="work"
                min="900"
                max="3600"
                step="60"
              />
              <small>{Math.round(timeWork / 60)}</small>
            </div>
          </div>

          <div className="form__block">
            <div className="form__block--left">
              <label className="form__label" htmlFor="break">
                break
              </label>
            </div>
            <div className="form__block--right">
              <input
                value={timeBreak}
                onChange={handleTimeBreak}
                type="range"
                id="break"
                name="break"
                min="180"
                max="1800"
                step="60"
              />
              <small>{Math.round(timeBreak / 60)}</small>
            </div>
          </div>

          <div className="form__block">
            <div className="form__block--left">
              <label className="form__label" htmlFor="">
                sound
              </label>
            </div>
            <div onClick={handleSound} className="form__block--right">
              {soundOn ? <Checked /> : <Unchecked />}
            </div>
          </div>
        </form>
      )}

      {activeSettings ? (
        <button onClick={handleSettingsButton} className="form__button">
          confirm
        </button>
      ) : (
        <footer>
          <button onClick={isWorkTime ? startTimer : startBreak}>start</button>
          <button onClick={pauseTimer}>pause</button>
          <button onClick={stopTimer}>stop</button>
        </footer>
      )}
    </main>
  );
}

export default App;
