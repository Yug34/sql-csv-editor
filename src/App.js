import "./App.css";
// import {useState} from "react/cjs/react.production.min";
import React, {useEffect, useState} from "react"

function App() {
  let [text, setText] = useState(null);

  useEffect(() => {
    if(text) {
      console.log("File received:\n" + text);
    }
  }, [text]);

  function dropHandler(e) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      setText(e.target.result);
    };
    reader.readAsText(file);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  return (
    <div id="drop_zone" onDrop={(e) => dropHandler(e)} onDragOver={e => dragOverHandler(e)}>
      <p>Drag a file here!</p>
      {text?<p>{text}</p>:<p>Drag a file here yo!</p>}
    </div>
  );
}

export default App;
