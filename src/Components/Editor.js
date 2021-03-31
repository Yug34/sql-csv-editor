// import {useState} from "react/cjs/react.production.min";
import React from "react";
import "../css/Editor.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";

function Editor(props) {
  return (
    <div>
      <div
        style={{
          "text-align": "center",
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
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          onChange={(e) => props.queryChangeHandler(e)}
          value={props.query}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            wrap: true,
            hScrollBarAlwaysVisible: false,
            vScrollBarAlwaysVisible: false,
            tabSize: 2,
            cursorStyle: "smooth",
          }}
          style={{ height: "25vh", width: "50vw" }}
        />
      </div>
    </div>
  );
}

export default Editor;
