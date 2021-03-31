// import {useState} from "react/cjs/react.production.min";
import React, {useEffect, useState} from "react";
import "../css/ErrorLogger.css";
import AceEditor from "react-ace";

function ErrorLogger(props) {
    let [err, setErr] = useState("")

    useEffect(() => {
        if (props.error === "" || props.error === null) {
            setErr("");
        }
        else {
            setErr(props.error);
        }
    }, [props.error])

    return (
        <div className="errorDisplay">
            <AceEditor
                className="error"
                placeholder="Error Logs:"
                mode="sql"
                theme="monokai"
                name="errorBlah"
                fontSize={14}
                readOnly={true}
                showPrintMargin={true}
                showGutter={true}
                value={err}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableSnippets: false,
                    wrap: true
                }}
                style={{ height: "25vh", width: "50vw" }}
            />
        </div>
    );
}

export default ErrorLogger;