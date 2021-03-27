// import {useState} from "react/cjs/react.production.min";
import React, {useEffect, useState} from "react";
import "../css/Results.css";

function Results(props) {
  let [resultList, setResultList] = useState(<div>Result!</div>);

  useEffect(() => {
    if (props.results) {
      setResultList(
          props.results.map((result) => <div key={result.orderID}>abc!</div>)
      );
    }
  }, [props.results]);

  return <div>{resultList}</div>;
}

export default Results;
