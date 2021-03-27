import "./css/App.css";
// import {useState} from "react/cjs/react.production.min";
import React, {useEffect, useState} from "react"
import Editor from "./Components/Editor";
import alasql from "alasql";
import UploadCSV from "./Components/UploadCSV";

//TODO: project todos:-
//    - Style the drop modal, warn when uploaded file is not a CSV
//    - NOT ADD REDUX MATE, YOU DON'T NEED IT

function App() {
  let [data, setData] = useState(null);
  let [query, setQuery] = useState(`SELECT * FROM CSV(?, {headers: true, separator:","}) WHERE productID=11`);
  //Todo: add a result display instead of console logging
  let [result, setResult] = useState(null);

  function queryChangeHandler(e) {
    setQuery(e.target.value);
  }

  function showUpload() {
      document.getElementById("myModal").style.display = "block"
  }

  function hideUpload() {
      document.getElementById("myModal").style.display = "none"
  }

  useEffect(() => {
      fetch("https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/order_details.csv")
          .then(res => res.text())
          .then(result => setData(result));
  }, []);

  useEffect(() => {
    if(data) {
        alasql.promise(`${query}`, [data])
            .then(function (data) {
                setResult(data);
                console.log(data)
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
      <UploadCSV showUpload={showUpload} hideUpload={hideUpload} dropHandler={dropHandler} dragOverHandler={dragOverHandler}/>
      <Editor query={query} queryChangeHandler={queryChangeHandler} />
    </div>
  );
}

export default App;
