import React, { useState } from "react";
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
      <input
        type="radio"
        id="line"
        checked={tool === "line"}
        onChange={() => setTool("line")}
      />
      <label htmlFor="line" className={tool == "line" ? "active" : ""}>
        <img src="https://www.flaticon.com/svg/static/icons/svg/860/860821.svg" />
      </label>
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
        <img src="https://www.flaticon.com/svg/static/icons/svg/33/33848.svg" />
      </label>{" "}
      {/* <input
        type="radio"
        id="brush"
        checked={tool === "brush"}
        onChange={() => setTool("brush")}
      />
      <label htmlFor="brush">Brush</label> */}
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
        <img src="https://www.flaticon.com/svg/static/icons/svg/137/137088.svg" />
      </label>
      <input
        type="text"
        placeholder="URL"
        onChange={(e) => setimg(e.target.value)}
      />
      <button onClick={() => setUrl(img)}>
        <img src="https://www.flaticon.com/svg/static/icons/svg/1042/1042362.svg" />
      </button>
      <button onClick={clear}>
        <img src="https://www.flaticon.com/svg/static/icons/svg/3419/3419461.svg" />{" "}
      </button>
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
