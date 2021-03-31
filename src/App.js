import "./css/App.css";
import "./css/Editor.css";
// import {useState} from "react/cjs/react.production.min";
import React, { useEffect, useState } from "react";
import alasql from "alasql";
import UploadCSV from "./Components/UploadCSV";
import Results from "./Components/Results";
import Editor from "./Components/Editor";
import ErrorLogger from "./Components/ErrorLogger";

//TODO: project todos:-
//    - Style the drop modal, warn when uploaded file is not a CSV
//    - UploadCSV, make it work with links, as well as pasting the file contents
//    - Optimize load time, react.production.min?

function App() {
  let [data, setData] = useState(null);
  let [query, setQuery] = useState(`--Enter SQL Query here:
  SELECT * FROM CSV(?, {headers: true, separator:","}) WHERE productID = 11`);
  let [result, setResult] = useState(null);
  let [err, setErr] = useState(null);

  function queryChangeHandler(e, bool = false) {
    if (bool) {
      setQuery(e.target.value);
    } else {
      // For code editor
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
          setErr(null);
        })
        .catch(function (err) {
          setErr(err.message);
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

  function download() {
    let downloadResults = [];
    downloadResults.push(Object.keys(result[0]).join(", "));
    for (let res of result) {
      downloadResults.push(Object.values(res).join(", "));
    }

    let blob = new Blob([downloadResults.join("\n")], { type: "text/csv" });
    let href = window.URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div id="App">
      <div style={{ display: "flex" }}>
        <UploadCSV
          showUpload={showUpload}
          hideUpload={hideUpload}
          dropHandler={dropHandler}
          dragOverHandler={dragOverHandler}
        />
        <button onClick={download}>Download</button>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Editor query={query} queryChangeHandler={queryChangeHandler} />
          <ErrorLogger error={err}/>
        </div>
        <Results results={result} />
      </div>
    </div>
  );
}

export default App;
