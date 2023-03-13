import React, { useState } from "react";
import square from "../icons/square.svg";
import line from "../icons/line.png";
import paint from "../icons/paint.png";
import eraser from "../icons/eraser.png";
import image from "../icons/image.svg";
export default function ToolBox({
  tool,
  setTool,
  setColor,
  fillref,
  setUrl,
  clear,
}) {
  const updateColor = (e) => {
    setColor(e.target.id);
  };
  const [img, setimg] = useState("");
  return (
    <div className="ToolBox">
      <div>
        <input
          type="radio"
          id="line"
          checked={tool === "line"}
          onChange={() => setTool("line")}
        />
        <label htmlFor="line" className={tool == "line" ? "active" : ""}>
          <img src={line} alt="line" />
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="rectangle"
          checked={tool === "rectangle"}
          onChange={() => setTool("rectangle")}
        />
        <label
          htmlFor="rectangle"
          className={tool == "rectangle" ? "active" : ""}
        >
          <img src={square} />
        </label>{" "}
      </div>
      <div>
        <input
          id="Fill"
          ref={fillref}
          type="checkbox"
          onChange={(e) => {
            let label = document.getElementById("fill-label");
            label.classList.toggle("active");
          }}
        />
        <label htmlFor="Fill" id="fill-label">
          <img src={paint} />
        </label>
      </div>
      <div>
        {/* <input
          type="text"
          placeholder="URL"
          onChange={(e) => setimg(e.target.value)}
        /> */}
        <button onClick={() => setUrl(img)}>
          <img src={image} />
        </button>
      </div>

      <div>
        <button onClick={clear}>
          <img src={eraser} />{" "}
        </button>
      </div>
      <div>
        <div onClick={updateColor} id="red" className="colors"></div>
        <div onClick={updateColor} id="black" className="colors"></div>
        <div onClick={updateColor} id="blue" className="colors"></div>
        <div onClick={updateColor} id="green" className="colors"></div>
        <div onClick={updateColor} id="purple" className="colors"></div>
      </div>
    </div>
  );
}
