import ReactSlider from "react-slider";
import { useState } from "react";

function ReactSliderComponent(props) {
  const [value, setValue] = useState(props.value);

  function handleChange(e) {
    setValue(e);
    props.setValue(e);
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
        min={1}
        max={120}
      />
    </>
  );
}

export default ReactSliderComponent;
