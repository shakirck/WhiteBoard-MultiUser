import React, { useState } from "react";
export default function ToolBox({ tool, setTool, setColor, fillref, setUrl }) {
  const updateColor = (e) => {
    setColor(e.target.id);
  };

  const [img, setimg] = useState("");
  return (
    <div className="ToolBox">
      <input
        type="radio"
        id="line"
        checked={tool === "line"}
        onChange={() => setTool("line")}
      />
      <label htmlFor="line">Line</label>
      <input
        type="radio"
        id="rectangle"
        checked={tool === "rectangle"}
        onChange={() => setTool("rectangle")}
      />
      <label htmlFor="rectangle">Rectangle</label>{" "}
      <input
        type="radio"
        id="brush"
        checked={tool === "brush"}
        onChange={() => setTool("brush")}
      />
      <label htmlFor="brush">Brush</label>
      <input
        ref={fillref}
        type="checkbox"
        onChange={(e) => console.log(e.target.checked)}
      />
      <label htmlFor="Fill">Fill</label>
      <input
        type="text"
        placeholder="URL"
        onChange={(e) => setimg(e.target.value)}
      />
      <button onClick={() => setUrl(img)}> Add Image </button>
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
