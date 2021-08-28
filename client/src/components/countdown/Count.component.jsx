import React, { useState } from "react";
import Clock from "./Clock.component";

const CountDown = (props) => {
  // let deadline = "march, 7, 2022";


  return (
    <div className="App">
      
      <Clock deadline={props.deadline} />
    </div>
  );
};

export default CountDown;
