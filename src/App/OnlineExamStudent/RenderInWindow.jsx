import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import StudentExam from "./index"

const RenderInWindow = (props) => {

  const [container, setContainer] = useState(null);
  const newWindow = useRef(window);

  useEffect(() => {
    const div = document.createElement("div");
    setContainer(div);
  }, []);

  useEffect(() => {
    if (container) {
      const windowProperties = `
      width=${window.screen.availWidth},
      height=${window.screen.availHeight},
      "menubar=false,
      locationbar=0,
      resizable=0,
      scrollbars=0,
      toolbar=0,
      personalbar=0,
      statusbar=0"
      left=200,top=200`
      newWindow.current = window.open(
        "",
        "",
        windowProperties
      );
      newWindow.current.document.body.appendChild(container);
      const currentWindow = newWindow.current;
      return () => currentWindow.close();
    }
  }, [container]);
  return container && createPortal(StudentExam, container);
};

export default RenderInWindow