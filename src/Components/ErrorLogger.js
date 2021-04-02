import React, { useEffect, useState } from "react";
import "../css/ErrorLogger.css";
import AceEditor from "react-ace";

function ErrorLogger(props) {
  let [err, setErr] = useState("");

  useEffect(() => {
    if (props.error === "" || props.error === null) {
      setErr("");
    } else {
      setErr(props.error);
    }
  }, [props.error]);

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
        Error Logger
      </div>
      <div className="errorDisplay">
        <AceEditor
          className="error"
          placeholder="Error Logs:"
          mode="sql"
          theme="monokai"
          name="errorBlah"
          fontSize={props.fontSize}
          readOnly={true}
          showPrintMargin={true}
          showGutter={true}
          value={err}
          setOptions={{
            wrap: true,
            hScrollBarAlwaysVisible: false,
            vScrollBarAlwaysVisible: false,
            cursorStyle: "smooth",
          }}
          style={{ height: "45vh", width: "50vw" }}
        />
      </div>
    </div>
  );
}

export default ErrorLogger;
