// import {useState} from "react/cjs/react.production.min";
import React from "react";
import "../css/Editor.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";

function Editor(props) {
  return (
    <div
      style={{
        border: "1px solid #555651",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          background: "#555651",
        }}
      >
        SQL Editor
      </div>
      <div className="editor">
        <AceEditor
          className="editorInput"
          placeholder="Enter SQL Query here"
          mode="sql"
          theme="monokai"
          name="blah2"
          fontSize={props.fontSize}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          onChange={(e) => props.queryChangeHandler(e)}
          value={props.query}
          setOptions={{
            showLineNumbers: true,
            wrap: true,
            hScrollBarAlwaysVisible: false,
            vScrollBarAlwaysVisible: false,
            tabSize: 2,
            cursorStyle: "smooth",
          }}
          style={{ height: "45vh", width: "50vw" }}
        />
      </div>
    </div>
  );
}

export default Editor;
