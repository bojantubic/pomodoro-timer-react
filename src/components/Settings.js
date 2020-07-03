import React from "react";
import { Checked, Unchecked } from "./Icons";

export default function Settings({
  timeWork,
  handleTimeWork,
  timeBreak,
  handleTimeBreak,
  handleSound,
  soundOn,
}) {
  return (
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
            step="300"
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
            min="300"
            max="1800"
            step="300"
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
  );
}
