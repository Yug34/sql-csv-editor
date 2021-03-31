// import {useState} from "react/cjs/react.production.min";
import React from "react";
import "../css/Editor.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";

function Editor(props) {
  return (
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
          tabSize: 2,
        }}
        style={{ height: "25vh", width: "50vw" }}
      />
    </div>
  );
}

export default Editor;
