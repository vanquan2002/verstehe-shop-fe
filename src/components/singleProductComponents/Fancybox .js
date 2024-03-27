import React, { useRef, useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function Fancybox(props) {
  const containerRef = useRef(null);
  const delegate = props.delegate || "[data-fancybox]";
  const options = props.options || {};
  useEffect(() => {
    const container = containerRef.current;
    NativeFancybox.bind(container, delegate, options);
    return () => {
      NativeFancybox.unbind(container);
      // NativeFancybox.close();
    };
  }, [props.delegate, props.options]);

  return <div ref={containerRef}>{props.children}</div>;
}

export default Fancybox;
