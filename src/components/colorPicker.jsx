import { useState } from "react";
import { SketchPicker } from "react-color";

function ColorPicker(props) {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("#000000");

  function backgroundClick() {
    setShow(false);
  }

  return (
    <div className="z-10">
      <div
        className="w-8 h-8 p-2 cursor-pointer rounded border-2 border-gray-300"
        onClick={() => {
          setShow(true);
        }}
        style={{ backgroundColor: `${color.hex}` }}
      ></div>

      <div
        className={`fixed top-0 left-0 z-40 w-screen h-screen ${
          show ? "block" : "hidden"
        }`}
        onClick={backgroundClick}
      ></div>

      <div
        className={`absolute z-50 ${show ? "block" : "hidden"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <SketchPicker
          color={color}
          onChange={(color) => {
            setColor(color);
          }}
          onChangeComplete={(color) => {
            props.insertTex(`$\\color{${color.hex}}{}$`);
          }}
        />
      </div>
    </div>
  );
}

export default ColorPicker;
