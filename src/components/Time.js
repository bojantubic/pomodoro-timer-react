import React from "react";

export default function Time({ minutes, seconds }) {
  return (
    <time>
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </time>
  );
}
