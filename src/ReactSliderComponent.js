import ReactSlider from "react-slider";
import React, { useState } from "react";

//function ReactSliderComponent(props) {
export const ReactSliderComponent = React.memo((props) => {
  const [value, setValue] = useState(props.value);

  function handleChange(e) {
    setValue(e);
    props.setValue(e);
    //settingsInfo.setWorkMinutes(e);
  }

  return (
    <>
      <label>work: {value}:00</label>
      <ReactSlider
        className={`slider ${props.color}`}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={value}
        onChange={(e) => handleChange(e)}
        min={props.min}
        max={props.max}
      />
    </>
  );
});

export default ReactSliderComponent;
