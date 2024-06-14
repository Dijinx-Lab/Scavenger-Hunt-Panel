import React, { useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ setValue, config, initialValue }) => {
  const editor = useRef(null);


  // useEffect(() => {
  //   // Apply global styles to Jodit editor
  //   const styles = `
  //     .jodit-wysiwyg {
  //       padding: 10px; /* Example: Adjust padding to your needs */
  //     }
  //     /* Override other Jodit global styles if necessary */
  //   `;
  //   const styleElement = document.createElement("style");
  //   styleElement.innerHTML = styles;
  //   document.head.appendChild(styleElement);

  //   return () => {
  //     document.head.removeChild(styleElement); // Clean up the style element on unmount
  //   };
  // }, []);
  return (
    <JoditEditor
      ref={editor}
      onBlur={(content) => setValue(content)}
      config={config}
      value={initialValue}
    />
  );
};

export default RichTextEditor;
