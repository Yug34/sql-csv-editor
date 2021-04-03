import "./css/App.css";
import "./css/Editor.css";
import React, { useEffect, useState } from "react";
import alasql from "alasql";
import UploadCSV from "./Components/UploadCSV";
import Results from "./Components/Results";
import Editor from "./Components/Editor";
import ErrorLogger from "./Components/ErrorLogger";

function App() {
  // Contents of the CSV file:
  let [data, setData] = useState(null);
  // Query in the editor:
  let [query, setQuery] = useState(
    "-- Enter SQL Query here:\n" +
      "-- You can also change the separator\n" +
      '  SELECT * FROM CSV(?, {headers: true, separator:","}) WHERE orderID > 11000'
  );
  // Result data obtained by running the query on the CSV file contents
  let [result, setResult] = useState(null);
  // Errors in the particular query (Syntax errors, etc)
  let [err, setErr] = useState(null);

  // On component mount, fetch a default CSV data file
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Yug34/atlan-asgn/master/dataFiles/order_details.csv"
    )
      .then((res) => res.text())
      .then((result) => setData(result));
  }, []);

  // When file is fetched/changed, run query on the data from the CSV
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

    document.getElementById("dropImageContainer").style.display = "block";
    document.getElementById("dropSvgContainer").style.display = "none";
    document.getElementById("dragTextContainer").innerText = "Drag and drop a CSV file here!";
  }, [data, query]);

  // Change SQL query
  function queryChangeHandler(e, bool = false) {
    if (bool) {
      setQuery(e.target.value);
    } else {
      // For code editor
      setQuery(e);
    }
  }

  // Function to fetch CSV file from given URl
  // Also closes the modal when data is loaded
  function uploadViaLink(url) {
    fetch(url)
      .then((res) => res.text())
      .then((result) => setData(result))
      .then(() => (document.getElementById("myModal").style.display = "none"));
  }

  // Function to set data from the dragged and dropped file
  function dropHandler(e) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      setData(e.target.result);
    };

    setQuery(
      "-- Enter SQL Query here:\n" +
        "-- You can also change the separator\n" +
        '  SELECT * FROM CSV(?, {headers: true, separator:","})'
    );

    reader.readAsText(file);
    document.getElementById("myModal").style.display = "none";
  }

  // Function to brighten div when file is dragged over it
  function dragOverHandler(e) {
    e.preventDefault();
    e.target.className = "dragOverDiv";
  }

  // Function to download the query results as CSV file
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
          dropHandler={dropHandler}
          dragOverHandler={dragOverHandler}
          uploadViaLink={uploadViaLink}
          setData={setData}
          setQuery={setQuery}
        />
        <button id="downloadButton" onClick={download}>
          Download Results
        </button>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Editor
            query={query}
            queryChangeHandler={queryChangeHandler}
            fontSize={15}
          />
          <ErrorLogger error={err} fontSize={15} />
        </div>
        <Results results={result} />
      </div>
    </div>
  );
}

export default App;
