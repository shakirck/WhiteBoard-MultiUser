import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import ToolBox from "./ToolBox";
import { v4 as uuid } from "uuid";

const socket = io.connect("localhost:8000");

export default function Canvas() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("black");
  const [drawing, setdrawing] = useState(false);
  const [elements, setelements] = useState([]);
  const [recieved, setRecieved] = useState([]);
  const [currentElement, setcurrentElement] = useState();
  const fillRef = useRef();
  const [tool, setTool] = useState("rectangle");
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    elements.forEach((element) => {
      canvasDraw(element, context)();
    });
    recieved.forEach((element) => {
      canvasDraw(element, context)();
    });
    if (currentElement) {
      canvasDraw(currentElement, context)();
    }
    socket.on("drawing", (data) => {
      console.log("receiving drawing,", data);
      // canvasDraw(data, context);
      const recievedData = data;
      setRecieved((prev) => [...new Set([...prev, data])]);
    });
  }, [elements, currentElement, recieved]);

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    setdrawing(true);
    setcurrentElement({
      id: uuid(),
      color,
      fill: fillRef.current.checked,
      type: tool,
      x1: clientX,
      y1: clientY - 25,
    });
  };
  const handleMouseMove = (e) => {
    if (!drawing) return;
    const { clientX, clientY } = e;

    setcurrentElement((prev) => {
      return { ...prev, x2: clientX, y2: clientY - 25 };
    });
  };
  const handleMouseUp = () => {
    setdrawing(false);
    setelements((prev) => [...prev, currentElement]);
    socket.emit("drawing", currentElement);
  };

  return (
    <>
      <ToolBox
        tool={tool}
        setTool={setTool}
        setColor={setColor}
        fillref={fillRef}
      />
      <canvas
        ref={canvasRef}
        style={{ backgroundColor: "#cccccc" }}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </>
  );
}

const canvasDraw = (element, context) => {
  context.strokeStyle = element.color;
  const drawRect = () => {
    const { x1, y1, x2, y2 } = element;
    context.strokeRect(x1, y1, x2 - x1, y2 - y1);
  };
  const drawRectFill = () => {
    const { x1, y1, x2, y2 } = element;
    context.fillStyle = element.color;
    context.fillRect(x1, y1, x2 - x1, y2 - y1);
  };
  const drawLine = () => {
    const { x1, y1, x2, y2 } = element;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  if (element.type === "rectangle" && !element.fill) return drawRect;
  if (element.type === "rectangle") return drawRectFill;
  if (element.type === "line") return drawLine;
};
