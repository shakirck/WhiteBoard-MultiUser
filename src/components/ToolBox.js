import React from "react";
export default function ToolBox({ tool, setTool, setColor, fillref }) {
  const updateColor = (e) => {
    setColor(e.target.id);
  };
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

      <label htmlFor="rectangle">Rectangle</label>
      <input
        ref={fillref}
        type="checkbox"
        onChange={(e) => console.log(e.target.checked)}
      />
      <label htmlFor="Fill">Fill</label>

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
