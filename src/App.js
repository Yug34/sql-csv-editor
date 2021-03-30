import "./css/App.css";
import "./css/Editor.css";
// import {useState} from "react/cjs/react.production.min";
import React, { useEffect, useState } from "react";
import alasql from "alasql";
import UploadCSV from "./Components/UploadCSV";
import Results from "./Components/Results";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";

//TODO: project todos:-
//    - Style the drop modal, warn when uploaded file is not a CSV
//    - UploadCSV, make it work with links, as well as pasting the file contents
//    - Results, ability to download query results as a CSV again!
//    - Optimize load time, react.production.min?

function App() {
  let [data, setData] = useState(null);
  let [query, setQuery] = useState(`SELECT * FROM CSV(?, {headers: true, separator:","}) WHERE productID = 11`);
  let [result, setResult] = useState(null);

  function queryChangeHandler(e, bool = false) {
    if (bool) {
      setQuery(e.target.value);
    }
    else {
      setQuery(e);
    }
  }

  function showUpload() {
    document.getElementById("myModal").style.display = "block";
  }

  function hideUpload() {
    document.getElementById("myModal").style.display = "none";
  }

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/order_details.csv"
    )
      .then((res) => res.text())
      .then((result) => setData(result));
  }, []);

  useEffect(() => {
    if (data) {
      alasql
        .promise(`${query}`, [data])
        .then(function (data) {
          setResult(data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [data, query]);

  function dropHandler(e) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      setData(e.target.result);
    };
    reader.readAsText(file);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  return (
    <div id="App">
      <UploadCSV
        showUpload={showUpload}
        hideUpload={hideUpload}
        dropHandler={dropHandler}
        dragOverHandler={dragOverHandler}
      />
      <div style={{"display": "flex"}}>
        {/*<Editor query={query} queryChangeHandler={queryChangeHandler} />*/}
        <div className="editor">
          <AceEditor
              className="editorInput"
              placeholder="Enter SQL Query here"
              mode="sql"
              theme="monokai"
              name="sqlTerminal"
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              onChange={(e) => queryChangeHandler(e)}
              value={query}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
              style={{"height": "25vh", "width": "50vw"}}
          />
        </div>

        <Results results={result} />
      </div>
    </div>
  );
}

export default App;
