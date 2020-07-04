import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Time from "./Time";
import Settings from "./Settings";
import Footer from "./Footer";
import sound from "../sound.mp3";
import "../App.css";

function App() {
  useEffect(() => {
    document.querySelector("body").classList.add("work");
  }, []);

  const bodyClass = document.querySelector("body").classList;

  const [title, setTitle] = useState("start the timer");
  const [timeWork, setTimeWork] = useState(1500);
  const [timeBreak, setTimeBreak] = useState(300);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [time, setTime] = useState(timeWork);
  const [totalSessions, setTotalSessions] = useState(0);
  const [activeSettings, setActiveSettings] = useState(false);
  const intervalRef = useRef(null);

  const padStart = (time) => time.toString().padStart(2, 0);
  const minutes = padStart(Math.floor(time / 60));
  const seconds = padStart(time - minutes * 60);

  const playSound = () => {
    const audio = new Audio(sound);
    soundOn && audio.play();
  };

  const startTimer = () => {
    if (intervalRef.current !== null) return;
    setTitle(() => "work time");
    bodyClass.remove("break");
    bodyClass.add("work");
    setTime((prevTime) => prevTime - 1);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= 1) return prevTime - 1;
        stopTimer();

        setTime(timeBreak);
        setTitle(() => "have a break");
        setIsWorkTime(false);
        setTotalSessions((prev) => prev + 1);
        setActiveSettings(false);

        bodyClass.remove("work");
        bodyClass.add("break");
        playSound();
        return 0;
      });
    }, 1000);
  };

  const startBreak = () => {
    if (intervalRef.current !== null) return;
    setTitle(() => "break time");
    bodyClass.remove("work");
    bodyClass.add("break");
    setTime((prevTime) => prevTime - 1);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= 1) return prevTime - 1;
        stopTimer();

        setTime(timeWork);
        setTitle(() => "back to work");
        setIsWorkTime(true);
        setActiveSettings(false);

        bodyClass.remove("break");
        bodyClass.add("work");
        playSound();
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
      <Header totalSessions={totalSessions} title={title} handleSettings={handleSettings} />

      {!activeSettings ? (
        <Time minutes={minutes} seconds={seconds} />
      ) : (
        <Settings
          className="form"
          timeWork={timeWork}
          handleTimeWork={handleTimeWork}
          timeBreak={timeBreak}
          handleTimeBreak={handleTimeBreak}
          handleSound={handleSound}
          soundOn={soundOn}
        />
      )}

      {activeSettings ? (
        <button onClick={handleSettingsButton} className="form__button">
          confirm
        </button>
      ) : (
        <Footer
          isWorkTime={isWorkTime}
          startTimer={startTimer}
          startBreak={startBreak}
          pauseTimer={pauseTimer}
          stopTimer={stopTimer}
        />
      )}
    </main>
  );
}

export default App;
