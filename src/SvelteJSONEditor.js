import { JSONEditor } from "vanilla-jsoneditor";
import React from "react";

import { useEffect, useRef } from "react";
import "./SvelteJSONEditor.css";

export default function SvelteJSONEditor(props) {
  const refContainer = useRef(null);
  const refEditor = useRef(null);

  useEffect(() => {
    // create editor
    console.log("create editor", refContainer.current);
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props: {
        mainMenuBar: false,
      },
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        console.log("destroy editor");
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      console.log("update props", props);
      refEditor.current.updateProps(props);
      refEditor.current.expand((path) => true);
    }
  }, [props]);

  return <div className="svelte-jsoneditor-react" ref={refContainer}></div>;
}
