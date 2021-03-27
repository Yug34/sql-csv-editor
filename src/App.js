import "./App.css";
// import {useState} from "react/cjs/react.production.min";
import React, {useEffect, useState} from "react"
import Editor from "./Components/Editor";

function App() {
  let [data, setData] = useState(null);
  let [query, setQuery] = useState("");

  function queryChangeHandler(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
      fetch("https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/orders.csv")
          .then(res => res.text())
          .then(result => setData(result));
  }, []);

  useEffect(() => {
    if(data) {
      console.log("File received:\n" + data);
    }
  }, [data]);

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
      <div id="drop_zone" onDrop={(e) => dropHandler(e)} onDragOver={e => dragOverHandler(e)}>
        <p>Drag a file here!</p>
      </div>
      <Editor query={query} queryChangeHandler={queryChangeHandler}/>
    </div>
  );
}

export default App;
